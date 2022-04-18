CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(250) NOT NULL unique,  
    email VARCHAR(250) NOT NULL unique, 
    password VARCHAR(250) NOT NULL
);

CREATE TABLE posts(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    link TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user
      FOREIGN KEY(user_id)
	  REFERENCES users(id)
);

create table post_ratings(
	post_id INT,
	user_id INT,
    rating INT,
    PRIMARY KEY(post_id, user_id),
    CONSTRAINT fk_post 
        FOREIGN KEY(post_id) 
        REFERENCES posts(id) ON DELETE CASCADE,
    CONSTRAINT fk_user 
        FOREIGN KEY(user_id) 
        REFERENCES users(id) ON DELETE CASCADE
);