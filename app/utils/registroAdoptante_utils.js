"use strict";

//ELEMENTOS CONTENEDORES O DIRECCIONES 
let noResultsContainer = document.getElementById('noResults');
let loginErrorContainer = document.getElementById('contraseñaMal');

const adoptanteUrl = 'http://localhost:3000/admin/adoptante'
const loginAdoptanteUrl = 'http://localhost:3000/login/adoptante'

let newAdoptante = new Object();


 //* GUARDA EN SESSION STORAGE LA INFORMACIÓN DE REGISTRO DEL ADOPTANTE
 
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
}

//*DESPUÉS DE REGISTRAR INFORMACIÓN PERSONAL SE PREGUNTA POR LA MASCOTA IDEAL Y SE GUARDA EN LA BD
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

    //? Crear un nuevo adoptante 
    loadNewAdoptante(adoptanteUrl,newAdoptante,adoptante=>{
        console.log(JSON.stringify(newAdoptante));
    },(error)=>console.log(error));
    let newLogin = new Object();
    newLogin.correo = newAdoptante.correo;
    newLogin.password = newAdoptante.password;

    //?Se hace el login para que se genere el token para el usuario
    loadLoginAdoptante(loginAdoptanteUrl,newLogin, login=>{
        sessionStorage.setItem('loginUser',login);
        window.location.href='/AdoptAFriend/app/views/Adoptante/homeAdoptante.html';
    },(error)=>console.log(error));
}

//*INICIO DE SESIÓN CON CORREO GUARDADO EN LA BD
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
        });
}

//* SI HAY ERROR AL HACER LOGIN SE MUESTRA EL MENSAJE DE ERROR
function loginError(){
    return `<a  style="color:red">Contraseña o Correo incorrectos</a>`
}
