"use strict";

//ELEMENTOS CONTENEDORES O DIRECCIONES 
let noResultsContainer = document.getElementById('noResults');
let loginErrorContainer = document.getElementById('contraseñaMal');

const adoptanteUrl = 'http://localhost:3000/admin/adoptante'
const loginAdoptanteUrl = 'http://localhost:3000/login/adoptante'

let newAdoptante = new Object();

 //crear un nuevo adoptante
function uploadAdoptante(){
    //Obtener elementos del html
    let usuario = document.getElementById('usuario').value;
    let nombre = document.getElementById('nombre').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let ciudad = document.getElementById('ciudad').value;
    //Crear un nuevo objeto con los valores del formulario
    newAdoptante.usuario=usuario;
    newAdoptante.nombre=nombre;
    newAdoptante.correo=email;
    newAdoptante.password=password;
    newAdoptante.ciudad=ciudad;
    //Guardar el adoptante en sessionstorage
    sessionStorage.setItem('newAdoptante',JSON.stringify(newAdoptante));
}

//*DESPUÉS DE REGISTRAR INFORMACIÓN PERSONAL SE PREGUNTA POR LA MASCOTA IDEAL Y SE GUARDA EN LA BD
function uploadMascotaIdeal(){
    //Obtener elementos del HTML
    let tipo = document.getElementById('tipo').value;
    let raza = document.getElementById('razaToAdd').value;
    let edad = document.getElementById('edad').value;
    let genero = document.getElementById('genero').value;
    let talla = document.getElementById('talla').value;
    let perronalidad = document.getElementById('perronalidad').value;
    //Recuperar la información personal del nuevo adoptante de session storage
    newAdoptante=JSON.parse(sessionStorage.getItem('newAdoptante'));
    //Guardar los valores de la mascota ideal en el nuevo adoptante
    newAdoptante.tipoIdeal = tipo;
    newAdoptante.razaIdeal = raza;
    newAdoptante.edadIdeal = edad;
    newAdoptante.generoIdeal = genero;
    newAdoptante.tallaIdeal = talla;
    newAdoptante.perronalidadIdeal = perronalidad;
    //? Crear un nuevo adoptante en la base de datos
    loadNewAdoptante(adoptanteUrl,newAdoptante,adoptante=>{
        console.log(JSON.stringify(newAdoptante));
    },(error)=>console.log(error));
    //Crear objeto con la información de login
    let newLogin = new Object();
    newLogin.correo = newAdoptante.correo;
    newLogin.password = newAdoptante.password;
    //?Se hace el login para que se genere el token para el usuario en la base de datos
    loadLoginAdoptante(loginAdoptanteUrl,newLogin, login=>{
        //Guardar el inicio de sesión en sesion storage
        sessionStorage.setItem('loginUser',login);
        //Redirigir al home
        window.location.href='/AdoptAFriend/app/views/Adoptante/homeAdoptante.html';
    },(error)=>console.log(error));
}
//*INICIO DE SESIÓN CON CORREO GUARDADO EN LA BD
function loginAdoptante(){
    //Obtener valores del formulario
    let loginCorreo = document.getElementById('email').value;
    let loginPassword = document.getElementById('password').value;
    //Crear objeto con dichos valores
    let newLogin = new Object();
    newLogin.correo = loginCorreo;
    newLogin.password = loginPassword;
    //Crear el token de inicio de sesión
    loadLoginAdoptante(loginAdoptanteUrl,newLogin, login=>{
        //Guardar el inicio de sesión en Session Storage
        sessionStorage.setItem('loginUser',login);
        //Redirigir al home
        window.location.href='/AdoptAFriend/app/views/Adoptante/homeAdoptante.html';
    },(error)=>{
        loginErrorContainer.innerHTML=loginError(); //Mostrar error
        });
}
//* SI HAY ERROR AL HACER LOGIN SE MUESTRA EL MENSAJE DE ERROR
function loginError(){
    return `<a  style="color:red">Contraseña o Correo incorrectos</a>`
}
