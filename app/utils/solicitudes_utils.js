"use strict";

let solicitudContainer = document.getElementById('Solicitudes');
const solicitudesUrl = 'http://localhost:3000/solicitud/';

const petUrl = 'http://localhost:3000/pet/'
const adminPetUrl = 'http://localhost:3000/admin/pet'
const adminAdoptanteUrl = 'http://localhost:3000/admin/adoptante/';
const adoptanteUrl ='http://localhost:3000/adoptante/';

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
                        <button type="button" class="btn btn-lg btn-primary btnCentrado"><i class="fa fa-paw" aria-hidden="true"></i> Contactar</button><br>
                    </div>
                    <div class="media-right ml-3 mr-3 ">
                        <div class="abs-center">
                            <button type="button" class="btn btn-lg btn-success btnCentrado " onclick="aceptarSolicitud('${solicitud._id}','${solicitud.idMascota}','${solicitud.idAdoptante}')"><i class="fa fa-check" aria-hidden="true" ></i> Aceptar</button><br><br>
                            <button type="button" class="btn btn-lg btn-danger btnCentrado"><i class="fa fa-times" aria-hidden="true"></i> Rechazar</button><br>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    `
}


function preloadSolicitudes(solicitudes){
    solicitudContainer.innerHTML = solicitudes.map(solicitudToHTML).join("\n");
    for (const key in solicitudes) {
        loadSolicitudDetails(solicitudes[key]);
    }
}

function loadSolicitudDetails(solicitud){
    loadPet(petUrl+solicitud.idMascota)
    .then(pet=>{
        console.log(pet);
        writePetSolicitud(pet);
        loadAdoptante(adoptanteUrl+solicitud.idAdoptante)
            .then(adoptante=>{
                writeAdoptanteSolicitud(adoptante);
                }
            )
    })
}

function writePetSolicitud(pet){
    console.log("pet");
    console.log(pet);
    let nombrePet = document.getElementById("nombreMascota"+"/"+pet._id);
    let imgPet = document.getElementById("imgPet"+"/"+pet._id);
    console.log(pet.nombre);
    nombrePet.innerText = pet.nombre;
    imgPet.innerHTML= `<img class="petImg" src="${pet.petImg}" alt="Generic placeholder image">`;
}
function writeAdoptanteSolicitud(adoptante){
    let nombreAdoptante = document.getElementById("nombreAdoptante"+"/"+adoptante._id);
    nombreAdoptante.innerHTML = `<h5 >Busca ser adoptado por: ${adoptante.nombre}</h5>`
    
}

function aceptarSolicitud(idSolicitud,idPet,idAdoptante){
    console.log(idSolicitud);
    console.log(idPet);
    console.log(idAdoptante);
    loadPet(petUrl+idPet)
        .then(pet=>{
            actualizarMascota(pet);
            loadAdoptante(adoptanteUrl+idAdoptante)
            .then(adoptante=>{
                actualizarAdoptante(adoptante,pet._id);
            });

            deleteSolicitud(solicitudesUrl+idSolicitud,solicitud=>{
                console.log("Solicitud eliminada");
                console.log(solicitud);
            },(error)=>console.log(error));
        });
    
}

function actualizarMascota(pet){
    console.log(pet);
    pet.status = 'adoptado';
    console.log(pet);
    updatePet(adminPetUrl+'/'+pet._id,pet,pet=>{
        console.log("Mascota actualizada");
        console.log(pet);
    },(error)=>console.log(error));
}
function actualizarAdoptante(adoptante,petId){
    console.log(adoptante);
    console.log(petId);
    adoptante.misAdopciones.push(petId);
    console.log("ADOPTANTE")
    console.log(adoptante);
    console.log(adminAdoptanteUrl+adoptante._id);
    updateAdoptante(adminAdoptanteUrl+adoptante._id,adoptante,adoptante=>{
        console.log("Adoptante actualizado");
        console.log(adoptante);
    },(error)=>console.log(error));
}

loadSolicitudes(solicitudesUrl+'get').then(
    solicitudes=>{
        let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
        console.log(loginUser);
        console.log(loginUser.token);
        let availableSolicitudes = solicitudes.filter(function (solicitud) {
            
            return  (solicitud.idRescatista == loginUser.id);
        });
        
        
        preloadSolicitudes(availableSolicitudes);
        
    }
)

