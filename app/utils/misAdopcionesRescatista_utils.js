"use strict";

let petsContainer = document.getElementById('adopcionesSection');
let noResultsContainer = document.getElementById('noResultsAdopciones');
const petsUrl = 'http://localhost:3000/pet';
const adoptanteUrl = 'http://localhost:3000/adoptante/';

//Validar que el rescatista haya iniciado sesión y tenga una sesión válida
function validateToken(){
    //Obtener inicio de sesión de SessionStorage
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    //Si no hay sesión valida redirigir a la página de error
    if (loginUser==undefined){
        window.location.href="/AdoptAFriend/app/views/error.html";
    }else{ //Si hay sesión válida mostrar las mascotas adoptadas
        loadAdopciones();
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
                <a class="nav-link" href="#"><i class="fa fa-heart" style="color:white;"></i></a>
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
    if(pets.length==0){
        noResultsContainer.removeAttribute('hidden');//Si no hay ninguna mascota en adopción en la BD, mostrar aviso al usuario
    }else{
        noResultsContainer.setAttribute('hidden',"");//Si hay mascotas en la BD, esconder aviso al usuario
        petsContainer.innerHTML = '<div class="row">' + pets.map(petToHTML).join("\n") + '\n</div>';

    }
}
//Obtener las mascotas adoptadas y mostrarlas
function loadAdopciones(){
    //Mostrar todas las mascotas
    loadPets(petsUrl).then(pets =>{
        let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
        //Filtrar las mascotas a aquellas ya adoptadas que hayan sido publicadas por el rescatista que inició sesion
        let availablePets = pets.filter(function (pet) {
            return (pet.status == 'adoptado') &&
                    (pet.idRescatista == loginUser.id);
        });
        //Mostrar las mascotas en el html
        petsList(availablePets);
    });
}
//Mostrar mascota especifica
function showDetails(id){
    sessionStorage.removeItem("petDetails");
    sessionStorage.setItem("petDetails",id);
    window.location.href='/AdoptAFriend/app/views/Adoptante/detallesAdoptante.html';
}
validateToken();