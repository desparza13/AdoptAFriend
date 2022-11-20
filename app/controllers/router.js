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

//Rutas directas a home y shopping cart
// router.use(express.static('app/views'));
// router.use('/home',express.static('./app/views/home.html'));
// router.use('/shopping_cart',express.static('./app/views/shopping_cart.html'));

// router.use('/admin/products',validateAdmin,adminProductRouter);

router.use('/admin/pet',adminPet);
router.use('/pet',pet);

router.use('/admin/adoptante',adminAdoptante);
router.use('/adoptante',adoptante);

router.use('/admin/rescatista',adminRescatista);
router.use('/rescatista',rescatista);

// const path = require('path');

// router.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname,'..', 'views', 'home.html'));
//   });


// function validateAdmin(req,res,next){   //Autenticador
//     let adminToken = req.get('x-auth');
//     if(adminToken == undefined || adminToken!= 'admin'){
//         return res.status(403).send("Acceso no autorizado, no se cuenta con privilegios de administrador");
//     }
//     next();
// }

module.exports = router;