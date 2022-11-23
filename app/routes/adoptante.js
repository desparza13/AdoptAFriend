"use strict";

const express = require('express');
const router = express.Router();
const dataHandler = require('./../controllers/data_handler');

//GET /adoptante
router.route('/')
    .get((req,res)=> {
        let query = req.query.filter;
        let adoptantes;
        if(query == undefined){
            try{
                adoptantes = dataHandler.getAdoptantes();
                res.status(200).json(adoptantes);    

            } catch (e) {
                res.status(400)
                .type("text/plain")
                .send("Error al recuperar objetos")
            }
            //Regresar los adoptantes status 200
        }else{
            //Filtrar adoptantes
            //Query no implementado en Practica 2
        }
    })

//GET /products/:id
router.route('/:id')
    .get((req,res)=>{
        let uuid = req.params.id; //El id se recibe como parametro
        let adoptante = dataHandler.getAdoptanteById(uuid);

        if(adoptante!=undefined){
            //Regresamos adoptante
            res.status(200).send(adoptante);
        }else{
            //ID no coincide
            res.status(404)
            .type("text/plain")
            .send("No hay adoptante con ID " + uuid)
        }

        res.json();
    })

module.exports = router;