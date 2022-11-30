"use strict";

const adoptanteUrl = 'http://localhost:3000/adoptante/';

function getIdeal(){
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
        displayIdeal(filters);
    });
}

function displayIdeal(filters){
    let ciudad = document.getElementById("ciudad");
    let tipo = document.getElementById("tipoMascota");
    let raza = document.getElementById("raza");
    let genero = document.getElementById("genero");
    let talla = document.getElementById("size");
    let edad = document.getElementById("edad");
    let perronalidad = document.getElementById("perronalidad");
    ciudad.value = filters.ciudad;
    tipo.value = filters.tipo;
    raza.value = filters.raza;
    genero.value = filters.genero;
    talla.value = filters.talla;
    edad.value = filters.edad;
    perronalidad.value = filters.perronalidad;
}
getIdeal();