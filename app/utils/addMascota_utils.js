"use strict";

function uploadPet(){
    let nombre = document.getElementById('nombreToAdd').value;
    let tipo = document.getElementById('tipoToAdd').value;
    let petImg = document.getElementById('imagenToAdd').value;
    let raza = document.getElementById('razaToAdd').value;
    let edad = document.getElementById('edadToAdd').value;
    let genero = document.getElementById('generoToAdd').value;
    let talla = document.getElementById('tallaToAdd').value;
    let perronalidad = document.getElementById('perronalidadToAdd').value;
    let ciudad = document.getElementById('ciudadToAdd').value;
    let newPet = new Object();
    newPet.nombre=nombre;
    newPet.tipo=tipo;
    newPet.petImg=petImg;
    newPet.raza=raza;
    newPet.edad=edad;
    newPet.genero=genero;
    newPet.talla=talla;
    newPet.perronalidad=perronalidad;
    newPet.status='noAdoptado';
    newPet.ciudad=ciudad;

    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    newPet.idRescatista=loginUser.id; //Modificar cuando este autentificado

    console.log(JSON.stringify(newPet))
    loadNewPet('http://localhost:3000/admin/pet',newPet, pets=>{
        console.log(newPet);
        window.location.href = 'homeAdoptante.html';
    },(error)=>console.log(error));
}