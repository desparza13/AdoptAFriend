"use strict";
const solicitudesUrl = 'http://localhost:3000/solicitud/';
let solicitudContainer = document.getElementById('Solicitudes');
let noResultsContainer = document.getElementById('noResults');
let botonAceptarContainer = document.getElementById('aceptar');
let botonRechazarContainer = document.getElementById('aceptarRechazar')

const petUrl = 'http://localhost:3000/pet/'
const adminPetUrl = 'http://localhost:3000/admin/pet'
const adminAdoptanteUrl = 'http://localhost:3000/admin/adoptante/';
const adoptanteUrl = 'http://localhost:3000/adoptante/';

//Validar que el rescatista haya iniciado sesión y tenga una sesión válida
function validateToken() {
    //Obtener inicio de sesión de SessionStorage
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    //Si no hay sesión valida redirigir a la página de error
    if (loginUser == undefined) {
        window.location.href = "/AdoptAFriend/app/views/error.html";
    } else { //Si hay sesión válida mostrar la página
        getSolicitudes();
    }
}
//Convertir una solicitud a su card de HTML con sus datos correspondientes
function solicitudToHTML(solicitud) {
    return `
    <div class="card abs-center">
        <div class="media ml-3 mt-3 mb-3">
            <div class="media-body">
                <div class="media col-16 mt-2">
                        <div class="media left  mr-5 ml-5 mt-3 mb-3">
                            <div class="align-self-center " id="imgPet/${solicitud._id}"></div>
                        </div>
                    <div class="media-body">
                        <h2 class="card-title" id="nombreMascota/${solicitud._id}"></h2>
                        <div id="nombreAdoptante/${solicitud._id}"></div>
                        <br>
                        <p id="contactar/${solicitud._id}"></p>
                    </div>
                    <div class="media-right ml-3 mr-3 ">
                        <div class="abs-center">
                            <button type="button" class="btn btn-lg btn-success btnCentrado " onclick="botonUpload('${solicitud._id}','${solicitud.idMascota}','${solicitud.idAdoptante}')" ><i class="fa fa-check" aria-hidden="true" ></i> Aceptar</button><br><br>
                            <button type="button" class="btn btn-lg btn-danger btnCentrado"  onclick="botonRemove('${solicitud._id}')"><i class="fa fa-times" aria-hidden="true"></i> Rechazar</button><br>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
}
//Precargar solicitudes
function preloadSolicitudes(solicitudes) {
    if (solicitudes.length == 0) { //Si no hay solicitudes
        noResultsContainer.removeAttribute('hidden'); //Mostrar que no hay resultados
    } else {
        noResultsContainer.setAttribute('hidden', ""); //Esconder el contenedor de no resultados
        solicitudContainer.innerHTML = solicitudes.map(solicitudToHTML).join("\n"); //Mostrar las solicitudes en HTML
        for (const key in solicitudes) {
            loadSolicitudDetails(solicitudes[key]); //Guardar las solicitudes
        }
    }
}
//Guardar los detalles
function loadSolicitudDetails(solicitud) {
    const contactar = document.getElementById('contactar' + '/' + solicitud._id); //Obtener a contactar
    //Obtener la mascota de la solicitud
    loadPet(petUrl + solicitud.idMascota)
        .then(pet => {
            writePetSolicitud(pet, solicitud._id); //Escribir las mascotas de la solicitud
            //Obtener los detalles del adoptante que hizo la solicitud
            loadAdoptante(adoptanteUrl + '/' + solicitud.idAdoptante)
                .then(adoptante => {
                    contactar.innerHTML = botonContactar(pet.nombre, adoptante.correo);
                    writeAdoptanteSolicitud(adoptante, solicitud._id);
                })
        })
}
//Crear correo con los datos de la mascota a adoptar y el correo del adoptante
function botonContactar(nombreMascota, correoAdoptante) {
    return `    
    <form enctype="text/plain" method="post" action='mailto:${correoAdoptante}?subject=Adopción%20de%20${nombreMascota}%20a%20través%20de%20Adopt%20a%20Friend&body=%0D%0A'>
        <button type="submit" class="btn btn-lg btn-primary btnCentrado" ><i class="fa fa-paw" aria-hidden="true"></i> Contactar</button><br>
    </form>`
}
//Llenar los datos de la mascota que se quiere adoptar
function writePetSolicitud(pet, idSolicitud) {
    //Obtener elementos del documento
    let nombrePet = document.getElementById("nombreMascota" + "/" + idSolicitud);
    let imgPet = document.getElementById("imgPet" + "/" + idSolicitud);
    //Poner los valores en el html
    nombrePet.innerText = pet.nombre;
    imgPet.innerHTML = `<img class="petImg" src="${pet.petImg}" alt="Generic placeholder image">`;
}
//Llenar los datos de la persona que quiere adoptar la mascota
function writeAdoptanteSolicitud(adoptante, idSolicitud) {
    //Obtener elementos del documento
    let nombreAdoptante = document.getElementById("nombreAdoptante" + "/" + idSolicitud);
    //Poner los valores en el html
    nombreAdoptante.innerHTML = `<h5 >Busca ser adoptado por: ${adoptante.nombre}</h5>`
}
//Crear html del botón de aceptar
function botonAceptar(idSolicitud, idMascota, idAdoptante) {
    return `                         
    <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="aceptarSolicitud('${idSolicitud}','${idMascota}','${idAdoptante}')">Aceptar</button> 
    `
}
//Boton para aceptar y subir que se aceptó la adopción de la mascota
function botonUpload(idSolicitud, idMascota, idAdoptante) {
    $("#adoptar").modal({
        backdrop: 'static',
        keyboard: false,
        show: true
    });
    botonAceptarContainer.innerHTML = botonAceptar(idSolicitud, idMascota, idAdoptante);
}
//Botón en html para rechazar la solicitud de adopción
function botonRechazar(idSolicitud) {
    return `                         
    <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="removeSolicitud('${idSolicitud}')">Aceptar</button>
    `
}
//Botón que del modal para eliminar la solicitud
function botonRemove(idSolicitud) {
    $("#rechazarP").modal({
        backdrop: 'static',
        keyboard: false,
        show: true
    });
    botonRechazarContainer.innerHTML = botonRechazar(idSolicitud);
}
//Aceptar solicitud y actualizar las entidades en la base de datos
function aceptarSolicitud(idSolicitud, idPet, idAdoptante) {
    //Eliminar solicitud
    borrarSolicitud(solicitudesUrl + idSolicitud, solicitud => {
        console.log(solicitud);
    }, (error) => console.log(error));
    //Actualizar la mascota
    loadPet(petUrl + idPet)
        .then(pet => {
            actualizarMascota(pet);
        });
    //Actualizar el adoptante
    loadAdoptante(adoptanteUrl + idAdoptante).then(adoptante => {
        //Obtener las adopciones del adoptante y añadirle su nueva mascota
        let newAdoptante = new Object();
        newAdoptante.misAdopciones = adoptante.misAdopciones;
        newAdoptante.misAdopciones.push(idPet);
        //Actualizar los valores en la base de dato
        updateAdoptante(adminAdoptanteUrl + idAdoptante, newAdoptante, adoptante => {
            console.log(newAdoptante);
        }, (error) => console.log(error));
    });
    $("#adopcion").modal({
        backdrop: 'static',
        keyboard: false,
        show: true
    });
}
function recargar() {
    window.location.href = '/AdoptAFriend/app/views/Rescatista/solicitudesAdopcion.html'
}
//Eliminar solicitud de adopción
function removeSolicitud(idSolicitud) {
    //Borrar solicitud en la base de datos
    borrarSolicitud(solicitudesUrl + idSolicitud, solicitud => {
        console.log(solicitud);
    })
    $("#rechazar").modal({
        backdrop: 'static',
        keyboard: false,
        show: true
    });
}
//Actualizar
function actualizarMascota(pet) {
    pet.status = 'adoptado';
    //Actualizar en la base de datos
    updatePet(adminPetUrl + '/' + pet._id, pet, pet => {
        console.log(pet);
    }, (error) => console.log(error));
}
//Obtener todas las solicitudes
function getSolicitudes() {
    //Obtener solicitudes de la base de datos
    loadSolicitudes(solicitudesUrl + 'get').then(
        solicitudes => {
            //Obtener el rescatista conectado
            let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
            //Mostrar solo las solicitudes que le pertenecen
            let availableSolicitudes = solicitudes.filter(function (solicitud) {
                return (solicitud.idRescatista == loginUser.id);
            });
            //Cargar solicitudes
            preloadSolicitudes(availableSolicitudes);
        }
    )
}
validateToken();