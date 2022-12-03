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
    loadNewPet('http://localhost:3000/admin/pet', newPet, pets => {
        notifyMeSaveEdit(); //Enviar notificación de que se añadió exitosamente la mascota
    }, (error) => {
        notifyMeErrorEdit(); //Enviar notificación de que hubo un error al añadir la mascota
    });
    //Enviar a home Rescatista
    window.location.href = '/AdoptAFriend/app/views/Rescatista/homeRescatista.html';
}

//Enviar notificación de error al postear la mascota
function notifyMeErrorEdit() {
    if (!("Notification" in window)) {
        // Revisar que el navegador soporte notificaciones
        alert("El navegador no soporta notificaciones");
    } else if (Notification.permission === "granted") {
        //Si hay permisos de notificación en el navegador enviar notificación
        const notification = new Notification('No se creo correctamente la mascota!'); // …
    } else if (Notification.permission !== "denied") {
        // Pedir permiso para enviar notificaciones
        Notification.requestPermission().then((permission) => {
            // Si se da permiso
            if (permission === "granted") {
                const notification = new Notification("No se creo correctamente la mascota!");
            }
        });
    }
}

//Enviar notificación de exito al postear la mascota
function notifyMeSaveEdit() {
    if (!("Notification" in window)) {
        // Revisar que el navegador soporte notificaciones
        alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
        //Si hay permisos de notificación en el navegador enviar notificación
        const notification = new Notification('Se creo correctamente la mascota!'); // …
    } else if (Notification.permission !== "denied") {
        // Pedir permiso para enviar notificaciones
        Notification.requestPermission().then((permission) => {
            // Si se da permiso
            if (permission === "granted") {
                const notification = new Notification("Se creo correctamente la mascota!");
            }
        });
    }
}