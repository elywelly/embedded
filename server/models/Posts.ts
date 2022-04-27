const db = require('../database/db.js')

const Posts = {
    all: () => {
        const query = 'SELECT * FROM posts';
        return db.query(query).then((response) => {
            return response.rows;
        });
    },
    user_id_asc: (user_id) => {
        const query = `SELECT * FROM posts WHERE user_id = $1 ORDER BY created_at ASC`;
        return db.query(query, [user_id]).then((response) => {
            return response.rows;
        });
    },
    user_id_desc: (user_id) => {
        const query = `SELECT * FROM posts WHERE user_id = $1 ORDER BY created_at DESC`;
        return db.query(query, [user_id]).then((response) => {
            return response.rows;
        });
    },
    id: (id) => {
        const query = `SELECT * FROM posts WHERE id = $1`;
        return db.query(query, [id]).then((response) => {
            return response.rows ? response.rows[0] : {}
        });
    },
    create: ({user_id, link}) => {
        const query = `INSERT INTO posts (user_id, link) VALUES ($1, $2) RETURNING *`;
        return db
            .query(query, [user_id, link])
            .then((response) => {
                return response.rows ? response.rows[0] : {};
            });
    },
    delete: ({id}) => {
        const query = `DELETE FROM posts WHERE id = $1`;
        return db.query(query, [id]);
    },
};

export default Posts;