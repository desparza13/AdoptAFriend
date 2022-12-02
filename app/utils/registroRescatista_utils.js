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
    console.log(JSON.stringify(newRescatista));
    loadNewRescatista(rescatistaUrl,newRescatista, rescatista=>{
        console.log(JSON.stringify(newRescatista));
    },(error)=>console.log(error));
    let newLogin = new Object();
    newLogin.correo = email;
    newLogin.password = password;
    console.log(JSON.stringify(newLogin));
    loadLoginRescatista(loginRescatistaUrl,newLogin, login=>{
        sessionStorage.setItem('loginUser',login);
        window.location.href='/AdoptAFriend/app/views/Rescatista/homeRescatista.html';
    },(error)=>console.log(error));
}

let loginErrorContainer = document.getElementById('contraseñaMal')

function loginRescatista(){
    let loginCorreo = document.getElementById('email').value;
    let loginPassword = document.getElementById('password').value;
    let newLogin = new Object();
    newLogin.correo = loginCorreo;
    newLogin.password = loginPassword;
    console.log(JSON.stringify(newLogin));
    loadLoginRescatista(loginRescatistaUrl,newLogin, login=>{
        console.log(login);
        sessionStorage.setItem('loginUser',login);
        window.location.href='/AdoptAFriend/app/views/Rescatista/homeRescatista.html';
        console.log(newLogin);
    },(error)=>{
        loginErrorContainer.innerHTML=loginError();
        notifyMe();
    });
}

function loginError(){
    return `<a  style="color:red">Contraseña o Correo incorrectos</a>`
}
function notifyMe() {
    if (!("Notification" in window)) {
      // Check if the browser supports notifications
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      // Check whether notification permissions have already been granted;
      // if so, create a notification
      const notification = new Notification("Contraseña o Correo incorrectos");
      // …
    } else if (Notification.permission !== "denied") {
      // We need to ask the user for permission
      Notification.requestPermission().then((permission) => {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          const notification = new Notification("Contraseña o Correo incorrectos");
          // …
        }
      });
    }}