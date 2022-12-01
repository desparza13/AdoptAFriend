"use strict"
const express = require('express');
const router = express.Router();
const dataHandler = require('./../controllers/data_handler');
const tokenUtils = require('../utils/token_utils');

router.use('/post/solicitud',tokenUtils.verifyTokenA);

router.use('/get',tokenUtils.verifyTokenR);

router.route('/get')
    .get((req,res)=>{
        dataHandler.getSolicitud(req,res);
    });


//POST /post/solicitud

router.route('/post/solicitud')
  .post((req, res)=>{
    dataHandler.createSolicitud(req,res);
  });
    


// DELETE /:idSolicitud
router.use('/:idSolicitud',tokenUtils.verifyTokenR);

router.route('/:idSolicitud')
  .delete((req, res) => dataHandler.deleteSolicitud(req, res));

module.exports = router;