"use strict";

let petsContainer = document.getElementById('cardsSection');
let noResultsContainer = document.getElementById('noResults');
const petsUrl = 'http://localhost:3000/pet';
const adoptanteUrl = 'http://localhost:3000/adoptante/';

function validateToken(){
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    if (loginUser==undefined){
        window.location.href="/AdoptAFriend/app/views/error.html";
    }else{
        getHomeFeed();
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
                <a class="nav-link" onclick="addFavorite('${pet._id}')"><i class="fa fa-heart" style="color:white;"></i></a>
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
function addFavorite(petId){
    console.log("PET FAVORITE"+petId);
}
function petsList(pets){
    if(pets.length==0){
        noResultsContainer.removeAttribute('hidden');
    }else{
        noResultsContainer.setAttribute('hidden',"");
    }
    petsContainer.innerHTML = '<div class="row">' + pets.map(petToHTML).join("\n") + '\n</div>';
}
function filterPets(){
    let ciudad = document.getElementById('ciudad').value;
    let tipo = document.getElementById('tipoMascota').value;
    let raza = document.getElementById('raza').value;
    let genero = document.getElementById('genero').value;
    let talla = document.getElementById('size').value;
    let edad = document.getElementById('edad').value;
    let perronalidad = document.getElementById('perronalidad').value;
    loadPets(petsUrl).then(pets =>{
        let filteredPets = pets.filter(function (pet) {
            return  (pet.status == 'noAdoptado') &&
                    (pet.ciudad == ciudad || ciudad=='')&&
                    (pet.tipo == tipo || tipo=='Todos') &&
                    (pet.raza == raza || raza=='Todos') &&
                    (pet.genero == genero || genero=='Todos') &&
                    (pet.talla == talla || talla=='Todos') &&
                    (pet.edad == edad || edad=='Todos') &&
                    (pet.perronalidad == perronalidad || perronalidad == 'Todos');
        });
        petsList(filteredPets);
    });
}
function getIdealFilters(){
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    console.log(loginUser.id);
    loadAdoptante(adoptanteUrl+loginUser.id).then(adoptante =>{
        let filters = new Object();
        filters.ciudad = adoptante.ciudad;
        filters.tipo = adoptante.tipoIdeal;
        filters.raza = adoptante.razaIdeal;
        filters.genero = adoptante.generoIdeal;
        filters.talla = adoptante.tallaIdeal;
        filters.edad = adoptante.edadIdeal;
        filters.perronalidad = adoptante.perronalidadIdeal;
        filterPetsIdeal(filters);
    });
}
function filterPetsIdeal(filters){
    console.log(filters);
    loadPets(petsUrl).then(pets =>{
        console.log(pets)
        let filteredPets = pets.filter(function (pet) {
            return  (pet.status == 'noAdoptado') &&
                    (pet.ciudad == filters.ciudad || filters.ciudad=='')&&
                    (pet.tipo == filters.tipo) &&
                    (pet.raza == filters.raza) &&
                    (pet.genero == filters.genero) &&
                    (pet.talla == filters.talla) &&
                    (pet.edad == filters.edad) &&
                    (pet.perronalidad == filters.perronalidad);
        });
        petsList(filteredPets);
    });
}
function getHomeFeed(){
    //Mostrar todas las mascotas disponibles (noAdoptadas)
    loadPets(petsUrl).then(pets =>{
        let availablePets = pets.filter(function (pet) {
            return (pet.status == 'noAdoptado');
        });
        petsList(availablePets);
    });
}
//Mostrar mascota especifica
function showDetails(id){
    sessionStorage.removeItem("petDetails");
    sessionStorage.setItem("petDetails",id);
    window.location.href='/AdoptAFriend/app/views/Adoptante/detallesAdoptante.html';
}
validateToken()
