"use strict";

//Subir mascota
function uploadPet() {
    //Obtener elemento del HTML (modales en rescatistas)
    let nombre = document.getElementById('nombreToAdd').value;
    let tipo = document.getElementById('tipoToAdd').value;
    let petImg = document.getElementById('imagenToAdd').value;
    let raza = document.getElementById('razaToAdd').value;
    let edad = document.getElementById('edadToAdd').value;
    let genero = document.getElementById('generoToAdd').value;
    let talla = document.getElementById('tallaToAdd').value;
    let perronalidad = document.getElementById('perronalidadToAdd').value;
    let ciudad = document.getElementById('ciudadToAdd').value;
    //Crear nuevo objeto y asignarle los valores que puso el rescatista en el modal
    let newPet = new Object();
    newPet.nombre = nombre;
    newPet.tipo = tipo;
    newPet.petImg = petImg;
    newPet.raza = raza;
    newPet.edad = edad;
    newPet.genero = genero;
    newPet.talla = talla;
    newPet.perronalidad = perronalidad;
    newPet.status = 'noAdoptado';
    newPet.ciudad = ciudad;
    //Obtener qué rescatista está subiendo la mascota
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    newPet.idRescatista = loginUser.id; //Modificar cuando este autentificado
    //Subir la mascota a la base de datos
    loadNewPet('http://localhost:3000/admin/pet', newPet, pet => {
        console.log(pet);
    }, (error) => {
        window.alert('Falta por llenar algun campo de la mascota');
    });
    //Enviar a home Rescatista
    // window.location.href = '/AdoptAFriend/app/views/Rescatista/homeRescatista.html';
}

