"use strict";
function validateToken(){
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    if (loginUser==undefined){
        window.location.href="/AdoptAFriend/app/views/error.html";
    }else{
        loadPetDetails();
    }
}
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
function erasePet(){
    let pet = sessionStorage.getItem('petDetails');
    borrarPet('http://localhost:3000/admin/pet/'+pet, mascota =>{
        console.log(mascota);
        exito=true;
        notifyMeSaveErase();
    },(error)=> {
        notifyMeErrorErase();});
    window.location.href='/AdoptAFriend/app/views/Rescatista/homeRescatista.html';
}
function cancelEdit(){
    window.location.href='/AdoptAFriend/app/views/Rescatista/detallesRescatista.html';
}
function saveEdit(){
    //Obtener formulario
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
        notifyMeSave();
    },(error)=>{
        notifyMeError();
    });
}
validateToken();

function notifyMeError() {
    if (!("Notification" in window)) {
        // Check if the browser supports notifications
        alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
        // Check whether notification permissions have already been granted;
        // if so, create a notification

        const notification = new Notification('No se actualizó correctamente la mascota!'); // …
    } else if (Notification.permission !== "denied") {
        // We need to ask the user for permission
        Notification.requestPermission().then((permission) => {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                const notification = new Notification("No se actualizó correctamente la mascota!");
                // …
            }
        });
    }
}

function notifyMeSave() {
    console.log("AAAA");
    if (!("Notification" in window)) {
        // Check if the browser supports notifications
        alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
        // Check whether notification permissions have already been granted;
        // if so, create a notification

        const notification = new Notification('Se actualizó correctamente la mascota!'); // …
    } else if (Notification.permission !== "denied") {
        // We need to ask the user for permission
        Notification.requestPermission().then((permission) => {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                const notification = new Notification("Se actualizó correctamente la mascota!");
                // …
            }
        });
    }
}

function notifyMeErrorErase() {
    if (!("Notification" in window)) {
        // Check if the browser supports notifications
        alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
        // Check whether notification permissions have already been granted;
        // if so, create a notification

        const notification = new Notification('No se eliminó correctamente la mascota!'); // …
    } else if (Notification.permission !== "denied") {
        // We need to ask the user for permission
        Notification.requestPermission().then((permission) => {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                const notification = new Notification("No se eliminó correctamente la mascota!");
                // …
            }
        });
    }
}

function notifyMeSaveErase() {
    console.log("AAAA");
    if (!("Notification" in window)) {
        // Check if the browser supports notifications
        alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
        // Check whether notification permissions have already been granted;
        // if so, create a notification

        const notification = new Notification('Se eliminó correctamente la mascota!'); // …
    } else if (Notification.permission !== "denied") {
        // We need to ask the user for permission
        Notification.requestPermission().then((permission) => {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                const notification = new Notification("Se eliminó correctamente la mascota!");
                // …
            }
        });
    }
}