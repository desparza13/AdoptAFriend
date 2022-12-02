"use strict";


function uploadPet() {
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

    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    newPet.idRescatista = loginUser.id; //Modificar cuando este autentificado

    console.log(JSON.stringify(newPet))
    loadNewPet('http://localhost:3000/admin/pet', newPet, pets => {
        console.log(newPet);
        window.location.href='/AdoptAFriend/app/views/Rescatista/homeRescatista.html';
        notifyMeSaveEdit();
    }, (error) => {
        notifyMeErrorEdit();
    });

    window.location.href = '/AdoptAFriend/app/views/Rescatista/homeRescatista.html';



}

function notifyMeErrorEdit() {
    if (!("Notification" in window)) {
        // Check if the browser supports notifications
        alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
        // Check whether notification permissions have already been granted;
        // if so, create a notification

        const notification = new Notification('No se creo correctamente la mascota!'); // …
    } else if (Notification.permission !== "denied") {
        // We need to ask the user for permission
        Notification.requestPermission().then((permission) => {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                const notification = new Notification("No se creo correctamente la mascota!");
                // …
            }
        });
    }
}

function notifyMeSaveEdit() {
    console.log("AAAA");
    if (!("Notification" in window)) {
        // Check if the browser supports notifications
        alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
        // Check whether notification permissions have already been granted;
        // if so, create a notification

        const notification = new Notification('Se creo correctamente la mascota!'); // …
    } else if (Notification.permission !== "denied") {
        // We need to ask the user for permission
        Notification.requestPermission().then((permission) => {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                const notification = new Notification("Se creo correctamente la mascota!");
                // …
            }
        });
    }
}