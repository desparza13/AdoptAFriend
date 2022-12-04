"use strict"

const express = require('express');
const router = express.Router();

//Rutas para mascotas
const adminPet = require('../routes/admin_pet')
const pet = require('../routes/pet');

//Rutas para adoptantes
const adminAdoptante = require('../routes/admin_adoptante')
const adoptante = require('../routes/adoptante');

//Rutas para rescatistas
const adminRescatista = require('../routes/admin_rescatista')
const rescatista = require('../routes/rescatista');

//Mascotas
router.use('/admin/pet',adminPet);
router.use('/pet',pet);

//Adoptante
router.use('/admin/adoptante',adminAdoptante);
router.use('/adoptante',adoptante);

//Rescatista
router.use('/admin/rescatista',adminRescatista);
router.use('/rescatista',rescatista);

const path = require('path');

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname,'..', 'views', 'home.html'));
});



module.exports = router;