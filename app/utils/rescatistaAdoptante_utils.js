"use strict";

let petsContainer = document.getElementById('masAdopcionesSection');
const petsUrl = 'http://localhost:3000/pet';
const adoptanteUrl = 'http://localhost:3000/adoptante/';

function validateToken(){
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    if (loginUser==undefined){
        window.location.href="/AdoptAFriend/app/views/error.html";
    }else{
        getMorePets();
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
    <a id="mascotaClick" onclick="showDetails('${pet._id}')" class="btn stretched-link"></a>
</div>`
}
function petsList(pets){
    petsContainer.innerHTML = '<div class="row">' + pets.map(petToHTML).join("\n") + '\n</div>';
}
function getMorePets(){
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    console.log(loginUser.id);
    let pet = sessionStorage.getItem('petDetails');
    console.log(pet);
    loadPet(petsUrl+'/'+pet).then(petDetail =>{
        console.log(JSON.stringify(petDetail))
        loadRescatista('http://localhost:3000/rescatista/'+petDetail.idRescatista).then(rescatista =>{
            let titulo = document.getElementById("titulo");
            titulo.innerText = "Mas adoptantes de @" + rescatista.usuario;
        });
        loadPets(petsUrl).then(pets =>{
            console.log(pets)
            console.log(petDetail);
            let availablePets = pets.filter(function (pet) {
                return (pet.idRescatista==petDetail.idRescatista);
            });
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

