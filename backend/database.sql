CREATE TABLE users(
    user_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    email VARCHAR(250) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL 
);

CREATE TABLE posts (
    id BIGSERIAL PRIMARY KEY,
    author VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    section VARCHAR(100)
    check(section = 'meme' or section = 'fenoxer' or section = 'anime' or section = 'art')
);
