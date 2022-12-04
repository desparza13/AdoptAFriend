"use strict";

const rescatistaUrl = 'http://localhost:3000/rescatista/';
const rescatistaPostUrl = 'http://localhost:3000/admin/rescatista/';

// Validar que exista un inicio de sesión de usuario
function validateToken(){
    //Obtener inicio de sesión de SessionStorage
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    //Si no hay sesión valida redirigir a la página de error
    if (loginUser==undefined){
        window.location.href="/AdoptAFriend/app/views/error.html";
    }else{ //Si hay sesión válida mostrar la info del rescatista
        getData();
    }
}
//Obtener información del adoptante y popular el HTML
function getData(){
    //Obtener usuario que inició sesión
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    //Obtener información del adoptante de la base de datos
    loadRescatista(rescatistaUrl+loginUser.id).then(rescatista =>{
        //Mostrar la información en el HTML
        displayIdeal(rescatista);
    });
}
//Mostrar la información del rescatista en el HTML
function displayIdeal(rescatista){
    //Obtener elementos del HTML
    let nombre = document.getElementById("rName");
    let email = document.getElementById("rEmail");
    let usuario = document.getElementById("rUser");
    let ciudad = document.getElementById("rCiudad");
    //Poner los valores en el HTML
    nombre.value = rescatista.nombre;
    email.value = rescatista.correo;
    usuario.value = rescatista.usuario;
    ciudad.value = rescatista.ciudad;
}
//Habilitar la edición, botones de confirmar y cancelar, y deshabilitar el de editar
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
// Deshabilitar la edición y esconder los botones de confirmar y cancelar
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
//Cancelar edición
function cancelEdit(){
    getData(); //Obtener datos que había en la base de datos
    disableEdit(); //Deshabilitar edición
}
//Actualizar en la BD la información que se ingresó
function saveEdit(){
    disableEdit();
    //Obtener formulario
    let nombre = document.getElementById("rName");
    let email = document.getElementById("rEmail");
    let usuario = document.getElementById("rUser");
    let ciudad = document.getElementById("rCiudad");
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    //Buscar la información del rescatista que inició sesión en la BD
    loadRescatista(rescatistaUrl+loginUser.id).then(rescatista =>{
        //Crear objeto con la nueva información del form
        let newRescatista = new Object();
        newRescatista.nombre = nombre.value;
        newRescatista.correo = email.value;
        newRescatista.usuario = usuario.value;
        newRescatista.ciudad = ciudad.value;
        //Actualizar la base de datos
        updateRescatista(rescatistaPostUrl+loginUser.id, newRescatista, rescatista =>{
            //validar el modal
            $("#perfilR").modal({
                backdrop: 'static',
                keyboard: false,
                show: true
            });
            //Obtener información para actualizar página
            getData();
        },(error)=>console.log(error));
    });
}
validateToken();