"use strict";

const router = require('express').Router();
const dataHandler = require('../controllers/data_handler');

router.route('/rescatista') //Ruta para login rescatista
  .post((req, res) => dataHandler.loginR(req, res));

router.route('/adoptante') //Ruta para login adoptante
  .post((req, res) => dataHandler.loginA(req, res));

module.exports = router;