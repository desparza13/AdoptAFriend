"use strict"
const express = require('express');
const router = express.Router();
const dataHandler = require('./../controllers/data_handler');
const tokenUtils = require('../utils/token_utils');

//POST /admin/adoptante
router.use('/post/solicitud',tokenUtils.verifyTokenA);

router.use('/get',tokenUtils.verifyTokenR);

router.route('/get')
    .get((req,res)=>{
        dataHandler.getSolicitud(req,res);
    });



router.route('/post/solicitud')
  .post((req, res)=>{
    dataHandler.createSolicitud(req,res);
  });
    


//PUT GET DELETE /admin/adoptante/:usuario
router.use('/:idSolicitud',tokenUtils.verifyTokenR);

router.route('/:idSolicitud')
  .delete((req, res) => dataHandler.deleteSolicitud(req, res));

module.exports = router;