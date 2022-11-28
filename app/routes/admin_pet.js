"use strict"
const express = require('express');
const router = express.Router();
const dataHandler = require('./../controllers/data_handler');

//POST /admin/pet
router.route('/')
    .post((req, res)=>{
        dataHandler.createPet(req, res);
    });

//PUT GET DELETE /admin/pet/:nombre
router.route('/:nombre')
  .get((req, res) => dataHandler.getPetByNombre(req, res))
  .put((req, res) => dataHandler.updatePet(req, res))
  .delete((req, res) => dataHandler.deletePet(req, res));

module.exports = router;