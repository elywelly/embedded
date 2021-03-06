const express = require('express');
const bcrypt = require('bcrypt');
import Users from '../../models/Users';
const userValidator = require('./userValidator');
const isLoggedIn = require('../../middleware/isLoggedIn');

const router = express.Router();

router.get('/profile/:username', isLoggedIn, (req, res) => {
    Users.profile_username(req.params.username).then((user) => {
        res.json(user);
    });
});

router.post('/create', userValidator, (req, res) => {
    const user = req.body;
    user.username.toLowerCase();
    user.email.toLowerCase();
    user.password = bcrypt.hashSync(user.password.toString(),
        bcrypt.genSaltSync()
    );
    Users.create(user)
        .then((user) => {
            req.session.user_id = user.id;
            req.session.username = user.username;
            res.json(user);
        }).catch((error) => {
            return res.status(500).json({
                    message: `Error: ${error}`,
                });
        });
});


module.exports = router;