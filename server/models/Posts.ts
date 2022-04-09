db = require('../database/db.js');

let Posts = {
    userId: (userId) => {
        const query = `SELECT * FROM posts WHERE user_id = $1`;
        return db.query(query, [userId]).then((response) => {
            return response.rows;
        });
    },
    id: (id) => {
        const query = `SELECT * FROM posts WHERE id = $1`;
        return db.query(query, [id]).then((response) => {
            return response;
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
    delete: (id) => {
        const query = `DELETE FROM posts WHERE id = $1`;
        return db.query(query, [id]);
    },
};

module.exports = Posts;