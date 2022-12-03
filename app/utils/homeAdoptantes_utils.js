"use strict";

let petsContainer = document.getElementById('cardsSection');
let noResultsContainer = document.getElementById('noResults');
const petsUrl = 'http://localhost:3000/pet';
const adoptanteUrl = 'http://localhost:3000/adoptante/';

//Validar que el adoptante haya iniciado sesión y tenga una sesión válida
function validateToken(){
    //Obtener inicio de sesión de SessionStorage
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    //Si no hay sesión valida redirigir a la página de error
    if (loginUser==undefined){
        window.location.href="/AdoptAFriend/app/views/error.html";
    }else{ //Si hay sesión válida mostrar las mascotas adoptables
        getHomeFeed();
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
    <a id="mascotaClick" onclick="showDetails('${pet._id}')"class="btn stretched-link"></a>
</div>`
}
//Mostrar todas las mascotas de la lista y desplegar su card
function petsList(pets){
    if(pets.length==0){
        noResultsContainer.removeAttribute('hidden');//Si no hay ninguna mascota en adopción en la BD, mostrar aviso al usuario
    }else{
        noResultsContainer.setAttribute('hidden',"");//Si hay mascotas en la BD, esconder aviso al usuario
    }
    //Mapear y crear una card de HTML para cada una de las mascotas en la BD y mostrarlas
    petsContainer.innerHTML = '<div class="row">' + pets.map(petToHTML).join("\n") + '\n</div>';
}
//Filtrar las mascotas de acuerdo a los filtros que ponga el usuario en la parte izquierda
function filterPets(){
    //Obtener elementos del HTML y sus valores
    let ciudad = document.getElementById('ciudad').value;
    let tipo = document.getElementById('tipoMascota').value;
    let raza = document.getElementById('raza').value;
    let genero = document.getElementById('genero').value;
    let talla = document.getElementById('size').value;
    let edad = document.getElementById('edad').value;
    let perronalidad = document.getElementById('perronalidad').value;
    //Cargar todas las mascotas de la base de datos
    loadPets(petsUrl).then(pets =>{
        //Obtener el listado de las mascotas que cumplan con todas las características de los filtros
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
        //Mostrar mascotas en el html
        petsList(filteredPets);
    });
}
//Obtener los filtros de la mascota ideal del adoptante que inició sesión
function getIdealFilters(){
    //Obtener quien es el adoptante conectado
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    //Obtener los datos del adoptante a partir del id
    loadAdoptante(adoptanteUrl+loginUser.id).then(adoptante =>{
        let filters = new Object();
        filters.ciudad = adoptante.ciudad;
        filters.tipo = adoptante.tipoIdeal;
        filters.raza = adoptante.razaIdeal;
        filters.genero = adoptante.generoIdeal;
        filters.talla = adoptante.tallaIdeal;
        filters.edad = adoptante.edadIdeal;
        filters.perronalidad = adoptante.perronalidadIdeal;
        filterPetsIdeal(filters); //Filtrar con las características de la mascota ideal
    });
}
//Filtrar mascotas a aquellas que cumplan con las caracteristicas de la mascota ideal del adoptante
function filterPetsIdeal(filters){
    //Cargar todas las mascotas de la base de datos
    loadPets(petsUrl).then(pets =>{
        //Filtrar las mascotas a aquellas que cumplan con las características que se recibieron
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
        //Mostrar las mascotas en el HTML
        petsList(filteredPets);
    });
}
//Cargar y obtener el home feed (mascotas adoptables)
function getHomeFeed(){
    //Mostrar todas las mascotas disponibles (noAdoptadas)
    loadPets(petsUrl).then(pets =>{
        //Filtrar para dejar solo las mascotas adoptables
        let availablePets = pets.filter(function (pet) {
            return (pet.status == 'noAdoptado');
        });
        //Mostrar las mascotas en el html
        petsList(availablePets);
    });
}
//Mostrar mascota especifica
function showDetails(id){
    //Guardar el id
    sessionStorage.removeItem("petDetails");
    sessionStorage.setItem("petDetails",id);
    //Redirigir a mostrar los detalles de la mascota
    window.location.href='/AdoptAFriend/app/views/Adoptante/detallesAdoptante.html';
}
validateToken()
