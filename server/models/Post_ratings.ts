const db = require('../database/db.js')

const Post_ratings = {
    all: () => {
        const query = 'SELECT * FROM post_ratings';
        return db.query(query).then((response) => {
            return response.rows;
        });
    },
    user_id: (user_id) => {
        const query = `SELECT rating FROM post_ratings WHERE user_id = $1`;
        return db.query(query, [user_id]).then((response) => {
            return response.rows;
        });
    },
    post_id: ({post_id, user_id}) => {
        const query = `SELECT rating FROM post_ratings WHERE post_id = $1 AND user_id = $2`;
        return db.query(query, [post_id, user_id]).then((response) => {
            console.log(response, 'model response')
            return response.rows && response.rows.length > 0
                ? response.rows[0]
                : null;
        });
    },
    create: ({post_id, user_id, rating}) => {
        const query = `INSERT INTO post_ratings (post_id, user_id, rating) VALUES ($1, $2, $3) RETURNING rating`;
        return db
            .query(query, [post_id, user_id, rating])
            .then((response) => {
                return response.rows ? response.rows[0] : {};
            });
    },
    update: ({rating, post_id, user_id}) => {
        const query =
        'UPDATE post_ratings SET rating = $1 WHERE post_id = $2 AND user_id = $3 RETURNING rating';
    return db.query(query, [rating, post_id, user_id]).then((response) => {
        return response.rows ? response.rows[0] : {};
    });
    }
};

export default Post_ratings;