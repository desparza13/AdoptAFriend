"use strict";

let noResultsContainer = document.getElementById('noResults');
let loginErrorContainer = document.getElementById('contraseñaMal')

const rescatistaUrl = 'http://localhost:3000/admin/rescatista'
const loginRescatistaUrl = 'http://localhost:3000/login/rescatista'

 //crear un nuevo adoptante
function uploadRescatista() {
  //Obtener elementos del html
  let usuario = document.getElementById('usuario').value;
  let nombre = document.getElementById('nombre').value;
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  let ciudad = document.getElementById('ciudad').value;
  let newRescatista = new Object();
  //Crear un nuevo objeto con los valores del formulario
  newRescatista.usuario = usuario;
  newRescatista.nombre = nombre;
  newRescatista.correo = email;
  newRescatista.password = password;
  newRescatista.ciudad = ciudad;
  //? Crear un nuevo rescatista en la base de datos
  loadNewRescatista(rescatistaUrl, newRescatista, rescatista => {
    //Crear objeto con la información de login
    let newLogin = new Object();
    newLogin.correo = email;
    newLogin.password = password;
    //?Se hace el login para que se genere el token para el usuario en la base de datos
    loadLoginRescatista(loginRescatistaUrl, newLogin, login => {
      //Guardar el inicio de sesión en sesion storage
      sessionStorage.setItem('loginUser', login);
      //Redirigir al home
      window.location.href = '/AdoptAFriend/app/views/Rescatista/homeRescatista.html';
    });
  }, (error) => {
    console.log(error);
    window.alert('Llena los campos faltantes');
  });
}
//*INICIO DE SESIÓN CON CORREO GUARDADO EN LA BD
function loginRescatista() {
  //Obtener valores del formulario
  let loginCorreo = document.getElementById('email').value;
  let loginPassword = document.getElementById('password').value;
  //Crear objeto con dichos valores
  let newLogin = new Object();
  newLogin.correo = loginCorreo;
  newLogin.password = loginPassword;
  //Crear el token de inicio de sesión
  loadLoginRescatista(loginRescatistaUrl, newLogin, login => {
    //Guardar el inicio de sesión en Session Storage
    sessionStorage.setItem('loginUser', login);
    //Redirigir al home
    window.location.href = '/AdoptAFriend/app/views/Rescatista/homeRescatista.html';
  }, (error) => {
    loginErrorContainer.innerHTML = loginError();
  });
}
//Si hay error al hacer Login se miestra el error
function loginError() {
  return `<a  style="color:red">Contraseña o Correo incorrectos</a>`
}
//Si hay error al hacer Registro se muestra el error
function loginErrorRegistro() {
  return `<a  style="color:red">Contraseña o Correo incorrectos</a>`
}