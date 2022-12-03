"use strict";
//Schemas 
const Adoptante = require('../models/adoptantes');
const Pet = require('../models/pets');
const Rescatista = require('../models/rescatistas');
const Solicitud = require('../models/solicitudAdopcion');

//Permite hacer el inicio de sesión de los rescatistas
function loginR(req, res) {
    //Obtener credenciales
    let correo = req.body.correo;
    let password = req.body.password;
    //Buscar un rescatista existente que tenga ese correo
    Rescatista.findOne({ correo: `${correo}` })
        .then(rescatista => {
            let token = rescatista.generateToken(password);//Se genera un token
            let loginUser = new Object();
            if (token != undefined) {//Si el token está bien
                res.status(200)
                res.set('Content-Type', 'text/plain; charset=utf-8');
                //Se actualiza en la base de datos el token
                Rescatista.findOneAndUpdate({ correo: `${correo}` }, rescatista, { new : true }).then();
                loginUser.token= token;
                loginUser.id = `${rescatista._id}`;
                res.send(loginUser);
            } else { //Si el token está incorrecto significa que no se pudo iniciar sesión
                res.status(403);            
                res.set('Content-Type', 'text/plain; charset=utf-8');
                res.send(`Wrong email or password`);a
            }
        })
        //No hay un rescatista con esa cuenta
        .catch(err => {
            res.status(403);            
            res.set('Content-Type', 'text/plain; charset=utf-8');
            res.send(`Wrong email or password`);
        });
}

//Permite hacer el inicio de sesión de los adoptantes
function loginA(req, res) { 
    //Obtener credenciales
    let correo = req.body.correo;
    let password = req.body.password;
    //Buscar un adoptante con ese correo
    Adoptante.findOne({ correo: `${correo}` })
        .then(adoptante => {
            console.log(adoptante);
            //Generar tokens
            let token = adoptante.generateToken(password);
            let loginUser = new Object();
            if (token != undefined) { //Si el token se generó correctamente
                res.status(200)
                res.set('Content-Type', 'text/plain; charset=utf-8');
                Adoptante.findOneAndUpdate({ correo: `${correo}` }, adoptante, { new : true }).then();
                console.log(adoptante);
                loginUser.token= token;
                loginUser.id = `${adoptante._id}`;
                res.send(loginUser);
            } else {
                res.status(403);            
                res.set('Content-Type', 'text/plain; charset=utf-8');
                res.send(`Wrong email or password`);
            }
        })
        //No hay un rescatista con esa cuenta
        .catch(err => {
            res.status(403);            
            res.set('Content-Type', 'text/plain; charset=utf-8');
            res.send(`Wrong email or password`);
        });
}
//Obtener todas las instancias de un esquema
//Obtener todas las mascotas
function getPets(req,res){
    Pet.find({})
        .then(pets => res.status(200).json(pets))
        .catch(err => res.status(400).send(err))
}
//Obtener todos los adoptantes
function getAdoptantes(req,res){
    Adoptante.find({})
        .then(adoptantes => res.status(200).json(adoptantes))
        .catch(err => res.status(400).send(err))
}
//Obtener todos los rescatistas
function getRescatistas(req,res){
    Rescatista.find({})
        .then(rescatistas => res.status(200).json(rescatistas))
        .catch(err => res.status(400).send(err))
}
//Obtener todas las solicitudes
function getSolicitud(req,res){
    Solicitud.find({})
        .then(solicitudes=> res.status(200).json(solicitudes))
        .catch(err=> res.status(400).send(err))
}

