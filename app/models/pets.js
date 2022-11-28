"use strict";

const mongoose = require('mongoose');

let mongoDB = 'mongodb+srv://Jenn:Jenn_123@adoptafriend.sszez2p.mongodb.net/AdoptAFriend';
let options = {useNewUrlParser: true, useUnifiedTopology: true};

mongoose.connect(mongoDB,options);

let petSchema = mongoose.Schema({
    tipo:{
        type:String,
        enum:['Perro','Gato'],
        required:true
    },
    raza:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['adoptado','noAdoptado','enProceso'],
        required:true
    },
    edad:{
        type:String,
        enum:['Cachorro','Joven','Adulto'],
        required:true
    },
    genero:{
        type:String,
        enum:['Macho','Hembra'],
        required:true
    },
    talla:{
        type:String,
        enum:['Pequeño','Mediano','Grande'],
        required:true
    },
    nombre:{
        type:String,
        required:true
    },
    idRescatista:{
        type:String,
        required:true
    },
    petImg:{
        type:String,
        required:true
    },
    ciudad:{
        type:String,
        required:true
    },
    perronalidad:{
        type:String,
        enum:['Fiestero','Independiente','Dinámico','Divertido','Tímido','Juguetón','Faldero','Tapete','Inteligente'],
        required:true
    }

})

let Pet = mongoose.model('pet',petSchema);


module.exports = Pet;