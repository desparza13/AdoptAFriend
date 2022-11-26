"use strict";
const fs = require('fs');
//Clases 
const Adoptante = require('./adoptantes');
const Pet = require('./pets');
const Rescatista = require('./rescatistas');

//Contenido de los JSON
let contentAdoptantes = fs.readFileSync('./app/data/adoptantes.json');
let contentPets = fs.readFileSync('./app/data/pets.json');
let contentRescatistas = fs.readFileSync('./app/data/rescatistas.json');

//Contenido de los JSON convertidos en un arreglo de objetos;
let adoptantes = JSON.parse(contentAdoptantes).map(Adoptante.AcreateFromObject);
let pets = JSON.parse(contentPets).map(Pet.petCreateFromObject);
let rescatistas = JSON.parse(contentRescatistas).map(Rescatista.RcreateFromObject);

//Get array
function getPets(){
    return pets;
}

function getAdoptantes(){
    return adoptantes;
}
function getRescatistas(){
    return rescatistas;
}

//Get by id
function getPetById(uuid){
    return pets.find((Pet)=>Pet._uuid==uuid);
}
function getAdoptanteById(uuid){
    return adoptantes.find((Adoptante)=>Adoptante._uuid==uuid);
}
function getRescatistaById(uuid){
    return rescatistas.find((Rescatista)=>Rescatista._uuid==uuid);
}

//Create
function createPet(newPet){
    Pet.petCleanObject(newPet);//Se limpia el nuevo objeto para que no incluya propiedades de mas
    console.log(newPet);
     //se realiza una mascota nuevo con los valores del objeto  recibido
    let pet = new Pet(newPet.tipo,newPet.raza,newPet.status,newPet.edad,newPet.genero,newPet.talla,newPet.nombre,newPet.uuidRescatista,newPet.petImg,newPet.ciudad,newPet.perronalidad);
    console.log(pet);
    pets.push(pet);//Se agrega al arreglo de objetos ya existente
    fs.writeFileSync('./app/data/pets.json',JSON.stringify(pets));
}
function createAdoptante(newAdoptante){
    Adoptante.AcleanObject(newAdoptante);   //Se limpia el nuevo objeto para que no incluya propiedades de mas
    console.log(newAdoptante);
    //se realiza un adoptante nuevo con los valores del objeto  recibido
    let adoptante = new Adoptante(newAdoptante.nombre, newAdoptante.correo,newAdoptante.usuario,newAdoptante.ciudad);
    adoptantes.push(adoptante); //Se agrega al arreglo de objetos ya existente
    fs.writeFileSync('./app/data/adoptantes.json', JSON.stringify(adoptantes)); //En el JSON de adoptantes se agrega el arreglo de objetos ya actualizado
}
function createRescatista(newRescatista){
    Rescatista.RcleanObject(newRescatista); //Se limpia el nuevo objeto para que no incluya propiedades de mas
     //se realiza un rescatista nuevo con los valores del objeto  recibido
    let rescatista = new Rescatista(newRescatista.nombre,newRescatista.correo,newRescatista.usuario, newRescatista.ciudad);
    rescatistas.push(rescatista);//Se agrega al arreglo de objetos ya existente
    fs.writeFileSync('./app/data/rescatistas.json', JSON.stringify(rescatistas));//En el JSON de rescatistas se agrega el arreglo de objetos ya actualizado
}

