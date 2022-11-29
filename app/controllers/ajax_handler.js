"use strict";
//?MASCOTAS
//! GET mascotas
//* Carga todas las mascotas
async function loadPets(url){
    let response = await fetch(url);
    if(response.status != 200) return [];
    return await response.json();
}

//! POST mascota
//* Carga la mascota nueva
function loadNewPet(url,newPet,onSuccess,onError){
    let xhr = new XMLHttpRequest(); //Hace el request
    xhr.open('POST',url)
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send(JSON.stringify(newPet));
    xhr.onload = () => getXhrResponse(xhr,onSuccess,onError);
}

//!PUT mascota
//* Actualizar mascota
function updatePet(url,newPet,onSuccess,onError){
    let xhr = new XMLHttpRequest(); //Hace el request
    xhr.open('PUT',url)
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send(JSON.stringify(newPet));
    xhr.onload = () => getXhrResponse(xhr,onSuccess,onError);
}
//-------------------------------------------------------------------------------------
//? RESCATISTAS
//! GET rescatista/:id
//* Obtener perfil rescatista especifico

//! POST rescatista
//* Carga el rescatista nuevo
function loadNewRescatista(url,newRescatista,onSuccess,onError){
    let xhr = new XMLHttpRequest(); //Hace el request
    xhr.open('POST',url)
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send(JSON.stringify(newRescatista));
    xhr.onload = () => getXhrResponse(xhr,onSuccess,onError);
}

//! POST login
//* Hacer login rescatista
function loadLoginRescatista(url,login,onSuccess,onError){
    let xhr = new XMLHttpRequest(); //Hace el request
    xhr.open('POST',url)
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send(JSON.stringify(login));
    xhr.onload = () => getXhrResponse(xhr,onSuccess,onError);
}

//-------------------------------------------------------------------------------------
//? ADOPTANTES
// !POST adoptante
//* Carga el adoptante nuevo
function loadNewAdoptante(url,newAdoptante,onSuccess,onError){
    let xhr = new XMLHttpRequest(); //Hace el request
    xhr.open('POST',url)
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send(JSON.stringify(newAdoptante));
    xhr.onload = () => getXhrResponse(xhr,onSuccess,onError);
}
//! POST login
//* Hacer login adoptante
function loadLoginAdoptante(url,login,onSuccess,onError){
    let xhr = new XMLHttpRequest(); //Hace el request
    xhr.open('POST',url)
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send(JSON.stringify(login));
    xhr.onload = () => getXhrResponse(xhr,onSuccess,onError);
}

//-------------------------------------------------------------------------------------
//Esperar y obtener la respuesta de Xhr
function getXhrResponse(xhr, onSuccess, onError) {
    if (xhr.status == 200) {
        onSuccess(xhr.responseText);
    } else {
        onError(xhr.status + ': ' + xhr.statusText);
    }
}