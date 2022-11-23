"use strict"
const express = require('express');
const router = express.Router();
const dataHandler = require('./../controllers/data_handler');

//POST /admin/rescatistas
router.route('/')
    .post((req, res)=>{
        let rescatista = req.body;
        if (rescatista!=undefined){
            try{
                dataHandler.createRescatista(rescatista);
            }catch(e){
                let properties = ['nombre','correo','usuario','ciudad'];
                let missingProperties = [];
                for (let i=0; i<properties.length; i++){
                    if(rescatista.hasOwnProperty(properties[i])) continue;
                    else{
                        missingProperties.push(properties[i]);
                    }
                }
                res.status(400).send("Faltan las propiedades: "+missingProperties.toString());
            }
            res.status(201).send("Se creó el rescatista "+rescatista.usuario);
        }
       
    });

//PUT /admin/rescatistas/:uuid
router.route('/:uuid')
    .put((req,res)=>{
        let uuid = req.params.uuid;
        let newRescatista = req.body;
        let rescatista = dataHandler.getRescatistaById(uuid);
        if(rescatista!=undefined){
            if(newRescatista!=undefined){
                try{
                    dataHandler.updateRescatista(uuid,newRescatista);
                }catch(e){
                    let properties = ['nombre','correo','usuario','ciudad'];
                    let missingProperties = [];
                    for (let i=0; i<properties.length; i++){
                        if(newRescatista.hasOwnProperty(properties[i])) continue;
                        else{
                            missingProperties.push(properties[i]);
                        }
                    }
                    res.status(400).send("Faltan las propiedades: "+missingProperties.toString());
                }
                res.status(201).send("Se modificó el rescatista "+rescatista.usuario);
            }
            res.status(400).send("Se requiere un body");
        }else{
            res.status(404).send("No existe un rescatista con el id: "+uuid);
        }
    })
    .delete((req,res)=>{
        let uuid = req.params.uuid;
        try{
            let rescatista = dataHandler.deleteRescatista(uuid);
            res.status(200)
                .type("application/json")
                .send("El rescatista " + rescatista._usuario + " con uuid "+ rescatista.uuid+" se eliminó");
        }catch(e){
            res.status(404).send("No existe un rescatista con el id: "+uuid);
        }
    })
module.exports = router;