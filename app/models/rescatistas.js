"use strict";

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let mongoDB = 'mongodb+srv://Jenn:Jenn_123@adoptafriend.sszez2p.mongodb.net/AdoptAFriend';
let options = {useNewUrlParser: true, useUnifiedTopology: true};
let privateKey = process.env.TOKEN_KEY_R;

mongoose.connect(mongoDB,options);

let rescatistaSchema = mongoose.Schema({
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
    password:{
        type: String,
        required: true
    },
    token:String
})

//Propiedad que genera "trigger"
rescatistaSchema.pre('save', function(next) {//antes de que se haga un save se encripta la contraseña
    let rescatista = this;
    rescatista.password = bcrypt.hashSync(rescatista.password, 10);
    next();
})

//Generar token 
rescatistaSchema.methods.generateToken = function(password) {
    let rescatista = this;
    let payload = {_id: rescatista._id, correo: rescatista.correo};
    // let options = { expiresIn: 60 * 60 }
    if (bcrypt.compareSync(password, rescatista.password)) { //verificar que la contraseña este bien
        try {
            // generar token
            rescatista.token = jwt.sign(payload, privateKey); //Se actualiza el token del rescatista
            return rescatista.token;
        } catch (err) {
            console.log(err);
        }
    }
}
let Rescatista = mongoose.model('rescatista',rescatistaSchema);

module.exports = Rescatista;