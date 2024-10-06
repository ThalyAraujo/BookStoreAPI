require('dotenv').config();

const express = require('express');
const app = express();
const mysql = require('mysql2');
const Joi = require('joi');
const cors = require('cors');
app.use(cors());
app.use(express.json());

const PORT = 3000;

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao Banco de Dados:', err);
    } else {
        console.log('Conectado ao Banco de Dados com sucesso!');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

const bookSchema = Joi.object({
    book: Joi.string().required(),
    genre: Joi.string().required(),
    writer: Joi.string().required(),
    releaseDate: Joi.string().required()
})

app.get('/books/', (req, res) => {
    db.query('SELECT * FROM booksinfo', (err, result) => {
        if (err) {
            return res.status(500).send('Erro ao buscar livros.');
        }
        res.json(result);
    })
});

app.get('/books/search', (req, res) => {
    const { book, genre, writer, releaseDate } = req.query;

    console.log('Query Parameters:', req.query);

    let query = 'SELECT * FROM booksinfo WHERE 1=1 ';
    let params = [];

    if (book) {
        query += ' AND book LIKE ?';
        params.push(`%${book}%`);
    }

    if (genre) {
        query += ' AND genre LIKE ?';
        params.push(`%${genre}%`);
    }

    if (writer) {
        query += ' AND writer LIKE ?';
        params.push(`%${writer}%`);
    }

    if (releaseDate) {
        query += ' AND releaseDate = ?';
        params.push(releaseDate);
    }

    db.query(query, params, (err, result) => {
        if (err) {
            console.error('Erro ao buscar livros:', err);
            return res.status(500).send('Erro ao buscar livros.');
        }


        if (result.length === 0) {
            return res.status(404).send('Não foi possível encontrar o livro solicitado.');
        }

        res.json(result);
    })
})

app.get('/books/:id', (req, res) => {
    const bookId = req.params.id;
    db.query('SELECT * FROM booksinfo WHERE id = ?', [bookId], (err, result) => {
        if (err) {
            return res.status(500).send('Erro ao buscar livro');
        }

        if (result === 0) {
            return res.status(404).send('Não foi possível encontrar o livro.')
        }
        res.json(result[0]);
    })
});


app.post('/books/', async (req, res) => {

    const { error } = bookSchema.validate(req.body);

    if (error) {
        return res.status(404).send(error.details[0].message);
    }

    const { book, genre, writer, releaseDate } = req.body;

    db.query('INSERT INTO booksinfo (book, genre, writer, releaseDate) VALUES(?, ?, ?, ?)',
        [book, genre, writer, releaseDate], (err, result) => {
            if (err) {
                return res.status(500).send('Erro ao adicionar livro.');
            }
            const newBook = {
                book: req.body.book,
                genre: req.body.genre,
                writer: req.body.writer,
                releaseDate: req.body.releaseDate
            };

            res.status(201).json(newBook);
        }
    )
})

app.put('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const {book, genre, writer, releaseDate} = req.body;

    db.query('UPDATE booksinfo SET book = ?, genre = ?, writer = ?, releaseDate = ? WHERE id = ?',
        [book, genre, writer, releaseDate, bookId], (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).send('Erro ao atualizar as informações');
            }

            if (result.affectedRows === 0) {
                return res.status(404).send('Não foi possível encontrar o livro');
            }

            res.send('Livro atualizado com sucesso!')
        }
    )
})

app.delete('/books/:id', (req, res) => {
    const bookId = req.params.id;

    db.query('DELETE FROM booksinfo WHERE id = ?', [bookId], (err, result) => {
        if (err) {
            return res.status(500).send('Erro ao deletar livro.');
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Não foi possível encontrar o livro.')
        }
        res.status(200).json({message: 'Livro deletado com suceddo'});
    })
})