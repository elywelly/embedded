const express = require('express');
import Posts from '../../models/Posts';


const router = express.Router();

router.get('/', (req, res) => {
    Posts.all().then((posts) => {
        res.json(posts);
    });
});

router.get('/profile', (req, res) => {
    Posts.user_id(req.session.user_id).then((userPosts) => {
        res.json(userPosts);
    });
});

router.get('/user/:user_id', (req, res) => {
    Posts.user_id(req.params.user_id).then((userPosts) => {
        res.json(userPosts);
    });
});

router.get('/post/:id', (req, res) => {
    Posts.id(req.params.id).then((post) => {
        res.json(post);
    });
});

router.post('/create', (req, res) => {
    req.body["user_id"] = req.session.user_id
    Posts.create(req.body).then((response) => {
        res.status(201).json(response);
    });
});

router.delete('/delete/:id', (req, res) => {
    Posts.delete(req.params.id).then((response) => {
        if (response) {
            res.json({ message: "Post deleted" });
          }
    });
});



module.exports = router;