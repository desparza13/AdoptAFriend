"use strict";

const express = require('express');
const router = express.Router();
const dataHandler = require('./../controllers/data_handler');

//GET /rescatista
router.route('/')
    .get((req,res)=> {
        let query = req.query.filter;
        let rescatistas;
        if(query == undefined){
            try{
                rescatistas = dataHandler.getRescatistas();
                res.status(200).json(rescatistas);    

            } catch (e) {
                res.status(400)
                .type("text/plain")
                .send("Error al recuperar mascotas")
            }
            //Regresar los rescatistas y status 200
        }else{
            //Filtrar mascotas
            //Query no implementado en Practica 2
        }
    })

//GET /rescatistas/:id
router.route('/:id')
    .get((req,res)=>{
        let uuid = req.params.id; //El id se recibe como parametro
        let rescatista = dataHandler.getRescatistaById(uuid);

        if(rescatista!=undefined){
            //Regresamos rescatista
            res.status(200).send(rescatista);

        }else{
            //ID no coincide
            res.status(404)
            .type("text/plain")
            .send("No hay rescatista con ID " + uuid)
        }
        res.json();
    })

module.exports = router;