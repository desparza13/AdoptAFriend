"use strict";

const express = require('express');
const router = express.Router();
const dataHandler = require('./../controllers/data_handler');

//GET /pet
router.route('/')
    .get((req,res)=> {
        let query = req.query.filter;
        let pets;
        if(query == undefined){
            try{
                pets =dataHandler.getPets()
                res.status(200).json(pets);  

            } catch (e) {
                res.status(400)
                .send("Error al recuperar mascotas")
            }
              
            //Regresar las mascotas y status 200
        }else{
            //Filtrar mascotas
            //Query no implementado en Practica 2
        }
    })

//GET /pets/:id
router.route('/:id')
    .get((req,res)=>{
        let uuid = req.params.id; //El id se recibe como parametro
        let pet = dataHandler.getPetById(uuid);

        if(pet!=undefined){
            //Regresamos mascota
            res.status(200).send(pet);
        }else{
            //ID no coincide
            res.status(404)
            .type("text/plain")
            .send("No hay mascota con ID " + uuid)
        }
        res.json();
    })

//POST /pet/favorite
router.route('/favorite')
    .post((req,res)=>{
        console.log("a");
        let proxies = req.body;
        let pets = [];
        if(!Array.isArray(proxies)){
            res.status(400).send("El body debe ser un arreglo");
        }
        for(let proxy of proxies){
            let pet; //pet by id => usar DataHandler
            //Obtener la mascota a través del id con DataHandler
            let proxyUuid=proxy.petUuid;
            console.log(proxy);
            pet=dataHandler.getPetById(proxyUuid);
            console.log(pet);
            if(pet != undefined){
                pets.push(pet);
            }else{
                res.status(404)
                    .type("text/plain")
                    .send("No hay  con ID "+proxy.petUuid)
            }
        }
        res.status(200).json(pets).send("Añadido");

    });

module.exports = router;