"use strict"
const express = require('express');
const router = express.Router();
const dataHandler = require('./../controllers/data_handler');
const tokenUtils = require('../utils/token_utils');

//POST /admin/pet
router.use('/',tokenUtils.verifyTokenR);
router.route('/')
    .post((req, res)=>{
        dataHandler.createPet(req, res);
    });

//PUT GET DELETE /admin/pet/:nombre
router.use('/:id',tokenUtils.verifyTokenR);
router.route('/:id')
  .put((req, res) => dataHandler.updatePet(req, res))
  .delete((req, res) => dataHandler.deletePet(req, res));

module.exports = router;