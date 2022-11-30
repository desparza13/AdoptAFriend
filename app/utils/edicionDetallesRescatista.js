"use strict";

const petsUrl = 'http://localhost:3000/pet'

//Cargar los detalles de una mascota
function loadPetDetails(){
    let pet = sessionStorage.getItem('petDetails');
    console.log(pet);
    loadPet(petsUrl+'/'+pet).then(petDetail =>{
        console.log(JSON.stringify(petDetail))
        writePetDetails(petDetail);
    });
};
function writePetDetails(petDetail){
    //Mascota
    let nombre = document.getElementById("nombre");
    let ciudad = document.getElementById("ciudad");
    let tipo = document.getElementById("tipoMascota");
    let raza = document.getElementById("raza");
    let genero = document.getElementById("genero");
    let talla = document.getElementById("size");
    let edad = document.getElementById("edad");
    let perronalidad = document.getElementById("perronalidad");
    nombre.innerText = petDetail.nombre;
    ciudad.src = petDetail.petImg;
    tipo.innerText = petDetail.nombre;
    raza.innerText = petDetail.tipo;
    genero.innerText = petDetail.raza;
    talla.innerText = petDetail.genero;
    edad.innerText = petDetail.edad;
    perronalidad.innerText = petDetail.talla;
}
loadPetDetails();