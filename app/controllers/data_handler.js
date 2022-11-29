"use strict";
//Schemas 
const Adoptante = require('../models/adoptantes');
const Pet = require('../models/pets');
const Rescatista = require('../models/rescatistas');
const Solicitud = require('../models/solicitudAdopcion');

//login
function loginR(req, res) {
    let correo = req.body.correo;
    let password = req.body.password;

    Rescatista.findOne({ correo: `${correo}` })
        .then(rescatista => {
            console.log(rescatista);
            let token = rescatista.generateToken(password);//Se genera un token
            console.log(token)
            if (token != undefined) {//Si el token está bien
                res.status(200)
                res.set('Content-Type', 'text/plain; charset=utf-8');
                //Se actualiza en la base de datos el token
                Rescatista.findOneAndUpdate({ correo: `${correo}` }, rescatista, { new : true }).then();
                console.log(rescatista);
                res.send(token);
            } else { //Si el token está incorrecto significa que no se pudo iniciar sesión
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

function loginA(req, res) { //Este no está completo
    let correo = req.body.correo;
    let password = req.body.password;
    
    Adoptante.findOne({ correo: `${correo}` })
        .then(adoptante => {
            console.log(adoptante);
            let token = adoptante.generateToken(password);
            console.log(token)
            if (token != undefined) {
                res.status(200)
                res.set('Content-Type', 'text/plain; charset=utf-8');
                Adoptante.findOneAndUpdate({ correo: `${correo}` }, adoptante, { new : true }).then();
                console.log(adoptante);

                res.send(token);
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

//Get by usuario/nombre
function getPetByNombre(req, res) {
    let nombre = req.params.nombre;
    Pet.findOne({ nombre: `${nombre}` }).then(pet => res.status(200).json(pet));
}
function getAdoptanteByUsuario(req, res) {
    let usuario = req.params.usuario;
    Adoptante.findOne({ usuario: `${usuario}` }).then(adoptante => res.status(200).json(adoptante));
}
function getRescatistaByUsuario(req, res) {
    let usuario = req.params.usuario;
    Rescatista.findOne({ usuario: `${usuario}` }).then(rescatista => res.status(200).json(rescatista));
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
//EXPORTS

//Login
exports.loginR = loginR;
exports.loginA= loginA;

//Gets
exports.getPets = getPets;
exports.getAdoptantes = getAdoptantes;
exports.getRescatistas = getRescatistas;
//GetById
exports.getPetByNombre = getPetByNombre;
exports.getAdoptanteByUsuario = getAdoptanteByUsuario;
exports.getRescatistaByUsuario = getRescatistaByUsuario;
//Create
exports.createAdoptante = createAdoptante;
exports.createPet = createPet;
exports.createRescatista = createRescatista;
//Update
exports.updatePet = updatePet;
exports.updateAdoptante = updateAdoptante;
exports.updateRescatista = updateRescatista;
//Delete
exports.deletePet = deletePet;
exports.deleteAdoptante = deleteAdoptante;
exports.deleteRescatista = deleteRescatista;