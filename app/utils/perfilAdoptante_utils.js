"use strict";

const adoptanteUrl = 'http://localhost:3000/adoptante/';
const adoptantePostUrl = 'http://localhost:3000/admin/adoptante/';

//* Validar que exista un inicio de sesió de usuario
function validateToken(){
    //Obtener inicio de sesión de SessionStorage
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    //Si no hay sesión valida redirigir a la página de error
    if (loginUser==undefined){
        window.location.href="/AdoptAFriend/app/views/error.html";
    }else{ //Si hay sesión válida mostrar las mascotas adoptadas
        getData();
    }
}


function getData(){
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    console.log(loginUser.id);
    loadAdoptante(adoptanteUrl+loginUser.id).then(adoptante =>{
        displayIdeal(adoptante);
    });
}

function displayIdeal(adoptante){
    let nombre = document.getElementById("aName");
    let email = document.getElementById("aEmail");
    let usuario = document.getElementById("aUser");
    let ciudad = document.getElementById("aCiudad");
    nombre.value = adoptante.nombre;
    email.value = adoptante.correo;
    usuario.value = adoptante.usuario;
    ciudad.value = adoptante.ciudad;
}

//*Habilitar la edición, botones de confirmar y cancelar, y deshabilitar el de editat
function enableEdit() {
    //obtener botones
    let botonEditar = document.getElementById("editar");
    let botonConfirmar = document.getElementById("confirmar");
    let botonCancelar = document.getElementById("cancelar");
    //Obtener formulario
    let nombre = document.getElementById("aName");
    let email = document.getElementById("aEmail");
    let usuario = document.getElementById("aUser");
    let ciudad = document.getElementById("aCiudad");
    //Habilitar edicion
    nombre.removeAttribute('disabled');
    email.removeAttribute('disabled');
    usuario.removeAttribute('disabled');
    ciudad.removeAttribute('disabled');
    //Mostrar confirmar y cancelar
    botonConfirmar.removeAttribute('hidden');
    botonCancelar.removeAttribute('hidden');
    //Ocultar editar
    botonEditar.setAttribute('hidden',"");
}

//* Deshabilitar la edición y esconder los botones de confirmar y cancelar
function disableEdit(){
    //obtener botones
    let botonEditar = document.getElementById("editar");
    let botonConfirmar = document.getElementById("confirmar");
    let botonCancelar = document.getElementById("cancelar");
    //Obtener formulario
    let nombre = document.getElementById("aName");
    let email = document.getElementById("aEmail");
    let usuario = document.getElementById("aUser");
    let ciudad = document.getElementById("aCiudad");
    //Deshabilitar edicion
    nombre.setAttribute('disabled',"");
    email.setAttribute('disabled',"");
    usuario.setAttribute('disabled',"");
    ciudad.setAttribute('disabled',"");
    //Ocultar confirmar y cancelar
    botonConfirmar.setAttribute('hidden',"");
    botonCancelar.setAttribute('hidden',"");
    //Mostrar editar
    botonEditar.removeAttribute('hidden');
}
function cancelEdit(){
    getData();
    disableEdit();
}

//*Actualizar en la BD la información que se ingreso
function saveEdit(){
    disableEdit();
    console.log("A")
    $("#perfilA").modal({
        backdrop: 'static',
        keyboard: false,
        show: true
    });
    //Obtener formulario
    let nombre = document.getElementById("aName");
    let email = document.getElementById("aEmail");
    let usuario = document.getElementById("aUser");
    let ciudad = document.getElementById("aCiudad");
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    console.log(loginUser.id);
    loadAdoptante(adoptanteUrl+loginUser.id).then(adoptante =>{
        let newAdoptante = new Object();
        newAdoptante.nombre = nombre.value;
        newAdoptante.correo = email.value;
        newAdoptante.usuario = usuario.value;
        newAdoptante.ciudad = ciudad.value;
        updateAdoptante(adoptantePostUrl+loginUser.id, newAdoptante, adoptante =>{
            console.log(newAdoptante);
            
            getData();
        },(error)=>console.log(error));
    });
}

validateToken();