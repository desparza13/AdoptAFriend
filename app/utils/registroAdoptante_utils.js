"use strict";

let noResultsContainer = document.getElementById('noResults');
const adoptanteUrl = 'http://localhost:3000/admin/adoptante'
const loginAdoptanteUrl = 'http://localhost:3000/login/adoptante'

let newAdoptante = new Object();

function uploadAdoptante(){
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
}
function uploadMascotaIdeal(){
    let tipo = document.getElementById('tipo').value;
    let raza = document.getElementById('razaToAdd').value;
    let edad = document.getElementById('edad').value;
    let genero = document.getElementById('genero').value;
    let talla = document.getElementById('talla').value;
    let perronalidad = document.getElementById('perronalidad').value;
    newAdoptante.tipoIdeal = tipo;
    newAdoptante.razaIdeal = raza;
    newAdoptante.edadIdeal = edad;
    newAdoptante.generoIdeal = genero;
    newAdoptante.tallaIdeal = talla;
    newAdoptante.perronalidadIdeal = perronalidad;
    loadNewAdoptante(adoptanteUrl,newAdoptante,adoptante=>{
        console.log(JSON.stringify(newAdoptante));
    },(error)=>console.log(error));
    let newLogin = new Object();
    newLogin.correo = newAdoptante.correo;
    newLogin.password = newAdoptante.password;
    loadLoginAdoptante(loginAdoptanteUrl,newLogin, login=>{
        console.log(newLogin);
    },(error)=>console.log(error));
}
function loginAdoptante(){
    let loginCorreo = document.getElementById('email').value;
    let loginPassword = document.getElementById('password').value;
    let newLogin = new Object();
    newLogin.correo = loginCorreo;
    newLogin.password = loginPassword;
    console.log(JSON.stringify(newLogin));
    loadLoginAdoptante(loginAdoptanteUrl,newLogin, login=>{
        console.log(newLogin);
    },(error)=>console.log(error));
}

