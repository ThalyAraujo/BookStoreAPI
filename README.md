
# API de Livros

Esta é uma API simples para gerenciar informações sobre livros, construída com Node.js, Express e MySQL. A API permite realizar operações CRUD (Criar, Ler, Atualizar e Deletar) em uma base de dados de livros.

## Tecnologias Utilizadas

- Node.js
- Express
- MySQL
- Joi (para validação de dados)
- dotenv (para gerenciamento de variáveis de ambiente)
- cors (para permitir requisições de diferentes origens)

## Pré-requisitos

Antes de começar, você precisará ter o Node.js e o MySQL instalados em sua máquina.

## Configuração do Ambiente

1. Clone o repositório:

   ```bash
   git clone https://github.com/ThalyAraujo/BookStoreAPI.git
   cd BookStoreAPI
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie um arquivo `.env` na raiz do projeto e adicione suas configurações de banco de dados:

   ```plaintext
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_NAME=nome_do_banco
   ```

4. Certifique-se de que o banco de dados está criado e que a tabela `booksinfo` existe. A tabela deve ter as seguintes colunas:

   - `id` (INT, AUTO_INCREMENT, PRIMARY KEY)
   - `book` (VARCHAR)
   - `genre` (VARCHAR)
   - `writer` (VARCHAR)
   - `releaseDate` (DATE)

## Executando a Aplicação

Para iniciar o servidor, execute o seguinte comando:

```bash
npm start
```

A aplicação estará rodando em `http://localhost:3000`.

## Endpoints

### 1. Obter todos os livros

- **GET** `/books/`

### 2. Buscar livros

- **GET** `/books/search?book=nome&genre=genero&writer=autor&releaseDate=data`

### 3. Obter um livro por ID

- **GET** `/books/:id`

### 4. Adicionar um novo livro

- **POST** `/books/`

**Corpo da requisição:**

```json
{
    "book": "Título do Livro",
    "genre": "Gênero do Livro",
    "writer": "Autor do Livro",
    "releaseDate": "Data de Lançamento"
}
```

### 5. Deletar um livro

- **DELETE** `/books/:id`

### 6. Atualizar um livro

- **PUT** /books/:id

**Corpo da requisição:**

```json
{
  "book": "Título do Livro Atualizado",
  "genre": "Gênero do Livro Atualizado",
  "writer": "Autor do Livro Atualizado",
  "releaseDate": "Data de Lançamento Atualizada"
}
```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
