"use strict";

let solicitudContainer = document.getElementById('Solicitudes');
const solicitudesUrl = 'http://localhost:3000/solicitud';
const petsUrl = 'http://localhost:3000/pet'

function solicitudToHTML(solicitud) {
    return `
    <div class="media col-12 mt-2">
        <div class="media-left align-self-center mr-3">
            <div id=imgAdoptante></div>
        </div>
        <div class="media-body">
            <h2 class="card-title">PetName(${solicitud.idMascota})</h2>
            <h5>Busca ser adoptado por: </h5>
            <br>
            <button type="button" class="btn btn-lg btn-primary btnCentrado"><i class="fa fa-paw" aria-hidden="true"></i> Contactar</button><br>
        </div>
        <div class="media-right align-self-center">
            <div class="abs-center">
                <button type="button" class="btn btn-lg btn-success btnCentrado"><i class="fa fa-check" aria-hidden="true"></i> Aceptar</button><br><br>
                <button type="button" class="btn btn-lg btn-danger btnCentrado"><i class="fa fa-times" aria-hidden="true"></i> Rechazar</button><br>
            </div>
        </div>
       
    </div>
    `
}



function preloadSolicitudes(solicitudes){
    solicitudContainer.innerHTML = solicitudes.map(solicitudToHTML).join("\n");
}

function PetName(pet){
    loadPet(petsUrl+'/'+pet)
}
function writeAdoptante(){

}

loadSolicitudes(solicitudesUrl).then(
    solicitudes=>{
        preloadSolicitudes(solicitudes);
    }
)

