"use strict";

let petsContainer = document.getElementById('masAdopcionesSection');
const petsUrl = 'http://localhost:3000/pet';
const adoptanteUrl = 'http://localhost:3000/adoptante/';

//Validar que el rescatista haya iniciado sesión y tenga una sesión válida
function validateToken(){
    //Obtener inicio de sesión de SessionStorage
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    //Si no hay sesión valida redirigir a la página de error
    if (loginUser==undefined){
        window.location.href="/AdoptAFriend/app/views/error.html";
    }else{ //Si hay sesión válida mostrar la página
        getMorePets();
    }
}
//Convertir una mascota a su card de HTML con sus datos correspondientes
function petToHTML(pet){
    return `<div class="card col-sm-6 col-md-4 col-lg-3 mascota">
    <div class="row" id="petBanner">
        <div class="col-10 align-self-center">
            <h4 style="color:white;">${pet.nombre}</h4>
        </div>
        <div class="col-2 align-self-center align-items-left">
            <div class="d-flex flex-column align-items-end">
            </div>
        </div>
    </div>
    <img class="card-img-top petImg" src="${pet.petImg}" alt="">
    <div class="card-body">
        <p class="card-text">${pet.raza}</p>
        <hr>
        <p class="card-text">${pet.perronalidad}</p>
        <hr>
        <p class="card-text">${pet.genero}</p>
    </div>
</div>`
}
//Mostrar todas las mascotas de la lista y desplegar su card
function petsList(pets){
    petsContainer.innerHTML = '<div class="row">' + pets.map(petToHTML).join("\n") + '\n</div>';
}
//Mostrar más mascotas del mismo rescatista
function getMorePets(){
    //Obtener la mascota de la que se están mostrando los detalles
    let pet = sessionStorage.getItem('petDetails');
    //Obtener a la mascota
    loadPet(petsUrl+'/'+pet).then(petDetail =>{
        //Obtener el rescatista de la mascota mostrada
        loadRescatista('http://localhost:3000/rescatista/'+petDetail.idRescatista).then(rescatista =>{
            //Popular el link a más adoptantes
            let titulo = document.getElementById("titulo");
            titulo.innerText = "Mas adoptantes de @" + rescatista.usuario;
        });
        //Cargar todas las mascotas que tengan el mismo rescatista
        loadPets(petsUrl).then(pets =>{
            let availablePets = pets.filter(function (pet) {
                return (pet.idRescatista==petDetail.idRescatista);
            });
            //Mostrar las mascotas
            petsList(availablePets);
        });
    });
}
//Mostrar mascota especifica
function showDetails(id){
    sessionStorage.removeItem("petDetails");
    sessionStorage.setItem("petDetails",id);
    window.location.href='/AdoptAFriend/app/views/Adoptante/detallesAdoptante.html';
}
validateToken();

