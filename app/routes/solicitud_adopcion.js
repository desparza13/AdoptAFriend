"use strict"
const express = require('express');
const router = express.Router();
const dataHandler = require('./../controllers/data_handler');
const tokenUtils = require('../utils/token_utils');

//POST /admin/adoptante
router.use('/',tokenUtils.verifyTokenR);

router.route('/')
    .get((req,res)=>{
        dataHandler.getSolicitud(req,res);
    })
    .post((req, res)=>{
       dataHandler.createSolicitud(req,res);
    });

//PUT GET DELETE /admin/adoptante/:usuario
router.use('/:usuarioA/:nombrePet',tokenUtils.verifyTokenR);

router.route('/:usuarioA/:nombrePet')
  .delete((req, res) => dataHandler.deleteSolicitud(req, res));

module.exports = router;