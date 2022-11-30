"use strict";

const rescatistaUrl = 'http://localhost:3000/rescatista/';
const rescatistaPostUrl = 'http://localhost:3000/admin/rescatista/';

function getData(){
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    console.log(loginUser.id);
    loadRescatista(rescatistaUrl+loginUser.id).then(rescatista =>{
        displayIdeal(rescatista);
    });
}

function displayIdeal(rescatista){
    let nombre = document.getElementById("rName");
    let email = document.getElementById("rEmail");
    let usuario = document.getElementById("rUser");
    let ciudad = document.getElementById("rCiudad");
    nombre.value = rescatista.nombre;
    email.value = rescatista.correo;
    usuario.value = rescatista.usuario;
    ciudad.value = rescatista.ciudad;
}

function enableEdit() {
    //obtener botones
    let botonEditar = document.getElementById("editar");
    let botonConfirmar = document.getElementById("confirmar");
    let botonCancelar = document.getElementById("cancelar");
    //Obtener formulario
    let nombre = document.getElementById("rName");
    let email = document.getElementById("rEmail");
    let usuario = document.getElementById("rUser");
    let ciudad = document.getElementById("rCiudad");
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
function disableEdit(){
    //obtener botones
    let botonEditar = document.getElementById("editar");
    let botonConfirmar = document.getElementById("confirmar");
    let botonCancelar = document.getElementById("cancelar");
    //Obtener formulario
    let nombre = document.getElementById("rName");
    let email = document.getElementById("rEmail");
    let usuario = document.getElementById("rUser");
    let ciudad = document.getElementById("rCiudad");
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

function saveEdit(){
    disableEdit();
    //Obtener formulario
    let nombre = document.getElementById("rName");
    let email = document.getElementById("rEmail");
    let usuario = document.getElementById("rUser");
    let ciudad = document.getElementById("rCiudad");
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    console.log(loginUser.id);
    loadRescatista(rescatistaUrl+loginUser.id).then(rescatista =>{
        let newRescatista = new Object();
        newRescatista.nombre = nombre.value;
        newRescatista.correo = email.value;
        newRescatista.usuario = usuario.value;
        newRescatista.ciudad = ciudad.value;
        updateRescatista(rescatistaPostUrl+loginUser.id, newRescatista, rescatista =>{
            console.log(newRescatista);
            getData();
        },(error)=>console.log(error));
    });
}

getData();