# T1GForum
[README em português](README.pt.md)
<!-- about -->
<p align="center">
  <a href="https://t1gforum.netlify.app">
    <img src="https://cdn.discordapp.com/attachments/685226653764550671/796560842744135690/T1GForum_1.gif" width="220px" />
  </a>

  <h3 align="center">T1GForum | Make posts in different sections, comment and see other users posts.</h3>
  <p align="center">
    A website sample is hosted in https://t1gforum.netlify.app (Now, it's fully working)
    <br />
    <br />
    .
    <a href="https://t1gforum.netlify.app">View Demo</a>
    ·
    <a href="mailto:marcelorissette15@gmail.com">Report Bug</a>
    ·
    <br />
  </p>
   
</p>

# Tecnologies used

### Frontend:

- React
- Typescript
- FontAwesome (react-icons)
- FramerMotion (animations)
- React-router-dom (client side routing)
- Sass (CSS with super powers)
- React-toastify (Custom alerts)

- Deploy: netlify

### Backend:

- NodeJS & Express
- Typescript
- PostgreSQL
- Pg-pool (Connection to db)
- JsonWebToken (JWT - authentication)
- Multer (File upload)
- Cloudinary (Store file in cloud)
- Bcrypt (Hash user's password)

- Deploy: heroku

# Prerequisites

- Make sure to download <a href="https://nodejs.org/en/" target="_blank">Nodejs</a> and <a href="https://www.postgresql.org/" target="_blank">PostgreSQL</a> correctly.

# Installation

- Create a database in your postgreSQL terminal and
  a .env file in the root directory with the content

<p>PG_USER=your_user</p>
<p>PG_PASSWORD=password</p>
<p>PG_HOST=host</p>
<p>PG_PORT=port</p>
<p>PG_DATABASE=name_of_database</p>

<p>CLOUD_API_KEY=cloudinary_api_key</p>
<p>CLOUD_API_SECRET=cloudinary_secret_api_key</p>
<p>CLOUD_NAME=name_of_cloudinarye</p>

<p>JWT_SECRET_KEY=any_secret_key</p>
<br />
- Install all dependencies in frontend and backend using:

### `npm install`

- now, in the backend run:

### `npm run dev`

- and in the Frontend directory use:

### `npm start`

### Your machine should be hosting an example in http://localhost:3000 and a restAPI in http://localhost:8080.

<!-- CONTACT -->
# Contact

- Discord: [Losaeg#1619] 
- Email: marcelorissette15@gmail.com
