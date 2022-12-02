"use strict";

const adoptame = document.getElementById('correo');
const cuerpo = document.getElementById('cuerpo')
const petsUrl = 'http://localhost:3000/pet'
const rescatistaUrl = 'http://localhost:3000/rescatista/';
const postSolicitudUrl = 'http://localhost:3000/solicitud/post/solicitud'
const adoptanteUrl = 'http://localhost:3000/adoptante/'

function validateToken(){
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    if (loginUser==undefined){
        window.location.href="/AdoptAFriend/app/views/error.html";
    }else{
        loadPetDetails();
    }
}
//Cargar los detalles de una mascota
function loadPetDetails(){
    let pet = sessionStorage.getItem('petDetails');
    console.log(pet);
    loadPet(petsUrl+'/'+pet).then(petDetail =>{
        console.log(JSON.stringify(petDetail))
        writePetDetails(petDetail);
        loadRescatista(rescatistaUrl+petDetail.idRescatista).then(rescatista =>{
            writeRescatistaDetails(rescatista);
        });
    });
};
function writePetDetails(petDetail){
    //Mascota
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
    perronalidadDetalles.innerText = perronalidadDetails(petDetail.perronalidad);
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    let idPet = sessionStorage.getItem('petDetails');
    console.log("BOTON");
    loadAdoptante('http://localhost:3000/adoptante/'+loginUser.id).then(newAdoptante =>{
            if (newAdoptante.petFavorite.includes(idPet)){
                console.log("A");
                botonFavorito.innerText='Quitar favorito';
                validateToken();
            }else{
                console.log("E");
                botonFavorito.innerText='Añadir favorito';
                validateToken();
            }
    });
}

function writeRescatistaDetails(rescatista){
    //Rescatista
    let nombreRescatista = document.getElementById("nombreRescatista");
    let correoRescatista = document.getElementById("correoRescatista");
    let usuarioRescatista = document.getElementById("usuarioRescatista");
    nombreRescatista.innerText = rescatista.nombre;
    correoRescatista.innerText = rescatista.correo;
    usuarioRescatista.innerText = '@'+rescatista.usuario;
}
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

function uploadSolicitud(){
    notifyMeSave();
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    let idPet = sessionStorage.getItem('petDetails');
    let solicitud=new Object();
    solicitud.idAdoptante = loginUser.id;
    solicitud.idMascota = idPet;
    console.log(solicitud);
    loadPet(petsUrl+'/'+idPet)
        .then(pet=>{
            console.log(solicitud);
            solicitud.idRescatista = pet.idRescatista;
            console.log(solicitud);
            loadNewSolicitud(postSolicitudUrl,solicitud,solicitud=>{
                console.log(solicitud);
                
            },(err)=>{
                // notifyMeError();
                console.log(err);
            });
        })
    validateToken();
}


function editDetails(){
    window.location.href = "/AdoptAFriend/app/views/Rescatista/edicionDetallesRescatista.html";
}

function recargar(){
    window.location.href = "/AdoptAFriend/app/views/Adoptante/detallesAdoptante.html";
}
function favorito(){
    let btnFavorito = document.getElementById('favorito');
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    let idPet = sessionStorage.getItem('petDetails');
    if(btnFavorito.innerText=='Añadir favorito'){
        loadAdoptante('http://localhost:3000/adoptante/'+loginUser.id).then(newAdoptante =>{
            newAdoptante.petFavorite.push(idPet);
            updateAdoptante('http://localhost:3000/admin/adoptante/'+loginUser.id, newAdoptante, adoptante =>{
                loadPetDetails();
            },(error)=>console.log(error));
        });
    }else{
        loadAdoptante('http://localhost:3000/adoptante/'+loginUser.id).then(newAdoptante =>{
            const index = newAdoptante.petFavorite.indexOf(idPet);
            newAdoptante.petFavorite.splice(index, 1);
            updateAdoptante('http://localhost:3000/admin/adoptante/'+loginUser.id, newAdoptante, adoptante =>{
                loadPetDetails();
            },(error)=>console.log(error));
        });     
    }

}
function verAdoptables(){
    window.location.href="/AdoptAFriend/app/views/Adoptante/rescatistaVistaAdoptante.html"
}

function correo(nombreMascota,correoRescatista){
    return `    
        <form enctype="text/plain" method="post" action="mailto:${correoRescatista}?subject=Adopción%20de%20${nombreMascota}%20a%20través%20de%20Adopt%20a%20Friend">
            <button type="submit" class="btn btn-primary">Enviar correo al rescatista</button>
        </form>
    `
}
validateToken();

function adoptameF(){
    let idPet = sessionStorage.getItem('petDetails');
    let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    console.log(rescatistaUrl+loginUser.id);
  
    console.log(loginUser.id);
    loadPet(petsUrl+'/'+idPet)
        .then(pet=>{
            console.log(pet);
            loadRescatista(rescatistaUrl+pet.idRescatista)
                .then(rescatista=>{
                    
                    console.log(rescatista);
                    
                    adoptame.innerHTML = correo(pet.nombre,rescatista.correo);

                })
        })
}

function notifyMeError() {
    if (!("Notification" in window)) {
        // Check if the browser supports notifications
        alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
        // Check whether notification permissions have already been granted;
        // if so, create a notification

        const notification = new Notification('No se envió correctamente la solicitud!'); // …
    } else if (Notification.permission !== "denied") {
        // We need to ask the user for permission
        Notification.requestPermission().then((permission) => {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                const notification = new Notification("No se envió correctamente la solicitud!");
                // …
            }
        });
    }
}

function notifyMeSave() {
    console.log("AAAA");
    if (!("Notification" in window)) {
        // Check if the browser supports notifications
        alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
        // Check whether notification permissions have already been granted;
        // if so, create a notification

        const notification = new Notification('Se mando correctamente la solicitud!'); // …
    } else if (Notification.permission !== "denied") {
        // We need to ask the user for permission
        Notification.requestPermission().then((permission) => {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                const notification = new Notification("Se mando correctamente la solicitud!");
                // …
            }
        });
    }
}
adoptameF();

