"use strict";

const petsUrl = 'http://localhost:3000/pet'
//Cargar los detalles de una mascota
function loadPetDetails(){
    let pet = sessionStorage.getItem('petDetails');
    loadPet(petsUrl+'/'+pet).then(petDetail =>{
        console.log(JSON.stringify(petDetail));
        writePetDetails(petDetail);
    });
};
function writePetDetails(petDetail){
    let nombreDetalles = document.getElementById("nombreDetalles");
    let imgDetalles = document.getElementById("imgDetalles");
    let nombreMascota = document.getElementById("nombreMascota");
    let tipoDetalles = document.getElementById("tipoDetalles");
    let razaDetalles = document.getElementById("razaDetalles");
    let generoDetalles = document.getElementById("generoDetalles");
    let edadDetalles = document.getElementById("edadDetalles");
    let tallaDetalles = document.getElementById("tallaDetalles");
    let ciudadDetalles = document.getElementById("ciudadDetalles");
    nombreDetalles.innerText = petDetail.nombre;
}

