const express = require('express');
const Users = require('../../models/Users');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    function incorrectResponse(res) {
        res.status(400).json({
            message: 'Incorrect username or password',
        });
    };

    Users.username(username)
        .then((user) => {
            const valid = user && bcrypt.compareSync(password, user.password);

            if (valid) {
                req.session.user_id = user.id;
                req.session.username = user.username;

                res.json({
                    user_id: user.id,
                    username: user.username,
                });
            } else {
                incorrectResponse(res);
            }
        })
        .catch((error) => {
            incorrectResponse(error);
        });
});


router.get('/', (req, res) => {
    if (req.session.username) {
        res.json({
            user_id: req.session.user_id,
            username: req.session.username,
        });
    } else {
        res.status(401).json({
            message: 'Not logged in',
        });
    }
});

router.delete('/', (req, res) => {
    req.session.destroy();
    res.json({ message: 'Logged out' });
});

module.exports = router;