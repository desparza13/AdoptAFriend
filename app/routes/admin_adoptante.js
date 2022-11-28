"use strict"
const express = require('express');
const router = express.Router();
const dataHandler = require('./../controllers/data_handler');

//POST /admin/adoptante
router.route('/')
    .post((req, res)=>{
        dataHandler.createAdoptante(req, res);
    });

//PUT GET DELETE /admin/adoptante/:usuario
router.route('/:usuario')
  .get((req, res) => dataHandler.getAdoptanteByUsuario(req, res))
  .put((req, res) => dataHandler.updateAdoptante(req, res))
  .delete((req, res) => dataHandler.deleteAdoptante(req, res));

module.exports = router;
