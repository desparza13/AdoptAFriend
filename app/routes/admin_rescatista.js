"use strict"
const express = require('express');
const router = express.Router();
const dataHandler = require('./../controllers/data_handler');
const tokenUtils = require('../utils/token_utils');

//POST /admin/rescatistas
router.use('/',tokenUtils.verifyTokenR);
router.route('/')
    .post((req, res)=>{
        dataHandler.createRescatista(req, res);
    });

router.use('/:usuario',tokenUtils.verifyTokenR);
//PUT GET DELETE /admin/rescatista/:usuario
router.route('/:usuario')
  .put((req, res) => dataHandler.updateRescatista(req, res))
  .delete((req, res) => dataHandler.deleteRescatista(req, res));

module.exports = router;