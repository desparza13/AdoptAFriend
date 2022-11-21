"use strict"
const express = require('express');
const router = express.Router();
const dataHandler = require('./../controllers/data_handler');

//POST /admin/pet
router.route('/')
    .post((req, res)=>{
        let pet = req.body;
        if (pet!=undefined){
            try{
                dataHandler.createPet(pet);
            }catch(e){
                let properties = ["tipo","raza","status","edad","genero","talla","nombre","uuidRescatista","petImg","ciudad","perronalidad"];
                let missingProperties = [];
                for (let i=0; i<properties.length; i++){
                    if(pet.hasOwnProperty(properties[i])) continue;
                    else{
                        missingProperties.push(properties[i]);
                    }
                }
                res.status(400).send("Faltan las propiedades: "+missingProperties.toString());
            }
            res.status(201).send("Se creó la mascota "+pet.nombre);
        }
        res.status(400).send("El body no puede estar vacio");
    });

//PUT /admin/pets/:uuid
router.route('/:uuid')
    .put((req,res)=>{
        let uuid = req.params.uuid;
        let newPet = req.body;
        let pet = dataHandler.getPetById(uuid);
        if(pet!=undefined){
            if(pet!=undefined){
                try{
                    dataHandler.updatePet(uuid,newPet);
                }catch(e){
                    let properties = ["tipo","raza","status","edad","genero","talla","nombre","uuidRescatista","petImg","ciudad","perronalidad"];
                    let missingProperties = [];
                    for (let i=0; i<properties.length; i++){
                        if(pet.hasOwnProperty(properties[i])) continue;
                        else{
                            missingProperties.push(properties[i]);
                        }
                    }
                    res.status(400).send("Faltan las propiedades: "+missingProperties.toString());
                }
                res.status(201).send("Se modificó la mascota "+pet._nombre);
            }
            res.status(400).send("Se requiere un body");
        }else{
            res.status(404).send("No existe una mascota con el id: "+uuid);
        }
    })
    .delete((req,res)=>{
        let uuid = req.params.uuid;
        let pet = dataHandler.getPetById(uuid);
        if (pet!=undefined){
            try{
                dataHandler.deletePet(uuid);
                res.status(200)
                    .type("application/json")
                    .send("La mascota " + pet._nombre + " con uuid "+ pet.uuid+" se eliminó");
            }catch(e){
                res.status(404).send("No existe una mascota con el id: "+pet.uuid);
            }
        }else{
            res.status(404).send("No existe una mascota con el id: "+uuid);
        }
    })
module.exports = router;