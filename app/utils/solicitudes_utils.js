"use strict";

let solicitudContainer = document.getElementById('Solicitudes');
const solicitudesUrl = 'http://localhost:3000/solicitud/';

const petUrl = 'http://localhost:3000/pet/'
const adminPetUrl = 'http://localhost:3000/admin/pet'
const adminAdoptanteUrl = 'http://localhost:3000/admin/adoptante/';
const adoptanteUrl = 'http://localhost:3000/adoptante/';

function validateToken() {
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    if (loginUser == undefined) {
        window.location.href = "/AdoptAFriend/app/views/error.html";
    } else {
        getSolicitudes();
    }
}

function solicitudToHTML(solicitud) {
    console.log(solicitud);
    return `
    <div class="card abs-center">
        <div class="media ml-3 mt-3 mb-3">
            <div class="media-body">
                <div class="media col-16 mt-2">
                        <div class="media  mr-5 ml-5 mt-3 mb-3">
                            <div class="align-self-center " id="imgPet/${solicitud.idMascota}"></div>
                        </div>
                    <div class="media-body">
                        <h2 class="card-title" id="nombreMascota/${solicitud.idMascota}"></h2>
                        <div id="nombreAdoptante/${solicitud.idAdoptante}"></div>
                        <br>
                        <p id="contactar"></p>
                    </div>
                    <div class="media-right ml-3 mr-3 ">
                        <div class="abs-center">
                            <button type="button" class="btn btn-lg btn-success btnCentrado " data-toggle="modal" data-target="#aceptar" onclick="aceptarSolicitud('${solicitud._id}','${solicitud.idMascota}','${solicitud.idAdoptante}')"><i class="fa fa-check" aria-hidden="true" ></i> Aceptar</button><br><br>
                            <button type="button" class="btn btn-lg btn-danger btnCentrado" data-toggle="modal" data-target="#rechazar" onclick="removeSolicitud('${solicitud._id}')"><i class="fa fa-times" aria-hidden="true"></i> Rechazar</button><br>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    `
}

function botonContactar(nombreMascota, correoAdoptante) {
    return `    
    <form enctype="text/plain" method="post" action='mailto:${correoAdoptante}?subject=Adopción%20de%20${nombreMascota}%20a%20través%20de%20Adopt%20a%20Friend&body=%0D%0A'>
        <button type="submit" class="btn btn-lg btn-primary btnCentrado" ><i class="fa fa-paw" aria-hidden="true"></i> Contactar</button><br>
    </form>
    `
}


function preloadSolicitudes(solicitudes) {

    solicitudContainer.innerHTML = solicitudes.map(solicitudToHTML).join("\n");
    for (const key in solicitudes) {
        loadSolicitudDetails(solicitudes[key]);
    }
}

function loadSolicitudDetails(solicitud) {
    const contactar = document.getElementById('contactar');

    loadPet(petUrl + solicitud.idMascota)
        .then(pet => {
            console.log(pet);
            writePetSolicitud(pet);
            loadAdoptante(adoptanteUrl + solicitud.idAdoptante)
                .then(adoptante => {
                    console.log(adoptante);
                    console.log(contactar);
                    contactar.innerHTML = botonContactar(pet.nombre, adoptante.correo);
                    writeAdoptanteSolicitud(adoptante);
                })
        })
}

function writePetSolicitud(pet) {
    console.log("pet");
    console.log(pet);
    let nombrePet = document.getElementById("nombreMascota" + "/" + pet._id);
    let imgPet = document.getElementById("imgPet" + "/" + pet._id);
    console.log(pet.nombre);
    nombrePet.innerText = pet.nombre;
    imgPet.innerHTML = `<img class="petImg" src="${pet.petImg}" alt="Generic placeholder image">`;
}

function writeAdoptanteSolicitud(adoptante) {
    let nombreAdoptante = document.getElementById("nombreAdoptante" + "/" + adoptante._id);
    nombreAdoptante.innerHTML = `<h5 >Busca ser adoptado por: </h5><h5>${adoptante.nombre}</h5>`

}


function aceptarSolicitud(idSolicitud, idPet, idAdoptante) {
    console.log(idSolicitud);
    console.log(idPet);
    console.log(idAdoptante);
    loadPet(petUrl + idPet)
        .then(pet => {
            actualizarMascota(pet);
        });

    borrarSolicitud(solicitudesUrl + idSolicitud, solicitud => {
        console.log("Solicitud eliminada");
        console.log(solicitud);
    }, (error) => console.log(error));
    loadAdoptante(adoptanteUrl + idAdoptante).then(adoptante => {
        let newAdoptante = new Object();
        newAdoptante.misAdopciones = adoptante.misAdopciones;
        newAdoptante.misAdopciones.push(idPet);
        updateAdoptante(adminAdoptanteUrl + idAdoptante, newAdoptante, adoptante => {
            console.log(newAdoptante);
            window.location.href='/AdoptAFriend/app/views/Rescatista/solicitudesAdopcion.html'

        }, (error) => console.log(error));
    });
    window.location.href='/AdoptAFriend/app/views/Rescatista/solicitudesAdopcion.html'
}

function removeSolicitud(idSolicitud) {
    console.log("REMOVE");
    console.log()
    borrarSolicitud(solicitudesUrl + idSolicitud, solicitud => {
        console.log(solicitud);
        console.log("AAAAAAAAA");
        loadSolicitudes(solicitudesUrl + 'get').then(
            solicitudes => {
                console.log(solicitudes);
                let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
                console.log(loginUser);
                console.log(loginUser.token);
                let availableSolicitudes = solicitudes.filter(function (solicitud) {
                    return (solicitud.idRescatista == loginUser.id);
                });
                preloadSolicitudes(availableSolicitudes);
            }
        )
    })



}

function actualizarMascota(pet) {
    console.log(pet);
    pet.status = 'adoptado';
    console.log(pet);
    updatePet(adminPetUrl + '/' + pet._id, pet, pet => {
        console.log("Mascota actualizada");
        console.log(pet);
    }, (error) => console.log(error));
}

function actualizarAdoptante(petId) {
    console.log(adoptante);
    console.log(petId);
    adoptante.misAdopciones.push(petId);
    let newAdoptante = new Object();
    console.log("ADOPTANTE")
    console.log(adoptante);
    console.log(adoptante._id);
    console.log(adminAdoptanteUrl + adoptante._id);
    updateAdoptante(adminAdoptanteUrl + adoptante._id, adoptante, adoptante => {
        console.log("Adoptante actualizado");
        console.log(adoptante);
    }, (error) => console.log(error));
}

function getSolicitudes() {
    loadSolicitudes(solicitudesUrl + 'get').then(
        solicitudes => {
            let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
            console.log(loginUser);
            console.log(loginUser.token);
            let availableSolicitudes = solicitudes.filter(function (solicitud) {
                return (solicitud.idRescatista == loginUser.id);
            });
            preloadSolicitudes(availableSolicitudes);
        }
    )
}
validateToken();