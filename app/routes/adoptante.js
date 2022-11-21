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
                adoptantes = res.json(dataHandler.getAdoptantes());
            } catch (e) {
                res.status(400)
                .type("text/plain")
                .send("Error al recuperar objetos")
            }
            //Regresar los adoptantes status 200
            res.status(200).json(adoptantes);    
        }else{
            //Filtrar adoptantes
            //Query no implementado en Practica 2
        }
    })

//GET /products/:id
router.route('/:id')
    .get((req,res)=>{
        let uuid = req.params.id; //El id se recibe como parametro
        let adoptante = dataHandler.getProductById(uuid);

        if(adoptante!=undefined){
            try{
                //Guardar el producto
                adoptante = res.json(dataHandler.getAdoptanteById(uuid));
            } catch (e) {
                //Error al obtener
                res.status(400).send("Error");
            }
            res.status(200).send(product);
        }else{
            //ID no coincide
            res.status(404)
            .type("text/plain")
            .send("No hay adoptante con ID " + uuid)
        }

        res.json();
    })

module.exports = router;