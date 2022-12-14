"use strict";
//?MASCOTAS
//! GET mascotas
//* Carga todas las mascotas
async function loadPets(url){
    let response = await fetch(url);
    if(response.status != 200) return [];
    return await response.json();
}
//! GET mascota nombre
//* Carga una mascota en específico en base al id
async function loadPet(url){
    let response = await fetch(url);
    if(response.status != 200) return [];
    return await response.json();
}
//! POST mascota
//* Crea la mascota nueva
function loadNewPet(url,newPet,onSuccess,onError){
    let xhr = new XMLHttpRequest(); //Hace el request
    xhr.open('POST',url);
    xhr.setRequestHeader('Content-Type','application/json');
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    console.log(loginUser);
    console.log(loginUser.token);
    xhr.setRequestHeader('x-auth',loginUser.token);
    xhr.send(JSON.stringify(newPet));
    xhr.onload = () => getXhrResponse(xhr,onSuccess,onError);
}

//!PUT mascota
//* Actualizar mascota en base al id
function updatePet(url,newPet,onSuccess,onError){
    let xhr = new XMLHttpRequest(); //Hace el request
    xhr.open('PUT',url)
    xhr.setRequestHeader('Content-Type','application/json');
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    console.log(loginUser);
    console.log(loginUser.token);
    xhr.setRequestHeader('x-auth',loginUser.token);
    xhr.send(JSON.stringify(newPet));
    xhr.onload = () => getXhrResponse(xhr,onSuccess,onError);
}
//! DELETE mascota
//* Elimina una mascota de acuerdo a su id
async function borrarPet(url){
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    console.log(loginUser);
    console.log(loginUser.token);
    let response = await fetch(url,{
        method:'DELETE',
        headers:{
            'x-auth':loginUser.token
        }
    })
    //if(response.status != 200) return [];
    //return await response.json();
}
//-------------------------------------------------------------------------------------
//? RESCATISTAS
//! GET rescatista/:id
//* Obtener perfil rescatista especifico según el id
async function loadRescatista(url){
    let response = await fetch(url);
    if(response.status != 200) return [];
    return await response.json();
}
//! POST rescatista
//* Crea el rescatista nuevo
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
//? SOLICITUDES
//! GET solicitudes
//* Carga todas las solicitudes 
async function loadSolicitudes(url){
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    console.log(loginUser);
    console.log(loginUser.token);
    let response = await fetch(url,{
        method:'GET',
        headers:{
            'x-auth':loginUser.token
        }
    })
    if(response.status != 200) return [];
    return await response.json();
}

//! POST solicitudes
//* Crea nueva solicitud de adopción
function loadNewSolicitud(url,login,onSuccess,onError){
    let xhr = new XMLHttpRequest(); //Hace el request
    xhr.open('POST',url)
    xhr.setRequestHeader('Content-Type','application/json');
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    console.log(loginUser);
    console.log(loginUser.token);
    xhr.setRequestHeader('x-auth',loginUser.token);
    xhr.send(JSON.stringify(login));
    xhr.onload = () => getXhrResponse(xhr,onSuccess,onError);
}

//! DELETE solicitudes
//* Elimina nueva solicitud de adopción
async function borrarSolicitud(url){
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    console.log(loginUser);
    console.log(loginUser.token);
    let response = await fetch(url,{
        method:'DELETE',
        headers:{
            'x-auth':loginUser.token
        }
    })
}
// !PUT rescatista
//* Actualizar el rescatista 
function updateRescatista(url,newRescatista,onSuccess,onError){
    let xhr = new XMLHttpRequest(); //Hace el request
    xhr.open('PUT',url)
    xhr.setRequestHeader('Content-Type','application/json');
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    console.log(loginUser);
    console.log(loginUser.token);
    xhr.setRequestHeader('x-auth',loginUser.token);
    xhr.send(JSON.stringify(newRescatista));
    xhr.onload = () => getXhrResponse(xhr,onSuccess,onError);
}

//-------------------------------------------------------------------------------------
//? ADOPTANTES
//! GET adoptante/:id
//* Obtener perfil adoptante especifico
async function loadAdoptante(url){
    let response = await fetch(url);
    if(response.status != 200) return [];
    return await response.json();
}
// !POST adoptante
//* Crea el adoptante nuevo
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
// !PUT adoptante
//* Actualizar el adoptante 
function updateAdoptante(url,newAdoptante,onSuccess,onError){
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    console.log(loginUser);
    console.log(loginUser.token);
    let xhr = new XMLHttpRequest(); //Hace el request
    xhr.open('PUT',url)
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.setRequestHeader('x-auth',loginUser.token);
    xhr.send(JSON.stringify(newAdoptante));
    xhr.onload = () => getXhrResponse(xhr,onSuccess,onError);
}
//-------------------------------------------------------------------------------------
//Esperar y obtener la respuesta de Xhr
function getXhrResponse(xhr, onSuccess, onError) {
    if (xhr.status == 200 || xhr.status==201) {
        onSuccess(xhr.responseText);
    } else {
        onError(xhr.status + ': ' + xhr.statusText);
    }
}