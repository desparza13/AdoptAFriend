"use strict"
const express = require('express');
const router = express.Router();
const dataHandler = require('./../controllers/data_handler');
const tokenUtils = require('../utils/token_utils');

//POST /admin/adoptante
router.route('/')
    .post((req, res)=>{
        dataHandler.createAdoptante(req, res);
    });

//PUT GET DELETE /admin/adoptante/:usuario
router.use('/:id',tokenUtils.verifyTokenR);

router.route('/:id')
  .put((req, res) => dataHandler.updateAdoptante(req, res))
  .delete((req, res) => dataHandler.deleteAdoptante(req, res));

module.exports = router;
