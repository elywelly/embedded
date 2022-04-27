const express = require('express');
import Post_ratings from '../../models/Post_ratings';
const isLoggedIn = require('../../middleware/isLoggedIn');

const router = express.Router();


router.get('/rated/desc', isLoggedIn, (req, res) => {
    const user_id = req.session.user_id
    Post_ratings.user_id_desc(user_id).then((userRatings) => {
        res.json(userRatings);
    });
});

router.get('/rated/asc', isLoggedIn, (req, res) => {
    const user_id = req.session.user_id
    Post_ratings.user_id_asc(user_id).then((userRatings) => {
        res.json(userRatings);
    });
});

router.get('/post/:post_id', isLoggedIn, (req, res) => {
    const data = {
        post_id: req.params.post_id, 
        user_id: req.session.user_id
    }
    Post_ratings.post_id(data).then((postRating) => {
        res.json(postRating);
    });
});


router.post('/create/', isLoggedIn, (req, res) => {
    req.body["user_id"] = req.session.user_id
    Post_ratings.create(req.body).then((response) => {
        res.status(201).json(response);
    });
});

router.patch('/update/', isLoggedIn, (req, res) => {
    req.body["user_id"] = req.session.user_id
    Post_ratings.update(req.body).then((rating) => {
        res.json(rating);
    });
});

module.exports = router;