"use strict";

const express = require('express');
const router = express.Router();
const dataHandler = require('./../controllers/data_handler');

//GET /adoptante
router.route('/')
    .get((req,res)=> {
        dataHandler.getAdoptantes(req,res);
    })

//GET /products/:id
router.route('/:usuario')
    .get((req,res)=>{
        dataHandler.getAdoptanteByUsuario(req, res)
    })

module.exports = router;