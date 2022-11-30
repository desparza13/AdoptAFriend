"use strict";

//Cargar los detalles de una mascota
function loadPetDetails(){
    let pet = sessionStorage.getItem('petDetails');
    console.log(pet);
    loadPet('http://localhost:3000/pet'+'/'+pet).then(petDetail =>{
        console.log(JSON.stringify(petDetail))
        writePetDetails(petDetail);
    });
};
function writePetDetails(petDetail){
    //Mascota
    let titulo = document.getElementById("nombreTitulo");
    let nombre = document.getElementById("nombre");
    let ciudad = document.getElementById("ciudad");
    let tipo = document.getElementById("tipoMascota");
    let raza = document.getElementById("raza");
    let genero = document.getElementById("genero");
    let talla = document.getElementById("size");
    let edad = document.getElementById("edad");
    let perronalidad = document.getElementById("perronalidad");
    titulo.innerText = petDetail.nombre;
    nombre.value = petDetail.nombre;
    ciudad.value = petDetail.ciudad;
    tipo.value = petDetail.tipo;
    raza.value = petDetail.raza;
    genero.value = petDetail.genero;
    talla.value = petDetail.talla;
    edad.value = petDetail.edad;
    perronalidad.value = petDetail.perronalidad;
}
function deletePet(){

}
function cancelEdit(){
    window.location.href='/AdoptAFriend/app/views/Rescatista/detallesRescatista.html';
}
function saveEdit(){
    //Obtener formulario
    let titulo = document.getElementById("nombreTitulo");
    let nombre = document.getElementById("nombre");
    let ciudad = document.getElementById("ciudad");
    let tipo = document.getElementById("tipoMascota");
    let raza = document.getElementById("raza");
    let genero = document.getElementById("genero");
    let talla = document.getElementById("size");
    let edad = document.getElementById("edad");
    let perronalidad = document.getElementById("perronalidad");
    let pet = sessionStorage.getItem('petDetails');
    console.log(pet);
    let newPet = new Object();
    newPet.nombre = nombre.value;
    newPet.ciudad = ciudad.value;
    newPet.tipo = tipo.value;
    newPet.raza = raza.value;
    newPet.genero = genero.value;
    newPet.talla = talla.value;
    newPet.edad = edad.value;
    newPet.perronalidad = perronalidad.value;
    updateAdoptante('http://localhost:3000/admin/pet/'+pet, newPet, pet =>{
        console.log(pet);
        window.location.href='/AdoptAFriend/app/views/Rescatista/detallesRescatista.html';
    },(error)=>console.log(error));
}
loadPetDetails();