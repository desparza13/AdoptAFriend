"use strict";

process.env.TOKEN_KEY_R = "Rescatista1234" //Llave para token de rescatistas
process.env.TOKEN_KEY_A = "Adoptante1234" //Llave para token de adoptantes

const express = require('express');
const router = require('./app/controllers/router');
const loginRouter = require('./app/routes/login_router');
const solicitud = require('./app/routes/solicitud_adopcion');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors({
   origin : ['http://127.0.0.1:5500']
}));
app.use(express.json()); // Use express body-parser to parse all request bodies.
app.use('/login',loginRouter); //Rutas para login 
app.use('/solicitud',solicitud);
app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
}) 