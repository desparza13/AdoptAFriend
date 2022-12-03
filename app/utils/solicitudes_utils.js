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

function preloadSolicitudes(solicitudes) {
    if (solicitudes.length == 0) {
        noResultsContainer.removeAttribute('hidden');
    } else {
        noResultsContainer.setAttribute('hidden', "");
        console.log(solicitudes);
        solicitudContainer.innerHTML = solicitudes.map(solicitudToHTML).join("\n");
        for (const key in solicitudes) {
            console.log("KEY");
            console.log(key);
            loadSolicitudDetails(solicitudes[key]);
        }
    }
}

function loadSolicitudDetails(solicitud) {
    const contactar = document.getElementById('contactar' + '/' + solicitud._id);

    loadPet(petUrl + solicitud.idMascota)
        .then(pet => {
            console.log(pet);
            writePetSolicitud(pet, solicitud._id);
            loadAdoptante(adoptanteUrl + '/' + solicitud.idAdoptante)
                .then(adoptante => {
                    console.log(adoptante);
                    console.log(contactar);
                    contactar.innerHTML = botonContactar(pet.nombre, adoptante.correo);
                    writeAdoptanteSolicitud(adoptante, solicitud._id);
                })
        })
}

function botonContactar(nombreMascota, correoAdoptante) {
    return `    
    <form enctype="text/plain" method="post" action='mailto:${correoAdoptante}?subject=Adopción%20de%20${nombreMascota}%20a%20través%20de%20Adopt%20a%20Friend&body=%0D%0A'>
        <button type="submit" class="btn btn-lg btn-primary btnCentrado" ><i class="fa fa-paw" aria-hidden="true"></i> Contactar</button><br>
    </form>
    `
}

function writePetSolicitud(pet, idSolicitud) {
    console.log("pet");
    console.log(pet);
    let nombrePet = document.getElementById("nombreMascota" + "/" + idSolicitud);
    let imgPet = document.getElementById("imgPet" + "/" + idSolicitud);
    console.log(pet.nombre);
    nombrePet.innerText = pet.nombre;
    imgPet.innerHTML = `<img class="petImg" src="${pet.petImg}" alt="Generic placeholder image">`;
}

function writeAdoptanteSolicitud(adoptante, idSolicitud) {
    let nombreAdoptante = document.getElementById("nombreAdoptante" + "/" + idSolicitud);
    nombreAdoptante.innerHTML = `<h5 >Busca ser adoptado por: ${adoptante.nombre}</h5>`
}

function botonAceptar(idSolicitud, idMascota, idAdoptante) {
    return `                         
    <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="aceptarSolicitud('${idSolicitud}','${idMascota}','${idAdoptante}')">Aceptar</button>

    `
}

function botonUpload(idSolicitud, idMascota, idAdoptante) {
    console.log("AA");
    console.log(idSolicitud);
    console.log(idMascota);
    console.log(idAdoptante);
    $("#adoptar").modal({
        backdrop: 'static',
        keyboard: false,
        show: true
    });
    botonAceptarContainer.innerHTML = botonAceptar(idSolicitud, idMascota, idAdoptante);

}

function botonRechazar(idSolicitud) {
    return `                         
    <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="removeSolicitud('${idSolicitud}')">Aceptar</button>
    `
}

function botonRemove(idSolicitud) {
    console.log(idSolicitud);
    
    $("#rechazarP").modal({
        backdrop: 'static',
        keyboard: false,
        show: true
    });
    botonRechazarContainer.innerHTML = botonRechazar(idSolicitud);

}

function aceptarSolicitud(idSolicitud, idPet, idAdoptante) {
    borrarSolicitud(solicitudesUrl + idSolicitud, solicitud => {
        console.log("Solicitud eliminada");
        console.log(solicitud);
        loadPet(petUrl + idPet)
        .then(pet => {
            actualizarMascota(pet);
            loadAdoptante(adoptanteUrl + idAdoptante).then(adoptante => {
                let newAdoptante = new Object();
                newAdoptante.misAdopciones = adoptante.misAdopciones;
                newAdoptante.misAdopciones.push(idPet);
                updateAdoptante(adminAdoptanteUrl + idAdoptante, newAdoptante, adoptante => {
                    console.log(newAdoptante);
                    $("#adopcion").modal({
                        backdrop: 'static',
                        keyboard: false,
                        show: true
                    });
                }, (error) => console.log(error));
            });
        });
    }, (error) => console.log(error));

    


    

   

    console.log(idSolicitud);
    console.log(idPet);
    console.log(idAdoptante);
}

function recargar() {
    window.location.href = '/AdoptAFriend/app/views/Rescatista/solicitudesAdopcion.html'

}

function removeSolicitud(idSolicitud) {
    console.log("REMOVE");
    console.log()
    borrarSolicitud(solicitudesUrl + idSolicitud, solicitud => {
        console.log(solicitud);
        console.log("AAAAAAAAA");
    })
    
    $("#rechazar").modal({
        backdrop: 'static',
        keyboard: false,
        show: true
    });

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

function recargar() {
    window.location.href = '/AdoptAFriend/app/views/Rescatista/solicitudesAdopcion.html'

}

validateToken();