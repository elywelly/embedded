db = require('../database/db.js');

let Post_ratings = {
    userId: (userId) => {
        const query = `SELECT rating FROM post_ratings WHERE user_id = $1`;
        return db.query(query, [userId]).then((response) => {
            return response.rows;
        });
    },
    postId: (postId) => {
        const query = `SELECT rating FROM post_ratings WHERE post_id = $1`;
        return db.query(query, [postId]).then((response) => {
            return response;
        });
    },
    update: ({rating, postId}) => {
        const query =
        'UPDATE post_ratings SET rating = $1 WHERE post_id = $2 RETURNING rating';
    return db.query(query, [rating, postId]).then((response) => {
        return response;
    });
    }
};

module.exports = Post_ratings;