"use strict";

const express = require('express');
const router = express.Router();
const dataHandler = require('./../controllers/data_handler');

//GET /pet
router.route('/')
    .get((req,res)=> {
        let query = req.body;
        let isEmpty = Object.entries(query).length === 0;
        let pets
        if(isEmpty){
            console.log("A");
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

            //Revisar que query tenga todas las propiedades
            let missingProperties = []; //Arreglo que incluye las propiedades faltantes
            let props = ['tipo','raza','edad', 'genero', 'talla' , 'ciudad', 'perronalidad'];
                for(let prop in props){
                    if(!query.hasOwnProperty(props[prop])){
                        missingProperties.push(props[prop]);
                    }
                }
            
            //Hacer objeto que incluya las propiedades con _ y los valores de query para poder compararlos con el arreglo de las mascotas
            let filters = {};  
            let props1 = ['_tipo','_raza','_edad', '_genero', '_talla', '_ciudad', '_perronalidad'];

            for(let prop in props1){
                let propi = props[prop];
                let value = query[propi];
                filters[props1[prop]] = value;
            }

            let petsWithFilters= [];//Arreglo de las mascotas con los filtros requeridos
            if(missingProperties.length===0){   //Si no faltan propiedades
                try {
                    pets =dataHandler.getPets();
                    //Revisamos el arreglo de las mascotas y buscamos las mascotas que tengan los mismos filtros que el query
                    for(let prop in filters){
                        for(let pet in pets){
                            let pet1 = pets[pet];
                            if(pet1.hasOwnProperty(prop)){//Si la mascota tiene la propiedad
                                let petProp = pet1[prop];
                                let filterProp = filters[prop];
                                if(petProp=== filterProp){  //Si la propiedad de la mascota es igual a la del filtro
                                    petsWithFilters.push(pet1);//se agrega al arreglo de objetos 

                                    //Se elimina del arreglo local que tenemos de las mascotas para que no se repita
                                    let index = pets.findIndex(pet=>pet==pet1);
                                    if(index >=0){
                                        pets.splice(index,1)[0];//se elimina de mascotas el elemento
                                    }
                                }
                            }
                        }
                    }
                    res.status(200).json(petsWithFilters);  //Se regresa las mascotas con los filtros
                } catch (error) {
                    res.status(400).send("Error al recuperar mascotas");
                }
                
            }else{//Si faltan propiedades
                res.status(400).send("Faltan las propiedades: "+missingProperties.toString());//Se regresan los filtros que faltan
            }     
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