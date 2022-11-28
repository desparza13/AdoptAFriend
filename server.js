"use strict";

const express = require('express');
const router = require('./app/controllers/router');

const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors({
   origin : ['http://127.0.0.1:5500']
}));
app.use(express.json()); // Use express body-parser to parse all request bodies.
app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
}) 