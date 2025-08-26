const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const connectDB = require('./db');

connectDB();

app.get('/', (req, res) => {
  res.send('<h1>Hello, World with Docker + Express in prod environment...</h1>');
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});