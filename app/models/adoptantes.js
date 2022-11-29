"use strict";

//Importar librerias
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


let mongoDB = 'mongodb+srv://Jenn:Jenn_123@adoptafriend.sszez2p.mongodb.net/AdoptAFriend';

let options = {useNewUrlParser: true, useUnifiedTopology: true};

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


let Adoptante = mongoose.model('adoptante',adoptanteSchema);

module.exports = Adoptante;