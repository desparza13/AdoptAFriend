"use strict";

const mongoose = require('mongoose');

let mongoDB = 'mongodb+srv://Jenn:Jenn_123@adoptafriend.sszez2p.mongodb.net/AdoptAFriend';

let options = {useNewUrlParser: true, useUnifiedTopology: true};

mongoose.connect(mongoDB,options);

let solicitudSchema = mongoose.Schema({
    idAdoptante:{
        type: String,
        required:true
    },
    idMascota:{
        type:String,
        required: true
    },
    idRescatista:{
        type:String,
        required:true
    }
})

let Solicitud = mongoose.model('solicitude',solicitudSchema);

module.exports = Solicitud;