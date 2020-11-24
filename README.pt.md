# T1GForum
[README em inglês](README.md)
<!-- about -->
<p align="center">
  <a href="https://t1gforum.netlify.app">
    <img src="https://cdn.discordapp.com/attachments/757300282714620096/772898698660806656/LogoPain.png" width="230px" />
  </a>

  <h3 align="center">T1GForum | Faça posts em diferentes assuntos, comente e veja posts de outros usuários.</h3>
  <p align="center">
    Um website de exemplo está sendo hosteado em https://t1gforum.netlify.app (Agora, está funcionando).
    <br />
    <br />
    .
    <a href="https://t1gforum.netlify.app">Ver demonstração</a>
    ·
    <a href="mailto:marcelorissette15@gmail.com">Reportar um erro</a>
    ·
    <br />
  </p>
   
</p>

# Tecnologias Utilizadas

### Frontend:

- React
- Typescript
- FontAwesome (react-icons)
- FramerMotion (animações)
- React-router-dom (Roteamento pelo cliente)
- Sass (CSS with super powers)
- React-toastify (Alertas customizáveis)

- Deploy: netlify

### Backend:

- NodeJS & Express
- Typescript
- PostgreSQL
- Pg-pool (Conexão com a db)
- JsonWebToken (JWT - autenticação)
- Multer (Upload de arquivos)
- Cloudinary (Upload imagens na cloud)
- Bcrypt (Criptografar a senha do usuario)

- Deploy: heroku
# Pré requisitos

- Instalações do <a href="https://nodejs.org/en/" target="_blank">Nodejs</a> e do <a href="https://www.postgresql.org/" target="_blank">PostgreSQL</a>

# Instalação

- Clone o reposiório com 
### `git clone https://github.com/marcelo-schreiber/Hamburgy.git`

- Crie uma base de dados no terminal do postgreSQL
e um arquivo .env na raiz do projeto com o conteúdo:

<p>PG_USER=seu_usuario</p>
<p>PG_PASSWORD=sua_senha</p>
<p>PG_HOST=seu_host</p>
<p>PG_PORT=sua_port</p>
<p>PG_DATABASE=nome_da_database</p>

<p>CLOUD_API_KEY=cloudinary_api_key</p>
<p>CLOUD_API_SECRET=cloudinary_secret_api_key</p>
<p>CLOUD_NAME=nome_do_cloudinary</p>

<p>JWT_SECRET_KEY=uma_senha_qualquer</p>

<br />
- Instale todas as dependências nas pastas frontend e backend com o comando:

### `npm install`

- Agora, no backend use:

### `npm run dev`

- E no frontend:

### `npm start`

### Sua máquina deve estar hospedando o website no http://localhost:3000 e uma restAPI no http://localhost:8080.

<!-- CONTACT -->
# Contato

- Discord: [Losaeg#1619] 
- Email: marcelorissette15@gmail.com