//Update
function updatePet(uuid, newPet){
    let index = pets.findIndex(obj=>obj.uuid==uuid);
    if(index >=0){
        Pet.petCleanObject(newPet);   //Se limpia el objeto
        //Se creo una nueva mascota a partir del recibido
        //Si no tiene alguna propiedad lanzará una excepción
        let pet = new Pet(newPet.tipo,newPet.raza,newPet.status,newPet.edad,newPet.genero,newPet.talla,newPet.nombre,newPet.uuidRescatista,newPet.petImg,newPet.ciudad,newPet.perronalidad);
        let uuid = pets[index]._uuid;//Guardamos el uuid original
        Object.assign(pets[index],pet);//asignamos los nuevos valores del adoptante
        pets[index]._uuid = uuid; //Asignamos el uuid correcto
    }
    fs.writeFileSync('./app/data/pets.json',JSON.stringify(pets));
    return pets[index];
   
}
function updateAdoptante(uuid, newAdoptante){
    let index = adoptantes.findIndex(obj=>obj.uuid==uuid);
    if(index >=0){
        Adoptante.AcleanObject(newAdoptante);   //Se limpia el objeto
        //Se creo un nuevo adoptante a partir del recibido
        //Si no tiene alguna propiedad lanzará una excepción
        let adoptante = new Adoptante(newAdoptante.nombre, newAdoptante.correo,newAdoptante.usuario,newAdoptante.ciudad);
        let uuid = adoptantes[index]._uuid;//Guardamos el uuid original
        Object.assign(adoptantes[index],adoptante);//asignamos los nuevos valores del adoptante
        adoptantes[index]._uuid = uuid; //Asignamos el uuid correcto
    }

    fs.writeFileSync('./app/data/adoptantes.json',JSON.stringify(adoptantes));
    return adoptantes[index];
}
function updateRescatista(uuid, newRescatista){
    let index = rescatistas.findIndex(obj=>obj.uuid==uuid);
    if(index >=0){
        Rescatista.RcleanObject(newRescatista);   //Se limpia el objeto
        //Se creo un nuevo rescatista a partir del recibido
        //Si no tiene alguna propiedad lanzará una excepción
        let rescatista = new Rescatista(newRescatista.nombre, newRescatista.correo,newRescatista.usuario,newRescatista.ciudad);
        let uuid = rescatistas[index]._uuid;//Guardamos el uuid original
        Object.assign(rescatistas[index],rescatista);//asignamos los nuevos valores del adoptante
        rescatistas[index]._uuid = uuid; //Asignamos el uuid correcto
    }
    fs.writeFileSync('./app/data/rescatistas.json',JSON.stringify(rescatistas));
    return rescatistas[index];
    
}

//Delete
function deletePet(uuid){
    let index = pets.findIndex(obj=>obj.uuid==uuid);
    if(index >=0){
        let pet = pets.splice(index,1)[0];//se elimina de mascotas el elemento
        fs.writeFileSync('./app/data/pets.json',JSON.stringify(pets));  // Se escribe en el JSON las mascotas actualizadas
        return pet;
    }
   
}
function deleteAdoptante(uuid){
    let index = adoptantes.findIndex(obj=>obj.uuid==uuid);
    if(index >=0){
        let adoptante = adoptantes.splice(index,1)[0];  //Se elimina de adoptantes el elemento
        fs.writeFileSync('./app/data/adoptantes.json',JSON.stringify(adoptantes));  //Se escribe en el JSON los adoptantes actualizados
        return adoptante;
    }
   
}
function deleteRescatista(uuid){
    let index = rescatistas.findIndex(obj=>obj.uuid==uuid);
    if(index >=0){
        let rescatista = rescatistas.splice(index,1)[0];    //se elimina de rescatistas el elemento
        fs.writeFileSync('./app/data/rescatistas.json',JSON.stringify(rescatistas));//Se escribe en el JSON los rescatistas actualizados
        return rescatista;
    }
    
}
//Gets
exports.getPets = getPets;
exports.getAdoptantes = getAdoptantes;
exports.getRescatistas = getRescatistas;
//GetById
exports.getPetById = getPetById;
exports.getAdoptanteById = getAdoptanteById;
exports.getRescatistaById = getRescatistaById;
//Create
exports.createAdoptante = createAdoptante;
exports.createPet = createPet;
exports.createRescatista = createRescatista;
//Update
exports.updatePet = updatePet;
exports.updateAdoptante = updateAdoptante;
exports.updateRescatista = updateRescatista;
//Delete
exports.deletePet = deletePet;
exports.deleteAdoptante = deleteAdoptante;
exports.deleteRescatista = deleteRescatista;