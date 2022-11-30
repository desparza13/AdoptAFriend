"use strict";

const express = require('express');
const router = express.Router();
const dataHandler = require('./../controllers/data_handler');

//GET /adoptante
router.route('/')
    .get((req,res)=> {
        dataHandler.getAdoptantes(req,res);
    })

//GET /adoptante/:id
router.route('/:id')
    .get((req,res)=>{
        dataHandler.getAdoptanteById(req, res)
    })

module.exports = router;