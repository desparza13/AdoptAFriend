"use strict";

const adoptanteUrl = 'http://localhost:3000/adoptante/';
const adoptantePostUrl = 'http://localhost:3000/admin/adoptante/';

//Validar que el adoptante haya iniciado sesión y tenga una sesión válida
function validateToken(){
    //Obtener inicio de sesión de SessionStorage
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    //Si no hay sesión valida redirigir a la página de error
    if (loginUser==undefined){ 
        window.location.href="/AdoptAFriend/app/views/error.html";
    }else{ //Si hay sesión válida mostrar la página
        getIdeal();
    }
}
//Obtener los datos de la mascota ideal
function getIdeal(){
    //Obtener que adoptante está conectado
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    //Obtener los detalles del adoptante de la base de datos
    loadAdoptante(adoptanteUrl+loginUser.id).then(adoptante =>{
        let filters = new Object();
        filters.ciudad = adoptante.ciudad;
        filters.tipo = adoptante.tipoIdeal;
        filters.raza = adoptante.razaIdeal;
        filters.genero = adoptante.generoIdeal;
        filters.talla = adoptante.tallaIdeal;
        filters.edad = adoptante.edadIdeal;
        filters.perronalidad = adoptante.perronalidadIdeal;
        displayIdeal(filters); //Cargar los datos en el HTML
    });
}
//Prepopular los campos de mascota ideal
function displayIdeal(filters){
    //Obtener elementos del HTML
    let ciudad = document.getElementById("ciudad");
    let tipo = document.getElementById("tipoMascota");
    let raza = document.getElementById("raza");
    let genero = document.getElementById("genero");
    let talla = document.getElementById("size");
    let edad = document.getElementById("edad");
    let perronalidad = document.getElementById("perronalidad");
    //Cargar los valores en el HTML
    ciudad.value = filters.ciudad;
    tipo.value = filters.tipo;
    raza.value = filters.raza;
    genero.value = filters.genero;
    talla.value = filters.talla;
    edad.value = filters.edad;
    perronalidad.value = filters.perronalidad;
}
//Permitir la edición del formulario
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
//Deshabilitar edición del formulario
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
//Cancelar edición
function cancelEdit(){
    getIdeal(); //Volver a escribir los datos que se tenían en la BD
    disableEdit(); //Deshabilitar edición
}
//Guardar cambios
function saveEdit(){
    disableEdit(); //Deshabilitar edición
    //Obtener formulario
    let tipo = document.getElementById("tipoMascota");
    let raza = document.getElementById("raza");
    let genero = document.getElementById("genero");
    let talla = document.getElementById("size");
    let edad = document.getElementById("edad");
    let perronalidad = document.getElementById("perronalidad");
    //Obtener adoptante conectado
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    //Obtener detalles del adoptante conectado
    loadAdoptante(adoptanteUrl+loginUser.id).then(adoptante =>{
        let newAdoptante = new Object();
        newAdoptante.tipoIdeal = tipo.value;
        newAdoptante.razaIdeal = raza.value;
        newAdoptante.generoIdeal = genero.value;
        newAdoptante.tallaIdeal = talla.value;
        newAdoptante.edadIdeal = edad.value;
        newAdoptante.perronalidadIdeal = perronalidad.value;
        //Actualizar la información del adoptante
        updateAdoptante(adoptantePostUrl+loginUser.id, newAdoptante, adoptante =>{
            getIdeal();
        },(error)=>console.log(error));
    });
    alert("Se editó correctamente tu mascota ideal")
}

validateToken();