//Get by id
//Obtener mascota a partir del id
function getPetById(req, res) {
    let id = req.params.id;
    Pet.findOne({ _id: `${id}` })
    .then(pet => {
        if(pet!=null){ //Si la mascota con ese id existe 
            res.status(200).json(pet) //Enviar la mascota
        }
        else{ //Ninguna mascota en la BD corresponde a ese id
            res.status(400).send('No hay mascota con ese id');
        }
    })
    .catch(err=> res.status(400).send(`No hay mascota con id ${id}`))
}
//Obtener adoptante a partir del id
function getAdoptanteById(req, res) {
    let id = req.params.id;
    Adoptante.findOne({ _id: `${id}` })
    .then(adoptante => { //Si el adoptante con ese id existe
        res.status(200).json(adoptante); //Enviar el adoptante
    });
    
}
//Obtener rescatista a partir del id
function getRescatistaById(req, res) {
    let id = req.params.id;
    Rescatista.findOne({ _id: `${id}` })
    .then(rescatista => { //Si el rescatista con ese id existe
        if(rescatista!=null){
            res.status(200).json(rescatista) //Enviar el rescatista

        }else{
            res.status(400).send(`No hay rescatista con id ${id}`);
        }
    })
    .catch(err=> res.status(400).send(`No hay rescatista con id ${id}`))
}

//Create
//Crear una mascota nueva
function createPet(req,res){
    let pet= Pet(req.body);
    pet.save()
        .then((pet)=>{
            res.set('Content-Type', 'text/plain; charset=utf-8');
            res.status(201).send(`Se creo la mascota ${pet.nombre} `);
        })
        .catch(err=> res.status(400).send(err));
}
//Crear un adoptante nuevo
function createAdoptante(req,res){
    let adoptante= Adoptante(req.body);
    adoptante.save()
        .then((adoptante)=>{
            res.set('Content-Type', 'text/plain; charset=utf-8');
            res.status(201).send(`Se creo el adoptante ${adoptante.nombre} `);
        })
        .catch(err=> res.status(400).send(err));
}
//Crear un rescatista nuevo
function createRescatista(req,res){
    let rescatista= Rescatista(req.body);
    rescatista.save()
        .then((rescatista)=>{
            res.set('Content-Type', 'text/plain; charset=utf-8');
            res.status(201).send(`Se creo el rescatista ${rescatista.nombre} `);
        })
        .catch(err=> res.status(400).send(err));
}
//Crear una solicitud de adopción
function createSolicitud(req,res){
    let solicitud = Solicitud(req.body);
    solicitud.save()
        .then((solicitud)=>{
            res.set('Content-Type', 'text/plain; charset=utf-8');
            res.status(201).send(`Se creo la solicitud`);        
        });     
}

//Update
//Actualizar mascota
function updatePet(req, res) {
    let id = req.params.id;
    let updatedPet = req.body;
    //Limpiar propiedades extras
    for (let property in updatedPet) {
        if (['_id','tipo', 'raza', 'status', 'edad', 'genero', 'talla', 'nombre', 'idRescatista', 'petImg', 'ciudad', 'perronalidad'].includes(property)) continue;
        delete updatedPet[property];
    }
    //Buscar la mascota con ese id y actualizarla
    Pet.findOneAndUpdate({ _id: `${id}` }, updatedPet, { new : true }).then(pet => {
        res.type('text/plain; charset=utf-8');
        res.send(`Mascota ${pet.nombre} fue actualizada`);
    });
}
//Actualizar adoptante
function updateAdoptante(req, res) {
    let id = req.params.id;
    let newAdoptante = req.body;
    //Limpiar propiedades extra
    for (let property in newAdoptante) {
        if (['nombre','correo','usuario','ciudad','tipoIdeal','razaIdeal','edadIdeal','generoIdeal','tallaIdeal','perronalidadIdeal','petFavorite','misAdopciones','password','token'].includes(property)) continue;
        delete newAdoptante[property];
    }
    Adoptante.findOneAndUpdate({ _id: `${id}` }, newAdoptante, { new : true })
    .then(adoptante => {
        
    });
}
//Actualizar rescatista
function updateRescatista(req, res) {
    let id = req.params.id;
    let updatedRescatista = req.body;
    //Limpiar propiedades extra
    for (let property in updatedRescatista) {
        if (['_id','nombre','correo','usuario','ciudad','password','token'].includes(property)) continue;
        delete updatedRescatista[property];
    }
    //Buscar el rescatista con ese id y actualizarla
    Rescatista.findOneAndUpdate({ _id: `${id}` }, updatedRescatista, { new : true }).then(rescatista => {
        res.type('text/plain; charset=utf-8');
        res.send(`Rescatista ${rescatista.usuario} fue actualizado!`);
    });
}

