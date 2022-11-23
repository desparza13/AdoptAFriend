"use strict"
const express = require('express');
const router = express.Router();
const dataHandler = require('./../controllers/data_handler');

//POST /admin/adoptante
router.route('/')
    .post((req, res)=>{
        let adoptante = req.body;
        try{
            dataHandler.createAdoptante(adoptante);
            res.status(201).send("Se creó el adoptante "+adoptante.usuario);
        }catch(e){
            let properties = ['nombre','correo','usuario','ciudad'];
            let missingProperties = [];
            for (let i=0; i<properties.length; i++){
                if(adoptante.hasOwnProperty(properties[i])) continue;
                else{
                    missingProperties.push(properties[i]);
                }
            }
            res.status(400).send("Faltan las propiedades: "+missingProperties.toString());
        }
        
    });

//PUT /admin/adoptante/:uuid
router.route('/:uuid')
    .put((req,res)=>{
        let uuid = req.params.uuid;
        let newAdoptante = req.body;
        let adoptante = dataHandler.getAdoptanteById(uuid);
        if(adoptante!=undefined){
            if(newAdoptante!=undefined){
                try{
                    let a =dataHandler.updateAdoptante(uuid,newAdoptante);
                    res.status(201).send("Se modificó el adoptante "+adoptante.usuario);
                }catch(e){
                    let properties = ['nombre','correo','usuario','ciudad'];
                    let missingProperties = [];
                    for (let i=0; i<properties.length; i++){
                        if(newAdoptante.hasOwnProperty(properties[i])) continue;
                        else{
                            missingProperties.push(properties[i]);
                        }
                    }
                    res.status(400).send("Faltan las propiedades: "+missingProperties.toString());
                }
               
            }
        }else{
            res.status(404).send("No existe un adoptante con el id: "+uuid);
        }
    })
    .delete((req,res)=>{
        let uuid = req.params.uuid;

        try{
            let adoptante = dataHandler.deleteAdoptante(uuid);
            res.status(200)
                .type("application/json")
                .send("El adoptante " + adoptante._usuario + " con uuid "+ adoptante.uuid+" se eliminó");
        }catch(e){
            res.status(404).send("No existe un adoptante con el id: "+ uuid);
        }
    })
module.exports = router;