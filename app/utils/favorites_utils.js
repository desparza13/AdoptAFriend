"use strict";

let petsContainer = document.getElementById('favoritesSection');
let noResultsContainer = document.getElementById('noResultsFavorites');
const petsUrl = 'http://localhost:3000/pet';
const adoptanteUrl = 'http://localhost:3000/adoptante/';

//Validar que el adoptante haya iniciado sesión y tenga una sesión válida
function validateToken(){
    //Obtener inicio de sesión de SessionStorage
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    //Si no hay sesión valida redirigir a la página de error
    if (loginUser==undefined){
        window.location.href="/AdoptAFriend/app/views/error.html";
    }else{ //Si hay sesión válida mostrar las mascotas favoritas
        getFavoritePets();
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
    <a id="mascotaClick" onclick="showDetails('${pet._id}')" class="btn stretched-link"></a>
</div>`
}
//Mostrar todas las mascotas de la lista y desplegar su card
function petsList(pets){
    if(pets.length==0){ //Si no existen mascotas favoritas
        noResultsContainer.removeAttribute('hidden',""); //Mostrar el aviso de no resultados
    }else{ //Si hay mascotas favoritas
        noResultsContainer.setAttribute('hidden',""); //No mostrar el contenedor de no resultados
        //Mapear y crear una card de HTML para cada una de las mascotas favoritas y mostrarlas
        petsContainer.innerHTML = '<div class="row">' + pets.map(petToHTML).join("\n") + '\n</div>';
    }
}
//Obtener las mascotas favoritas
function getFavoritePets(){
    //Obtener quién es el adoptante conectado
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    //Obtener la información del adoptante
    loadAdoptante('http://localhost:3000/adoptante/'+loginUser.id).then(adoptante =>{
        //Obtener todas las mascotas
        loadPets(petsUrl).then(pets =>{
            //Filtrar las mascotas a aquellas que estén en la lista de favoritos del adoptante conectado
            let availablePets = pets.filter(function (pet) {
                return(adoptante.petFavorite.includes(pet._id));
            });
            //Mostrar todas las mascotas
            petsList(availablePets);
        });
    });
}
//Mostrar mascota especifica
function showDetails(id){
    //Guardar el id de la mascota a mostrar detalles
    sessionStorage.removeItem("petDetails");
    sessionStorage.setItem("petDetails",id);
    //Redirigir los detalles de la mascota a la que se hizo click
    window.location.href='/AdoptAFriend/app/views/Adoptante/detallesAdoptante.html';
}
validateToken();

