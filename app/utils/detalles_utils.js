"use strict";

const adoptame = document.getElementById('correo');
const cuerpo = document.getElementById('cuerpo')
const petsUrl = 'http://localhost:3000/pet'
const rescatistaUrl = 'http://localhost:3000/rescatista/';
const postSolicitudUrl = 'http://localhost:3000/solicitud/post/solicitud'
const adoptanteUrl = 'http://localhost:3000/adoptante/'

//Validar que el usuario haya iniciado sesión y tenga un token válido
function validateToken(){
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser')); //Ver si hay usuario en sessionStorage
    if (loginUser==undefined){ //Si no hay token mandar a página de error
        window.location.href="/AdoptAFriend/app/views/error.html";
    }else{ //Si hay inicio de sesión válido
        loadPetDetails(); //Cargar datos e información en la página
    }
}
//Cargar los detalles de una mascota
function loadPetDetails(){
    let pet = sessionStorage.getItem('petDetails'); //Obtener el id de que mascota mostrar
    loadPet(petsUrl+'/'+pet).then(petDetail =>{ //Obtener la información de la mascota
        writePetDetails(petDetail); //Escribir la información en el HTML
        //Obtener información del rescatista de esa mascota
        loadRescatista(rescatistaUrl+petDetail.idRescatista).then(rescatista =>{
            writeRescatistaDetails(rescatista); //Mostrar su información en el HTML
        });
    });
};
//Obtener la información de la mascota
function writePetDetails(petDetail){
    //Obtener elementos del documento
    let nombreDetalles = document.getElementById("nombreDetalles");
    let imgDetalles = document.getElementById("imgDetalles");
    let nombreMascota = document.getElementById("nombreMascota");
    let tipoDetalles = document.getElementById("tipoDetalles");
    let razaDetalles = document.getElementById("razaDetalles");
    let generoDetalles = document.getElementById("generoDetalles");
    let edadDetalles = document.getElementById("edadDetalles");
    let tallaDetalles = document.getElementById("tallaDetalles");
    let ciudadDetalles = document.getElementById("ciudadDetalles");
    let perronalidad = document.getElementById("perronalidad");
    let perronalidadDetalles = document.getElementById("perronalidadDetalles");
    let botonFavorito = document.getElementById('favorito');
    //Poner la información de la mascota en el HTML
    nombreDetalles.innerText = petDetail.nombre;
    imgDetalles.src = petDetail.petImg;
    nombreMascota.innerText = petDetail.nombre;
    tipoDetalles.innerText = petDetail.tipo;
    razaDetalles.innerText = petDetail.raza;
    generoDetalles.innerText = petDetail.genero;
    edadDetalles.innerText = petDetail.edad;
    tallaDetalles.innerText = petDetail.talla;
    ciudadDetalles.innerText = petDetail.ciudad;
    perronalidad.innerText = petDetail.perronalidad;
    //Poner los detalles de la perronalidad
    perronalidadDetalles.innerText = perronalidadDetails(petDetail.perronalidad);
    //Obtener el adoptante
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    let idPet = sessionStorage.getItem('petDetails');
    //Revisar si la mascota ya está en los favoritos del adoptante o no
    loadAdoptante('http://localhost:3000/adoptante/'+loginUser.id).then(newAdoptante =>{
            //Si ya está en los favoritos del adoptante, mostrar Quitar favoritos en el botón
            if (newAdoptante.petFavorite.includes(idPet)){
                botonFavorito.innerText='Quitar favorito';
                validateToken();
            }else{ //Si no está en los favoritos del adoptante, mostrar Añadir favorito en el botón
                botonFavorito.innerText='Añadir favorito';
                validateToken();
            }
    });
}
//Poner los datos del rescatista en el HTML
function writeRescatistaDetails(rescatista){
    //Obtener los elementos del HTML
    let nombreRescatista = document.getElementById("nombreRescatista");
    let correoRescatista = document.getElementById("correoRescatista");
    let usuarioRescatista = document.getElementById("usuarioRescatista");
    //Cargar la información en el HTML
    nombreRescatista.innerText = rescatista.nombre;
    correoRescatista.innerText = rescatista.correo;
    usuarioRescatista.innerText = '@'+rescatista.usuario;
}
//Mostrar una descripción de la perronalidad de la mascota
function perronalidadDetails(perronalidad){
    if(perronalidad=='Fiestero'){
        return 'Pienso que todo es divertido, interesante y hecho para jugar, especialmente tú. Todo lo que hagas, yo también lo querré hacer. Con mi propia clase de sorpresas, vivir conmigo te mantendrá constantemente de pie. Diversión garantizada.';
    }else if(perronalidad=='Independiente'){
        return 'Inteligente, independiente, ingenioso y de confianza, prefiero tomar mis propias decisiones pero te escucharé si tienes buenos argumentos. Somos compañeros en esta aventura. Trátame como tal y ambos viviremos felices para siempre.';
    }else if(perronalidad=='Dinámico'){
        return '¿Quieres hacer más ejercicio? Acción es mi segundo nombre. Mi estilo de vida te mantendrá motivado a salir de la casa y moverte. Mi lema es “VAMOS!”. Tengo toneladas de energía, y tal como el sol, estoy quemando calorías y trabajando 24 horas al día, los 7 días de la semana. Correré kilómetros, perseguiré la pelota durante horas y, aún así, querré jugar al final del día.';
    }else if(perronalidad=='Tímido'){
        return 'Perro tímido y encantador busca dueño paciente con un estilo de vida relajado. Busco alguien que me ayude a salir de mi cascarón de manera gentil. Trátame de manera dulce y amable, y yo me desarrollaré bien.';
    }else if(perronalidad=='Juguetón'){
        return 'Soy un perro naturalmente juguetón, curioso y de confianza. Llévame a una caminata larga todos los días, dame algo que hacer. Después de que mi trabajo está hecho, me acurrucaré contigo frente al fuego en las tardes.';
    }else if(perronalidad=='Faldero'){
        return '¿Buscas una relación emocionalmente segura, mutuamente satisfactoria y de poco mantenimiento? Yo soy lo que necesitas. Permíteme sentarme a tus pies, caminar a tu lado, y siempre seré tu devoto compañero.';
    }else if(perronalidad=='Tapete'){
        return '¿Te gusta la vida fácil? Entonces yo soy el compañero ideal para ti. Soy de esos perros relajados y despreocupados, que disfruta de largas siestas, ver películas, acurrucarse en el regazo, y caminar distancias muy cortas del sofá al envase de comida y viceversa.';
    }else if(perronalidad=='Inteligente'){
        return 'Yo tengo todo lo que buscas: soy inteligente y peludo, tengo 4 patas, amo aprender y vivo para complacer. Adelante, enséñame lo que quieras. Sentarse, quedarse quieto, balancear tu chequera, yo puedo hacerlo todo. Mantenme entretenido y seré tuyo para siempre.';
    }else if(perronalidad=='Divertido'){
        return 'Soy de esos perros divertidos y amorosos, que están felices todo el tiempo y ven el vaso medio lleno. Busco alguien que ame reír y jugar. Debe tener un gran sentido del humor y algo de tiempo para compartir conmigo. Mi misión es complacerte.';
    }
}
//Subir a la base de datos la solicitud de adopción
function uploadSolicitud(){
    notifyMeSave(); //Enviar notificación
    //obtener información necesaria para crear la solicitud desde Session Storage
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    let idPet = sessionStorage.getItem('petDetails');
    //Crear nueva solicitud con su información
    let solicitud=new Object();
    solicitud.idAdoptante = loginUser.id;
    solicitud.idMascota = idPet;
    //Obtener detalles de la mascota
    loadPet(petsUrl+'/'+idPet)
        .then(pet=>{
            solicitud.idRescatista = pet.idRescatista;
            //Subir solicitud
            loadNewSolicitud(postSolicitudUrl,solicitud,solicitud=>{
                console.log(solicitud);
            },(err)=>{
                // notifyMeError();
                console.log(err);
            });
        })
    //Recargar página
    validateToken();
}

