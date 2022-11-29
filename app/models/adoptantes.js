"use strict";

//Importar librerias
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


let mongoDB = 'mongodb+srv://Jenn:Jenn_123@adoptafriend.sszez2p.mongodb.net/AdoptAFriend';

let options = {useNewUrlParser: true, useUnifiedTopology: true};
let privateKey = process.env.TOKEN_KEY_A;
mongoose.connect(mongoDB,options);

let adoptanteSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    correo:{
        type: String,
        required: true
    },
    usuario:{
        type: String,
        required: true
    },
    ciudad:{
        type: String,
        required: true
    },
    petFavorite: [String],
    misAdopciones: [String],
    password:{
        type: String,
        required: true
    },
    token: String
    
})

//Propiedad que genera "trigger"
adoptanteSchema.pre('save', function(next) {//antes de que se haga un save se encripta la contraseña
    let adoptante = this;
    adoptante.password = bcrypt.hashSync(adoptante.password, 10);
    next();
})

//Generar token 
adoptanteSchema.methods.generateToken = function(password) {
    let adoptante = this;
    let payload = {_id: adoptante._id, correo: adoptante.correo};
    // let options = { expiresIn: 60 * 60 }
    if (bcrypt.compareSync(password, adoptante.password)) { //verificar que la contraseña este bien
        try {
            // generar token
            adoptante.token = jwt.sign(payload, privateKey); //Se actualiza el token del rescatista
            return adoptante.token;
        } catch (err) {
            console.log(err);
        }
    }
}
let Adoptante = mongoose.model('adoptante',adoptanteSchema);

module.exports = Adoptante;