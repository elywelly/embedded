const express = require('express');
import Post_ratings from '../../models/Post_ratings';
const isLoggedIn = require('../../middleware/isLoggedIn');

const router = express.Router();


router.get('/:user_id', isLoggedIn, (req, res) => {
    if (req.params.user_id != req.session.user_id) {
        res.status(403).json({message: 'Not allowed'})
        return
    }
    Post_ratings.user_id(req.params.user_id).then((userRatings) => {
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