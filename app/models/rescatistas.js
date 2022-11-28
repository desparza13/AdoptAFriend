"use strict";

const mongoose = require('mongoose');

let mongoDB = 'mongodb+srv://Jenn:Jenn_123@adoptafriend.sszez2p.mongodb.net/AdoptAFriend';
let options = {useNewUrlParser: true, useUnifiedTopology: true};

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
    }
})

let Rescatista = mongoose.model('rescatista',rescatistaSchema);

module.exports = Rescatista;