//Enviar a la página de editar los detalles de la mascota
function editDetails(){
    window.location.href = "/AdoptAFriend/app/views/Rescatista/edicionDetallesRescatista.html";
}
//Añadir a favoritos
function favorito(){
    //Obtener botón
    let btnFavorito = document.getElementById('favorito');
    //Obtener información del adoptante y la mascota
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    let idPet = sessionStorage.getItem('petDetails');
    if(btnFavorito.innerText=='Añadir favorito'){ //Si se presiona para añadir
        //Obtener detalles del adoptante
        loadAdoptante('http://localhost:3000/adoptante/'+loginUser.id).then(newAdoptante =>{
            newAdoptante.petFavorite.push(idPet); //Añadir a la lista de favoritos
            //Actualizar el adoptante para guardar los detalles
            updateAdoptante('http://localhost:3000/admin/adoptante/'+loginUser.id, newAdoptante, adoptante =>{
                loadPetDetails();
            },(error)=>console.log(error));
        });
    }else{ //Si se presiona para eliminar
        //Obtener detalles del adoptante
        loadAdoptante('http://localhost:3000/adoptante/'+loginUser.id).then(newAdoptante =>{
            //Ver en que posición está la mascota en la lista de favoritos y eliminarlo
            const index = newAdoptante.petFavorite.indexOf(idPet);
            newAdoptante.petFavorite.splice(index, 1);
            //Actualizar el adoptante para guardar los cmabios
            updateAdoptante('http://localhost:3000/admin/adoptante/'+loginUser.id, newAdoptante, adoptante =>{
                loadPetDetails();
            },(error)=>console.log(error));
        });     
    }
}
function verAdoptables(){
    window.location.href="/AdoptAFriend/app/views/Adoptante/rescatistaVistaAdoptante.html"
}
//Crear correo con la información de la mascota y el rescatista precargado
function correo(nombreMascota,correoRescatista){
    return `    
        <form enctype="text/plain" method="post" action="mailto:${correoRescatista}?subject=Adopción%20de%20${nombreMascota}%20a%20través%20de%20Adopt%20a%20Friend">
            <button type="submit" class="btn btn-primary">Enviar correo al rescatista</button>
        </form>
    `
}
validateToken();
//Enviar correo al presionar Adoptame
function adoptameF(){
    let idPet = sessionStorage.getItem('petDetails');
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    //Cargar mascota
    loadPet(petsUrl+'/'+idPet)
        .then(pet=>{
            console.log(pet);
            loadRescatista(rescatistaUrl+pet.idRescatista)
                .then(rescatista=>{
                    adoptame.innerHTML = correo(pet.nombre,rescatista.correo);
                })
        })
}
//Enviar notificación de error
function notifyMeError() {
    if (!("Notification" in window)) {
        //Si el navegador permite notificaciones
        alert("El navegador no permite notificaciones");
    } else if (Notification.permission === "granted") {
        // Si hay permiso de notificaciones
        const notification = new Notification('No se envió correctamente la solicitud!'); // …
    } else if (Notification.permission !== "denied") { //Si no hay permiso de notificaciones
        //Pedir permiso
        Notification.requestPermission().then((permission) => {
            // si acepta crear notificaciones
            if (permission === "granted") {
                const notification = new Notification("No se envió correctamente la solicitud!");
            }
        });
    }
}
//Enviar notificación de éxito
function notifyMeSave() {
    if (!("Notification" in window)) {
        //Si el navegador permite notificaciones
        alert("El navegador no permite notificaciones");
    } else if (Notification.permission === "granted") {
        // Si hay permiso de notificaciones 
        const notification = new Notification('Se mando correctamente la solicitud!'); // …
    } else if (Notification.permission !== "denied") { //Si no hay permiso de notificaciones
        //Pedir permiso
        Notification.requestPermission().then((permission) => {
            // si acepta crear notificaciones
            if (permission === "granted") {
                const notification = new Notification("Se mando correctamente la solicitud!");
            }
        });
    }
}
adoptameF();

