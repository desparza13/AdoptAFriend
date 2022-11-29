"use strict"
const express = require('express');
const router = express.Router();
const dataHandler = require('./../controllers/data_handler');
const tokenUtils = require('../utils/token_utils');

//POST /admin/adoptante
router.route('/')
    .get((req,res)=>{

    })
    .post((req, res)=>{
       
    });

//PUT GET DELETE /admin/adoptante/:usuario
router.use('/:usuario',tokenUtils.verifyTokenR);

router.route('/:usuario')
  .delete((req, res) => dataHandler.deleteAdoptante(req, res));

module.exports = router;