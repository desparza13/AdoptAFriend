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
            let filters = {}; 
            let props = ['tipo','raza','edad', 'genero', 'talla' , 'ciudad', 'perronalidad']; 
            let props1 = ['_tipo','_raza','_edad', '_genero', '_talla', '_ciudad', '_perronalidad'];

            for(let prop in props1){
                for(let prop1 in query){
                    let newPropi = props1[prop];    //Propiedad con _

                    let index1 = props1.findIndex(prop=>prop==newPropi);    //indice de la propiedad con _
                    let index = props.findIndex(prop=>prop==prop1); //indice de la propiedad del query

                    let value = query[prop1]; //valor de la propiedad
                    if(index1 == index){ //si los indices son iguales(osea es la misma propiedad)
                        filters[newPropi] = value; //se asigna el valor a la propiedad con _
                    }
                }
            }

            let petsWithFilters= [];//Arreglo de las mascotas con los filtros requeridos
            try {
                //Revisamos el arreglo de las mascotas y buscamos las mascotas que tengan los mismos filtros que el query
                pets =dataHandler.getPets();
                Object.assign(pets1,pets); //Hacemos variable local que contenga a las mascotas

                let filtersLength = Object.keys(filters).length; //cantidad de filtros que hay
                let count; //contador 
                for(let pet in pets1){
                    count =0;
                    let pet1 = pets1[pet];
                    for(let prop in filters){
                        let petProp = pet1[prop];
                        let filterProp = filters[prop];
                        if(petProp=== filterProp){  //Si la propiedad de la mascota es igual a la del filtro
                            count = count+1; //se aumenta el contador
                        }
                    }
                    if(count == filtersLength){ //si el contador es igual a la cantidad de filtros
                        petsWithFilters.push(pet1);//se agrega al arreglo de objetos 

                        //Se elimina del arreglo local que tenemos de las mascotas para que no se repita
                        let index = pets1.findIndex(pet=>pet==pet1);
                        if(index >=0){
                            pets1.splice(index,1)[0];//se elimina del arreglo local el elemento
                        }
                    }
                }
                res.status(200).json(petsWithFilters);  //Se regresa las mascotas con los filtros
            } catch (error) {
                res.status(400).send("Error al recuperar mascotas");
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