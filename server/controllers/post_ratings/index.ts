const express = require('express');
import Post_ratings from '../../models/Post_ratings';

const router = express.Router();

router.get('/', (req, res) => {
    Post_ratings.all().then((postratings) => {
        res.json(postratings);
    });
});

router.get('/:user_id', (req, res) => {
    Post_ratings.user_id(req.params.user_id).then((userRatings) => {
        res.json(userRatings);
    });
});

router.get('/post/:post_id', (req, res) => {
    const data = {
        post_id: req.params.post_id, 
        user_id: req.session.user_id
    }
    Post_ratings.post_id(data).then((postRating) => {
        res.json(postRating);
    });
});

router.post('/create/', (req, res) => {
    req.body["user_id"] = req.session.user_id
    Post_ratings.create(req.body).then((response) => {
        res.status(201).json(response);
    });
});

router.patch('/update/', (req, res) => {
    req.body["user_id"] = req.session.user_id
    Post_ratings.update(req.body).then((rating) => {
        res.json(rating);
    });
});

module.exports = router;