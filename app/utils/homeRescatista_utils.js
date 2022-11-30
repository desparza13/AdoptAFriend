"use strict";

let petsContainer = document.getElementById('cardsSection');
let noResultsContainer = document.getElementById('noResults');
const petsUrl = 'http://localhost:3000/pet'

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
    <a href="./detallesAdoptante.html" class="btn stretched-link"></a>
</div>`
}
function petsList(pets){
    if(pets.length==0){
        noResultsContainer.removeAttribute('hidden');
    }else{
        noResultsContainer.setAttribute('hidden',"");
    }
    petsContainer.innerHTML = '<div class="row">' + pets.map(petToHTML).join("\n") + '\n</div>';
}
function uploadPet(){
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
    newPet.nombre=nombre;
    newPet.tipo=tipo;
    newPet.petImg=petImg;
    newPet.raza=raza;
    newPet.edad=edad;
    newPet.genero=genero;
    newPet.talla=talla;
    newPet.perronalidad=perronalidad;
    newPet.status='noAdoptado';
    newPet.ciudad=ciudad;

    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    newPet.idRescatista=loginUser.id; //Modificar cuando este autentificado

    console.log(JSON.stringify(newPet))
    loadNewPet('http://localhost:3000/admin/pet',newPet, pets=>{
        console.log(newPet);
        window.location.href = 'homeAdoptante.html';
    },(error)=>console.log(error));
}
//Mostrar todas las mascotas disponibles (noAdoptadas)
loadPets(petsUrl).then(pets =>{
    let availablePets = pets.filter(function (pet) {
        return (pet.status == 'noAdoptado');
    });
    petsList(availablePets);
});

