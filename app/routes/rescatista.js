"use strict";

const express = require('express');
const router = express.Router();
const dataHandler = require('./../controllers/data_handler');

//GET /rescatista
router.route('/')
    .get((req,res)=> {
        dataHandler.getRescatistas(req,res);
    })

//GET /rescatistas/:usuario
router.route('/:usuario')
    .get((req,res)=>{
        dataHandler.getRescatistaByUsuario(req, res)
    })

module.exports = router;