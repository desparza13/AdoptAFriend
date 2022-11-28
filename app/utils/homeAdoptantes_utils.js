"use strict";

let petsContainer = document.getElementById('cardsSection');
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
    console.log(perronalidad)
    loadPets(petsUrl).then(pets =>{
        let filteredPets = pets.filter(function (pet) {
            return pet.ciudad == ciudad &&
                    (pet.tipo == tipo || tipo=='Todos') &&
                    (pet.raza == raza || raza=='Todos') &&
                    (pet.genero == genero || genero=='Todos') &&
                    (pet.talla == talla || talla=='Todos') &&
                    (pet.edad == edad || edad=='Todos');
          });
        petsList(filteredPets);
    });
}
loadPets(petsUrl).then(pets =>{
    petsList(pets);
});

