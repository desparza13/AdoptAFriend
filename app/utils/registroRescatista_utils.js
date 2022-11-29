"use strict";

let noResultsContainer = document.getElementById('noResults');
const rescatistaUrl = 'http://localhost:3000/admin/rescatista'
const loginRescatistaUrl = 'http://localhost:3000/login/rescatista'

function uploadRescatista(){
    let usuario = document.getElementById('usuario').value;
    let nombre = document.getElementById('nombre').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let ciudad = document.getElementById('ciudad').value;
    let newRescatista = new Object();
    newRescatista.usuario=usuario;
    newRescatista.nombre=nombre;
    newRescatista.correo=email;
    newRescatista.password=password;
    newRescatista.ciudad=ciudad;
    console.log(JSON.stringify(newRescatista))
    loadNewRescatista(rescatistaUrl,newRescatista, rescatista=>{
        console.log(rescatista);
    },(error)=>console.log(error));
}
function loginRescatista(){
    let loginCorreo = document.getElementById('email').value;
    let loginPassword = document.getElementById('password').value;
    let newLogin = new Object();
    newLogin.correo = loginCorreo;
    newLogin.password = loginPassword;
    console.log(JSON.stringify(newLogin));
    loadLoginRescatista(loginRescatistaUrl,newLogin, login=>{
        console.log(newLogin);
    },(error)=>console.log(error));
}

