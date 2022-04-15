import Users from '../../models/Users';

const userValidator = (req, res, next) => {
    if (!req.body.email) {
        return res.status(400).json({
            message: 'Email is required',
        });
    }
    if (!req.body.email.includes('@')) {
        return res.status(400).json({
            message: 'A valid email is required',
        });
    }
    if (!req.body.username) {
        return res.status(400).json({
            message: 'Username is required',
        });
    }
    if (req.body.password.length < 4) {
        return res.status(400).json({
            message: 'Password must be longer than 4 characters',
        });
    }
    if (Users.username(req.body.username) == '') {
        return res.status(400).json({ message: 'Username already exists' });
    }
    if (Users.email(req.body.email) == '') {
        return res.status(400).json({ message: 'Email already exists' });
    }
    next();
};

module.exports = userValidator;