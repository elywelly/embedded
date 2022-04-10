const db = require('../database/db.js')

const Users = {
    all: () => {
        const query = 'SELECT * FROM users';
        return db.query(query).then((response) => {
            return response.rows;
        });
    },
    id: (id) => {
        const query = 'SELECT * FROM users WHERE id = $1';
        return db.query(query, [id]).then((response) => {
            return response.rows;
        });
    },
    create: ({ username, email, password }) => {
        const query =
            'INSERT INTO users (username, email, password) VALUES($1, $2, $3) RETURNING *';
        return db
            .query(query, [username.toLowerCase(), email.toLowerCase(), password])
            .then((response) => {
                return response.rows ? response.rows[0] : {};
            });
    },
};

export default Users;