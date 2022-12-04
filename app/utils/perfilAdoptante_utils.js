"use strict";

const adoptanteUrl = 'http://localhost:3000/adoptante/';
const adoptantePostUrl = 'http://localhost:3000/admin/adoptante/';

// Validar que exista un inicio de sesió de usuario
function validateToken(){
    //Obtener inicio de sesión de SessionStorage
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    //Si no hay sesión valida redirigir a la página de error
    if (loginUser==undefined){
        window.location.href="/AdoptAFriend/app/views/error.html";
    }else{ //Si hay sesión válida mostrar la info del adoptante
        getData();
    }
}
//Obtener información del adoptante y popular el HTML
function getData(){
    //Obtener usuario que inició sesión
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    //Obtener información del adoptante de la base de datos
    loadAdoptante(adoptanteUrl+loginUser.id).then(adoptante =>{
        //Mostrar la información en el HTML
        displayIdeal(adoptante);
    });
}
//Mostrar la información del adoptante en el HTML
function displayIdeal(adoptante){
    //Obtener elementos del HTML
    let nombre = document.getElementById("aName");
    let email = document.getElementById("aEmail");
    let usuario = document.getElementById("aUser");
    let ciudad = document.getElementById("aCiudad");
    //Poner los valores en el HTML
    nombre.value = adoptante.nombre;
    email.value = adoptante.correo;
    usuario.value = adoptante.usuario;
    ciudad.value = adoptante.ciudad;
}
//Habilitar la edición, botones de confirmar y cancelar, y deshabilitar el de editat
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
// Deshabilitar la edición y esconder los botones de confirmar y cancelar
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
//Cancelar edición
function cancelEdit(){
    getData(); //Obtener datos que había en la base de datos
    disableEdit(); //Deshabilitar edición
}
//Actualizar en la BD la información que se ingreso
function saveEdit(){
    disableEdit();
    //Obtener formulario
    let nombre = document.getElementById("aName");
    let email = document.getElementById("aEmail");
    let usuario = document.getElementById("aUser");
    let ciudad = document.getElementById("aCiudad");
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    //Buscar la información del adoptante que inició sesión en la BD
    loadAdoptante(adoptanteUrl+loginUser.id).then(adoptante =>{
        //Crear objeto con la nueva información del form
        let newAdoptante = new Object();
        newAdoptante.nombre = nombre.value;
        newAdoptante.correo = email.value;
        newAdoptante.usuario = usuario.value;
        newAdoptante.ciudad = ciudad.value;
        //Actualizar la base de datos
        updateAdoptante(adoptantePostUrl+loginUser.id, newAdoptante, adoptante =>{
            //Validar el modal
            $("#perfilA").modal({
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