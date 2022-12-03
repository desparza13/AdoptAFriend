"use strict";

let noResultsContainer = document.getElementById('noResults');
const rescatistaUrl = 'http://localhost:3000/admin/rescatista'
const loginRescatistaUrl = 'http://localhost:3000/login/rescatista'

// document.addEventListener("DOMContentLoaded", function() {
//   document.getElementById("formulario").addEventListener('submit', validarFormulario); 
// });

// function validarFormulario(evento) {
//   let usuario = document.getElementById('usuario').value;
//   let nombre = document.getElementById('nombre').value;
//   let email = document.getElementById('email');
//   let password = document.getElementById('password').value;
//   let ciudad = document.getElementById('ciudad').value;
//   evento.preventDefault();
//   if(usuario.length == 0) {
//     alert('Completa el campo de usuario');
//     return;
//   }
//   if (nombre.length ==0) {
//     alert('Completa el cambo de nombre');
//     return;
//   }

//   if(email.validity.typeMismatch){
//     alert('Correo incorrecto');
//   }
//   this.submit();
// }

function uploadRescatista(){
  let usuario = document.getElementById('usuario').value;
    let nombre = document.getElementById('nombre').value;
    let email = document.getElementById('email');
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
        

    },(error)=>console.log(error));
    window.location.href='/AdoptAFriend/app/views/Rescatista/homeRescatista.html';

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

function loginErrorRegistro(){
  return `<a  style="color:red">Contraseña o Correo incorrectos</a>`
}
