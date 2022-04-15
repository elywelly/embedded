const express = require('express');
import Users from '../../models/Users';

const router = express.Router();

router.get('/:id', (req, res) => {
    Users.id(req.params.id).then((user) => {
        res.json(user);
    });
});

router.post('/create', (req, res) => {
    const user = req.body;

    Users.create(user)
        .then((user) => {
            req.session.username = user.username;
            req.session.email = user.email;
            req.session.password = user.password;

            res.json(user);
        })
});


module.exports = router;