"use strict";
//Validar inicio de sesión válido del rescatista
function validateToken() {
    //Obtener inicio de sesión del Session Storage
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    if (loginUser == undefined) { //Si no se ha iniciado sesión redirigir a la página de error
        window.location.href = "/AdoptAFriend/app/views/error.html";
    } else { //Si hay sesión válida cargar la página con los detalles del rescatista
        loadPetDetails();
    }
}
//Cargar los detalles de una mascota
function loadPetDetails() {
    //Obtener el id de la mascota de la cual se quieren mostrar los detalles
    let idPet = sessionStorage.getItem('petDetails');
    //Obtener lo detalles de la mascota con ese id de la base de datos
    loadPet('http://localhost:3000/pet' + '/' + idPet).then(petDetail => {
        writePetDetails(petDetail); //Escribir los detalles de la mascota en el HTML
    });
};
//Escribir los detalles de la mascota en el HTML
function writePetDetails(petDetail) {
    //Obtener elementos del HTML
    let titulo = document.getElementById("nombreTitulo");
    let nombre = document.getElementById("nombre");
    let ciudad = document.getElementById("ciudad");
    let tipo = document.getElementById("tipoMascota");
    let raza = document.getElementById("raza");
    let genero = document.getElementById("genero");
    let talla = document.getElementById("size");
    let edad = document.getElementById("edad");
    let perronalidad = document.getElementById("perronalidad");
    //Colocar los detalles de la mascota en los elementos de HTML correspondientes
    titulo.innerText = petDetail.nombre;
    nombre.value = petDetail.nombre;
    ciudad.value = petDetail.ciudad;
    tipo.value = petDetail.tipo;
    raza.value = petDetail.raza;
    genero.value = petDetail.genero;
    talla.value = petDetail.talla;
    edad.value = petDetail.edad;
    perronalidad.value = petDetail.perronalidad;
}
//Borrar mascota de la cual se muestran los detalles
function erasePet() {
    //Preguntar si esta seguro de borrar la mascota
    if (window.confirm('¿Estas seguro de que quieres eliminar a la mascota?')) {
        //Obtener el id de la mascota a eliminar
        let pet = sessionStorage.getItem('petDetails');
        //Eliminar la mascota de la base de datos
        borrarPet('http://localhost:3000/admin/pet/' + pet, mascota => {
            window.alert('Se eliminó correctamente la mascota!.')//Notificar que la mascota se eliminó exitosamente
        }, (error) => {window.alert('Ocurrió un problema al eliminar la mascota!.')}); //Notificar que hubo un error al eliminar la mascota
    }
    //Redirigir a la pantalla principal
    window.location.href = '/AdoptAFriend/app/views/Rescatista/homeRescatista.html';


}
//Cancelar edición de la mascota
function cancelEdit() {
    //Volver a la pantalla principal
    window.location.href = '/AdoptAFriend/app/views/Rescatista/detallesRescatista.html';
}
//Guardar cambios de la mascota
function saveEdit() {
    //Obtener formulario
    let nombre = document.getElementById("nombre");
    let ciudad = document.getElementById("ciudad");
    let tipo = document.getElementById("tipoMascota");
    let raza = document.getElementById("raza");
    let genero = document.getElementById("genero");
    let talla = document.getElementById("size");
    let edad = document.getElementById("edad");
    let perronalidad = document.getElementById("perronalidad");
    let pet = sessionStorage.getItem('petDetails');
    //Crear nuevo objeto con los datos "nuevos" de la mascota a editar
    let newPet = new Object();
    newPet.nombre = nombre.value;
    newPet.ciudad = ciudad.value;
    newPet.tipo = tipo.value;
    newPet.raza = raza.value;
    newPet.genero = genero.value;
    newPet.talla = talla.value;
    newPet.edad = edad.value;
    newPet.perronalidad = perronalidad.value;
    //Actualizar mascota en la base de datos
    updatePet('http://localhost:3000/admin/pet/' + pet, newPet, pet => {
        //Notificar que los cambios a la mascota fueron guardados exitosamente
        window.alert('Se actualizaron correctamente los detalles de la mascota!.');
        //Volver a la vista de detalles de esa mascota, dando por finalizada la edición
        window.location.href = '/AdoptAFriend/app/views/Rescatista/detallesRescatista.html';

    }, (error) => {
        //Notificar que hubo un error al guardar los cambios a los detalles de la mascota
        window.alert('Ocurrio un error al actualizar los detalles de la mascota')
        window.location.href = '/AdoptAFriend/app/views/Rescatista/detallesRescatista.html';

    });
}

validateToken();