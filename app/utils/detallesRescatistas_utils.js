"use strict";

const petsUrl = 'http://localhost:3000/pet'
const rescatistaUrl = 'http://localhost:3000/rescatista/';
const postSolicitudUrl = 'http://localhost:3000/solicitud/post/solicitud'

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
        return 'Pienso que todo es divertido, interesante y hecho para jugar, especialmente t??. Todo lo que hagas, yo tambi??n lo querr?? hacer. Con mi propia clase de sorpresas, vivir conmigo te mantendr?? constantemente de pie. Diversi??n garantizada.';
    }else if(perronalidad=='Independiente'){
        return 'Inteligente, independiente, ingenioso y de confianza, prefiero tomar mis propias decisiones pero te escuchar?? si tienes buenos argumentos. Somos compa??eros en esta aventura. Tr??tame como tal y ambos viviremos felices para siempre.';
    }else if(perronalidad=='Din??mico'){
        return '??Quieres hacer m??s ejercicio? Acci??n es mi segundo nombre. Mi estilo de vida te mantendr?? motivado a salir de la casa y moverte. Mi lema es ???VAMOS!???. Tengo toneladas de energ??a, y tal como el sol, estoy quemando calor??as y trabajando 24 horas al d??a, los 7 d??as de la semana. Correr?? kil??metros, perseguir?? la pelota durante horas y, a??n as??, querr?? jugar al final del d??a.';
    }else if(perronalidad=='T??mido'){
        return 'Perro t??mido y encantador busca due??o paciente con un estilo de vida relajado. Busco alguien que me ayude a salir de mi cascar??n de manera gentil. Tr??tame de manera dulce y amable, y yo me desarrollar?? bien.';
    }else if(perronalidad=='Juguet??n'){
        return 'Soy un perro naturalmente juguet??n, curioso y de confianza. Ll??vame a una caminata larga todos los d??as, dame algo que hacer. Despu??s de que mi trabajo est?? hecho, me acurrucar?? contigo frente al fuego en las tardes.';
    }else if(perronalidad=='Faldero'){
        return '??Buscas una relaci??n emocionalmente segura, mutuamente satisfactoria y de poco mantenimiento? Yo soy lo que necesitas. Perm??teme sentarme a tus pies, caminar a tu lado, y siempre ser?? tu devoto compa??ero.';
    }else if(perronalidad=='Tapete'){
        return '??Te gusta la vida f??cil? Entonces yo soy el compa??ero ideal para ti. Soy de esos perros relajados y despreocupados, que disfruta de largas siestas, ver pel??culas, acurrucarse en el regazo, y caminar distancias muy cortas del sof?? al envase de comida y viceversa.';
    }else if(perronalidad=='Inteligente'){
        return 'Yo tengo todo lo que buscas: soy inteligente y peludo, tengo 4 patas, amo aprender y vivo para complacer. Adelante, ens????ame lo que quieras. Sentarse, quedarse quieto, balancear tu chequera, yo puedo hacerlo todo. Mantenme entretenido y ser?? tuyo para siempre.';
    }else if(perronalidad=='Divertido'){
        return 'Soy de esos perros divertidos y amorosos, que est??n felices todo el tiempo y ven el vaso medio lleno. Busco alguien que ame re??r y jugar. Debe tener un gran sentido del humor y algo de tiempo para compartir conmigo. Mi misi??n es complacerte.';
    }
}

function uploadSolicitud(){
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
            },(error)=>console.log(error))
        })
}

function editDetails(){
    window.location.href = "/AdoptAFriend/app/views/Rescatista/edicionDetallesRescatista.html";
}
validateToken();