import express from 'express'
const userValidator = require('../controllers/users/userValidator');

export default function (database) {
  const app = express()

  app.use(express.json())

  app.post('/api/users/create', userValidator, async (req, res) => {
    const {username, email, password} = req.body;
    username.toLowerCase();
    email.toLowerCase();
    
    const response = await database.createUser(username, email, password)
    res.send(response)
  });

  app.get('/api/users/profile/:username', async (req, res) => {
    
    const response = await database.getUserId(req.params.username)
    res.send(response)
  });

  app.post('/api/post/create', async (req, res) => {
    const {user_id, link} = req.body;
    const response = await database.createPost(user_id, link)
    res.send(response)
  });

  return app
}