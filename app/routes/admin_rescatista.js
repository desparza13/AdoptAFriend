"use strict"
const express = require('express');
const router = express.Router();
const dataHandler = require('./../controllers/data_handler');

//POST /admin/rescatistas
router.route('/')
    .post((req, res)=>{
        dataHandler.createRescatista(req, res);
    });

//PUT GET DELETE /admin/rescatista/:usuario
router.route('/:usuario')
  .get((req, res) => dataHandler.getRescatistaByUsuario(req, res))
  .put((req, res) => dataHandler.updateRescatista(req, res))
  .delete((req, res) => dataHandler.deleteRescatista(req, res));

module.exports = router;