//Delete
//Borrar la mascota en base al id
function deletePet(req, res) {
    let id = req.params.id;
    //Buscar la mascota por el id y eliminarla
    Pet.findOneAndDelete({ _id: `${id}` }).then(pet => {
        if(id!=undefined){
            res.type('text/plain; charset=utf-8');
            res.status(200).send(`Se eliminó la mascota ${pet.nombre}`);
        }
        //No existía la mascota con ese id
        else{
            res.type('text/plain; charset=utf-8');
            res.status(404).send( `No hay mascota con el id ${id}` );
        }
    });
}
//Borrar el adoptante en base al id
function deleteAdoptante(req, res) {
    let id = req.params.id;
    //Buscar el adoptante y eliminarlo
    Adoptante.findOneAndDelete({ _id: `${id}` }).then(adoptante => {
        if(id!=undefined){
            res.type('text/plain; charset=utf-8');
            res.status(200).send(`Se elimino el adoptante ${adoptante.usuario}`);
        }
        //No existe un adoptante con ese id
        else{
            res.type('text/plain; charset=utf-8');
            res.status(404).send( `No hay adoptante con el id ${id}` );
        }
    });
}
//Borrar el rescatista con ese id
function deleteRescatista(req, res) {
    let id = req.params.id;
    //Buscar el rescatista y eliminarlo
    Rescatista.findOneAndDelete({ id: `${id}` }).then(rescatista => {
        if(id!=undefined){
            res.type('text/plain; charset=utf-8');
            res.status(200).send(`Se elimino el rescatista ${rescatista.usuario}`);
        }
        //No hay un rescatista con ese id
        else{
            res.type('text/plain; charset=utf-8');
            res.status(404).send( `No hay rescatista con el id ${id}` );
        }
        
    });
}
//Borrar solicitud de acuerdo a su id
function deleteSolicitud(req,res){
    let idSolicitud = req.params.idSolicitud;
    //Buscar la solicitud y borrarla
    Solicitud.findOneAndDelete({ _id: `${idSolicitud}` }).then(solicitud => {
        if(idSolicitud!=undefined){
            res.type('text/plain; charset=utf-8');
            res.status(200).send(`Se elimino la mascota solicitud`);
        }
        //No hay solicitud con ese id
        else{
            res.type('text/plain; charset=utf-8');
            res.status(404).send( `No hay solicitud con el id ${idSolicitud}` );
        }
    });
    
}
//EXPORTS

//Login
exports.loginR = loginR;
exports.loginA= loginA;

//Gets
exports.getPets = getPets;
exports.getAdoptantes = getAdoptantes;
exports.getRescatistas = getRescatistas;
exports.getSolicitud = getSolicitud;
//GetById
exports.getPetById = getPetById;
exports.getAdoptanteById = getAdoptanteById;
exports.getRescatistaById = getRescatistaById;
//Create
exports.createAdoptante = createAdoptante;
exports.createPet = createPet;
exports.createRescatista = createRescatista;
exports.createSolicitud = createSolicitud;
//Update
exports.updatePet = updatePet;
exports.updateAdoptante = updateAdoptante;
exports.updateRescatista = updateRescatista;
//Delete
exports.deletePet = deletePet;
exports.deleteAdoptante = deleteAdoptante;
exports.deleteRescatista = deleteRescatista;
exports.deleteSolicitud = deleteSolicitud;