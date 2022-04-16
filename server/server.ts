import express, { Request, Response } from "express";
import path from "path";

const expressSession = require('express-session');
const pgSession = require('connect-pg-simple')(expressSession);
const db = require('./database/db');

// middleware import
const errorHandler = require('./middleware/errorHandler');
const logger = require('./middleware/logger');

// controller import
const usersController = require('./controllers/users');
const postsController = require('./controllers/posts');
const postRatingsController = require('./controllers/post_ratings');
const sessionsController = require('./controllers/sessions');

const PORT =
    process.env.PORT || (process.env.NODE_ENV === "production" && 3000) || 3001;
const app = express();

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
  app.use(logger);
}

app.use(
  expressSession({
      store: new pgSession({
          pool: db,
          createTableIfMissing: true,
      }),
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
  })
);

app.set("trust proxy", 1);
app.use(express.json()); 

// controllers
app.use('/api/users/', usersController);
app.use('/api/posts/', postsController);
app.use('/api/post_ratings/', postRatingsController);
app.use('/api/sessions/', sessionsController);

app.get("/api/test", (req: Request<any, any, any, any>, res: Response<any>) => {
    res.json({ date: new Date().toString() });
});
  
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "..", "client", "build")));
  
    app.get("/*", (req, res) => {
      res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
    });
  }

  app.use(errorHandler);

  app.listen(+PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });