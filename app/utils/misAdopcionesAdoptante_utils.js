"use strict";

let petsContainer = document.getElementById('adopcionesSection');
let noResultsContainer = document.getElementById('noResultsAdopcionesA');
const petsUrl = 'http://localhost:3000/pet';
const adoptanteUrl = 'http://localhost:3000/adoptante/';

function validateToken(){
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    if (loginUser==undefined){
        window.location.href="/AdoptAFriend/app/views/error.html";
    }else{
        getAdoptedPets();
    }
}
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
function petsList(pets){
    if(pets.length==0){
        noResultsContainer.removeAttribute('hidden');
    }else{
        noResultsContainer.setAttribute('hidden',"");
        petsContainer.innerHTML = '<div class="row">' + pets.map(petToHTML).join("\n") + '\n</div>';

    }
}
function getAdoptedPets(){
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    console.log(loginUser.id);
    loadAdoptante('http://localhost:3000/adoptante/'+loginUser.id).then(adoptante =>{
        loadPets(petsUrl).then(pets =>{
            let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
            console.log(loginUser.id);
            let availablePets = pets.filter(function (pet) {
                return(adoptante.misAdopciones.includes(pet._id));
            });
            petsList(availablePets);
        });
    });
}
validateToken();

