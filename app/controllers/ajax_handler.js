"use strict";

//Carga las mascotas
async function loadPets(url){
    let response = await fetch(url);
    if(response.status != 200) return [];
    return await response.json();
}
//Carga la mascota nueva
function loadNewPet(url,newPet,onSuccess,onError){
    let xhr = new XMLHttpRequest(); //Hace el request
    xhr.open('POST',url)
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send(JSON.stringify(newPet));
    xhr.onload = () => getXhrResponse(xhr,onSuccess,onError);
}
//Actualizar mascota
function loadNewPet(url,newPet,onSuccess,onError){
    let xhr = new XMLHttpRequest(); //Hace el request
    xhr.open('PUT',url)
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send(JSON.stringify(newPet));
    xhr.onload = () => getXhrResponse(xhr,onSuccess,onError);
}
//Esperar y obtener la respuesta de Xhr
function getXhrResponse(xhr, onSuccess, onError) {
    if (xhr.status == 200) {
        onSuccess(xhr.responseText);
    } else {
        onError(xhr.status + ': ' + xhr.statusText);
    }
}