"use strict";

const express = require('express');
const router = express.Router();
const dataHandler = require('./../controllers/data_handler');

//GET /pet
router.route('/')
    .get((req,res)=> {
        let query = req.body;
        let isEmpty = Object.entries(query).length === 0;
        
        if(isEmpty){
            dataHandler.getPets(req,res);
            //Regresar las mascotas y status 200
        }else{
            //Filtrar mascotas
            //Hacer objeto que incluya las propiedades con _ y los valores de query para poder compararlos con el arreglo de las mascotas
            
        }
    })

//GET /pets/:id
router.route('/:id')
    .get((req,res)=>{
        dataHandler.getPetById(req, res);
    })


module.exports = router;