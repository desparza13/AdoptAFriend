"use strict";
const pets = [];
const adoptantes = [];
const rescatistas = [];

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
    pets.push(Pet.petCreateFromObject(newPet));
}
function createAdoptante(newAdoptante){
    adoptantes.push(Adoptante.AcreateFromObject(newAdoptante));
}
function createRescatista(newRescatista){
    rescatistas.push(Rescatista.RcreateFromObject(newRescatista));
}

//Update
function updatePet(uuid, newPet){
    let index = pets.findIndex(obj=>obj.uuid==uuid);
    if(index >=0){
        pets.splice(index,1,Pet.petCreateFromObject(newPet));
    }
    else{
        throw new PetException("La mascota no existe");
    }
}
function updateAdoptante(uuid, newAdoptante){
    let index = adoptantes.findIndex(obj=>obj.uuid==uuid);
    if(index >=0){
        adoptantes.splice(index,1,Adoptante.AcreateFromObject(newAdoptante));
    }
    else{
        throw new AdoptanteException("El adoptante no existe");
    }
}
function updateRescatista(uuid, newRescatista){
    let index = rescatistas.findIndex(obj=>obj.uuid==uuid);
    if(index >=0){
        rescatistas.splice(index,1,Rescatista.RcreateFromObject(newRescatista));
    }
    else{
        throw new RescatistaException("El rescatista no existe");
    }
}

//Delete
function deletePet(uuid){
    let index = pets.findIndex(obj=>obj.uuid==uuid);
    if(index >=0){
        pets.splice(index,1);
    }
    else{
        throw new PetException("La mascota no existe");
    }
}
function deleteAdoptante(uuid){
    let index = adoptantes.findIndex(obj=>obj.uuid==uuid);
    if(index >=0){
        adoptantes.splice(index,1);
    }
    else{
        throw new AdoptanteException("El adoptante no existe");
    }
}
function deleteRescatista(uuid){
    let index = rescatistas.findIndex(obj=>obj.uuid==uuid);
    if(index >=0){
        rescatistas.splice(index,1);
    }
    else{
        throw new RescatistaException("El rescatista no existe");
    }
}
