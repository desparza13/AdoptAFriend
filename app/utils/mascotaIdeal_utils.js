"use strict";

const adoptanteUrl = 'http://localhost:3000/adoptante/';
const adoptantePostUrl = 'http://localhost:3000/admin/adoptante/';

function validateToken(){
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    if (loginUser==undefined){
        window.location.href="/AdoptAFriend/app/views/error.html";
    }else{
        getIdeal();
    }
}
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

function enableEdit() {
    //obtener botones
    let botonEditar = document.getElementById("editar");
    let botonConfirmar = document.getElementById("confirmar");
    let botonCancelar = document.getElementById("cancelar");
    //Obtener formulario
    let ciudad = document.getElementById("ciudad");
    let tipo = document.getElementById("tipoMascota");
    let raza = document.getElementById("raza");
    let genero = document.getElementById("genero");
    let talla = document.getElementById("size");
    let edad = document.getElementById("edad");
    let perronalidad = document.getElementById("perronalidad");
    //Habilitar edicion
    ciudad.removeAttribute('disabled');
    tipo.removeAttribute('disabled');
    raza.removeAttribute('disabled');
    genero.removeAttribute('disabled');
    talla.removeAttribute('disabled');
    edad.removeAttribute('disabled');
    perronalidad.removeAttribute('disabled');
    //Mostrar confirmar y cancelar
    botonConfirmar.removeAttribute('hidden');
    botonCancelar.removeAttribute('hidden');
    //Ocultar editar
    botonEditar.setAttribute('hidden',"");
}
function disableEdit(){
    //obtener botones
    let botonEditar = document.getElementById("editar");
    let botonConfirmar = document.getElementById("confirmar");
    let botonCancelar = document.getElementById("cancelar");
    //Obtener formulario
    let ciudad = document.getElementById("ciudad");
    let tipo = document.getElementById("tipoMascota");
    let raza = document.getElementById("raza");
    let genero = document.getElementById("genero");
    let talla = document.getElementById("size");
    let edad = document.getElementById("edad");
    let perronalidad = document.getElementById("perronalidad");
    //Deshabilitar edicion
    ciudad.setAttribute('disabled',"");
    tipo.setAttribute('disabled',"");
    raza.setAttribute('disabled',"");
    genero.setAttribute('disabled',"");
    talla.setAttribute('disabled',"");
    edad.setAttribute('disabled',"");
    perronalidad.setAttribute('disabled',"");;
    //Ocultar confirmar y cancelar
    botonConfirmar.setAttribute('hidden',"");
    botonCancelar.setAttribute('hidden',"");
    //Mostrar editar
    botonEditar.removeAttribute('hidden');
}
function cancelEdit(){
    getIdeal();
    disableEdit();
}

function saveEdit(){
    disableEdit();
    //Obtener formulario
    let tipo = document.getElementById("tipoMascota");
    let raza = document.getElementById("raza");
    let genero = document.getElementById("genero");
    let talla = document.getElementById("size");
    let edad = document.getElementById("edad");
    let perronalidad = document.getElementById("perronalidad");
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    console.log(loginUser.id);
    loadAdoptante(adoptanteUrl+loginUser.id).then(adoptante =>{
        let newAdoptante = new Object();
        newAdoptante.tipoIdeal = tipo.value;
        newAdoptante.razaIdeal = raza.value;
        newAdoptante.generoIdeal = genero.value;
        newAdoptante.tallaIdeal = talla.value;
        newAdoptante.edadIdeal = edad.value;
        newAdoptante.perronalidadIdeal = perronalidad.value;
        updateAdoptante(adoptantePostUrl+loginUser.id, newAdoptante, adoptante =>{
            console.log(newAdoptante);
            getIdeal();
        },(error)=>console.log(error));
    });
}

validateToken();