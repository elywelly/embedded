if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

import express, { Request, Response } from "express";
import path from "path";
const expressSession = require('express-session');

const pgSession = require('connect-pg-simple')(expressSession);
const db = require('./database/db');

const usersController = require('./controllers/users');

const PORT =
    process.env.PORT || (process.env.NODE_ENV === "production" && 3000) || 3001;
const app = express();

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

app.use('/api/users/', usersController);

app.get("/api/test", (req: Request<any, any, any, any>, res: Response<any>) => {
    res.json({ date: new Date().toString() });
});

const cards = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  const suits = ["Spades", "Diamonds", "Clubs", "Hearts"];
  
  app.get("/api/hand", (req, res) => {
    res.json({
      cards: [
        {
          card: cards[Math.floor(Math.random() * cards.length)],
          suit: suits[Math.floor(Math.random() * suits.length)],
        },
        {
          card: cards[Math.floor(Math.random() * cards.length)],
          suit: suits[Math.floor(Math.random() * suits.length)],
        },
      ],
    });
  });
  
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "..", "client", "build")));
  
    app.get("/*", (req, res) => {
      res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
    });
  }
  
  app.listen(+PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });