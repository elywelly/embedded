const express = require('express');
import Users from '../../models/Users';

const router = express.Router();

router.get('/', (req, res) => {
    Users.all().then((user) => {
        res.json(user);
    });
});

router.get('/:id', (req, res) => {
    Users.id(req.params.id).then((user) => {
        res.json(user);
    });
});

router.post('/create', (req, res) => {
    const user = req.body;

    Users.create(user)
        .then((user) => {
            req.session.id = user.id;
            req.session.username = user.username;

            res.json(user);
        })
});


module.exports = router;