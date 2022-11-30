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
            console.log(rescatista);
            let token = rescatista.generateToken(password);//Se genera un token
            console.log(token)
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
            console.log(token)
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
        .catch(err => {
            res.status(403);            
            res.set('Content-Type', 'text/plain; charset=utf-8');
            res.send(`Wrong email or password`);
        });
}
//Get array
function getPets(req,res){
    Pet.find({})
        .then(pets => res.status(200).json(pets))
        .catch(err => res.status(400).send(err))
}
function getAdoptantes(req,res){
    Adoptante.find({})
        .then(adoptantes => res.status(200).json(adoptantes))
        .catch(err => res.status(400).send(err))
}
function getRescatistas(req,res){
    Rescatista.find({})
        .then(rescatistas => res.status(200).json(rescatistas))
        .catch(err => res.status(400).send(err))
}
function getSolicitud(req,res){
    Solicitud.find({})
        .then(solicitudes=> res.status(200).json(solicitudes))
        .catch(err=> res.status(400).send(err))
}

//Get by id
function getPetById(req, res) {
    let id = req.params.id;
    Pet.findOne({ _id: `${id}` })
    .then(pet => {
        if(pet!=null){
            res.status(200).json(pet)

        }
        else{
            res.status(400).send('No hay mascota con ese id');
        }
    })
    .catch(err=> res.status(400).send(`No hay mascota con id ${id}`))
}
function getAdoptanteById(req, res) {
    let id = req.params.id;
    Adoptante.findOne({ _id: `${id}` })
    .then(adoptante => {
        if(adoptante!=null){
            res.status(200).json(adoptante)

        }
        else{
            res.status(400).send(`No hay adoptante con id ${id}`);
        }
    })
    .catch(err=> res.status(400).send(`No hay adoptante con id ${id}`))
}
function getRescatistaById(req, res) {
    let id = req.params.id;
    Rescatista.findOne({ _id: `${id}` })
    .then(rescatista => {
        if(rescatista!=null){
            res.status(200).json(rescatista)

        }
        else{
            res.status(400).send(`No hay rescatista con id ${id}`);
        }
    })
    .catch(err=> res.status(400).send(`No hay rescatista con id ${id}`))
}

//Create
function createPet(req,res){
    let pet= Pet(req.body);
    pet.save()
        .then((pet)=>{
            res.set('Content-Type', 'text/plain; charset=utf-8');
            res.status(201).send(`Se creo la mascota ${pet.nombre} `);
        })
        .catch(err=> res.status(400).send(err));
}
function createAdoptante(req,res){
    let adoptante= Adoptante(req.body);
    adoptante.save()
        .then((adoptante)=>{
            res.set('Content-Type', 'text/plain; charset=utf-8');
            res.status(201).send(`Se creo el adoptante ${adoptante.nombre} `);
        })
        .catch(err=> res.status(400).send(err));
}
function createRescatista(req,res){
    let rescatista= Rescatista(req.body);
    rescatista.save()
        .then((rescatista)=>{
            res.set('Content-Type', 'text/plain; charset=utf-8');
            res.status(201).send(`Se creo el rescatista ${rescatista.nombre} `);
        })
        .catch(err=> res.status(400).send(err));
}
function createSolicitud(req,res){
    let solicitud = Solicitud(req.body);
    solicitud.save()
        .then((solicitud)=>{
            console.log(solicitud._id);
            res.set('Content-Type', 'text/plain; charset=utf-8');
            res.status(201).send(`Se creo la solicitud de ${solicitud.nombreMascota}`);
        })
        .catch(err=> res.status(400).send(err));

}
//Update
function updatePet(req, res) {
    let nombre = req.params.nombre;
    let updatedPet = req.body;
    for (let property in updatedPet) {
        if (['tipo', 'raza', 'status', 'edad', 'genero', 'talla', 'nombre', 'idRescatista', 'petImg', 'ciudad', 'perronalidad'].includes(property)) continue;
        delete updatedPet[property];
    }
    Pet.findOneAndUpdate({ nombre: `${nombre}` }, updatedPet, { new : true }).then(pet => {
        res.type('text/plain; charset=utf-8');
        res.send(`Mascota ${pet.nombre} fue actualizada`);
    });
}
function updateAdoptante(req, res) {
    let usuario = req.params.usuario;
    let updatedAdoptante = req.body;
    for (let property in updatedAdoptante) {
        if (['nombre','correo','usuario','ciudad'].includes(property)) continue;
        delete updatedAdoptante[property];
    }
    Adoptante.findOneAndUpdate({ usuario: `${usuario}` }, updatedAdoptante, { new : true }).then(adoptante => {
        res.type('text/plain; charset=utf-8');
        res.send(`Adoptante ${adoptante.usuario} fue actualizado!`);
    });
}
function updateRescatista(req, res) {
    let usuario = req.params.usuario;
    let updatedRescatista = req.body;
    for (let property in updatedRescatista) {
        if (['nombre','correo','usuario','ciudad'].includes(property)) continue;
        delete updatedRescatista[property];
    }
    Rescatista.findOneAndUpdate({ usuario: `${usuario}` }, updatedRescatista, { new : true }).then(rescatista => {
        res.type('text/plain; charset=utf-8');
        res.send(`Rescatista ${rescatista.usuario} fue actualizado!`);
    });
}

//Delete
function deletePet(req, res) {
    let nombre = req.params.nombre;
    Pet.findOneAndDelete({ nombre: `${nombre}` }).then(pet => {
        res.type('text/plain; charset=utf-8');
        res.send(nombre != undefined ? `Mascota ${pet.nombre} fue eliminado` : `No hay mascota con el nombre ${nombre} que eliminar`);
    });
}
function deleteAdoptante(req, res) {
    let usuario = req.params.usuario;
    Adoptante.findOneAndDelete({ usuario: `${usuario}` }).then(adoptante => {
        res.type('text/plain; charset=utf-8');
        res.send(usuario != undefined ? `Adoptante ${adoptante.usuario} fue eliminado` : `No hay adoptante con el usuario ${usuario} que eliminar`);
    });
}
function deleteRescatista(req, res) {
    let usuario = req.params.usuario;
    Rescatista.findOneAndDelete({ usuario: `${usuario}` }).then(rescatista => {
        res.type('text/plain; charset=utf-8');
        res.send(usuario != undefined ? `Rescatista ${rescatista.usuario} fue eliminado` : `No hay rescatista con el usuario ${usuario} que eliminar`);
    });
}
function deleteSolicitud(req,res){
    let usuarioA = req.params.usuarioA;
    let nombrePet = req.params.nombrePet;
    
    console.log(usuarioA);
    console.log(nombrePet);
    Solicitud.findOne({usuarioAdoptante: `${usuarioA}`},{nombreMascota: `${nombrePet}`})
        .then(solicitud=>{
            console.log(solicitud);
            Solicitud.findOneAndDelete({_id : `${solicitud._id}`}).then(solicitud=>{
                res.type('text/plain; charset=utf-8');
                res.send(solicitud._id != undefined ? `La solicitud de ${nombrePet} fue eliminada` : `No hay solicitud `);
            })
        })
    
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