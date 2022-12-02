"use strict";

let noResultsContainer = document.getElementById('noResults');
const adoptanteUrl = 'http://localhost:3000/admin/adoptante'
const loginAdoptanteUrl = 'http://localhost:3000/login/adoptante'

let newAdoptante = new Object();

function uploadAdoptante(){
    console.log("form")
    let usuario = document.getElementById('usuario').value;
    let nombre = document.getElementById('nombre').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let ciudad = document.getElementById('ciudad').value;
    newAdoptante.usuario=usuario;
    newAdoptante.nombre=nombre;
    newAdoptante.correo=email;
    newAdoptante.password=password;
    newAdoptante.ciudad=ciudad;
    console.log(newAdoptante);
    sessionStorage.setItem('newAdoptante',JSON.stringify(newAdoptante));
    window.location.href='/AdoptAFriend/app/views/Adoptante/registroMascotaIdeal.html';
}
function uploadMascotaIdeal(){
    let tipo = document.getElementById('tipo').value;
    let raza = document.getElementById('razaToAdd').value;
    let edad = document.getElementById('edad').value;
    let genero = document.getElementById('genero').value;
    let talla = document.getElementById('talla').value;
    let perronalidad = document.getElementById('perronalidad').value;
    newAdoptante=JSON.parse(sessionStorage.getItem('newAdoptante'));
    newAdoptante.tipoIdeal = tipo;
    newAdoptante.razaIdeal = raza;
    newAdoptante.edadIdeal = edad;
    newAdoptante.generoIdeal = genero;
    newAdoptante.tallaIdeal = talla;
    newAdoptante.perronalidadIdeal = perronalidad;
    console.log(JSON.stringify(newAdoptante));
    loadNewAdoptante(adoptanteUrl,newAdoptante,adoptante=>{
        console.log(JSON.stringify(newAdoptante));
    },(error)=>console.log(error));
    let newLogin = new Object();
    newLogin.correo = newAdoptante.correo;
    newLogin.password = newAdoptante.password;
    loadLoginAdoptante(loginAdoptanteUrl,newLogin, login=>{
        sessionStorage.setItem('loginUser',login);
        window.location.href='/AdoptAFriend/app/views/Adoptante/homeAdoptante.html';
    },(error)=>console.log(error));
}

let loginErrorContainer = document.getElementById('contraseñaMal');
function loginAdoptante(){
    let loginCorreo = document.getElementById('email').value;
    let loginPassword = document.getElementById('password').value;
    let newLogin = new Object();
    newLogin.correo = loginCorreo;
    newLogin.password = loginPassword;
    console.log(JSON.stringify(newLogin));
    loadLoginAdoptante(loginAdoptanteUrl,newLogin, login=>{
        console.log(login);
        sessionStorage.setItem('loginUser',login);
        window.location.href='/AdoptAFriend/app/views/Adoptante/homeAdoptante.html';
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