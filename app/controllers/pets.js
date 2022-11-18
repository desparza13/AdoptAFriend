"use strict";

class ProductException{
    constructor(errorMessage){
        this.errorMessage = errorMessage;
    }
}
class Pet{
    constructor(tipo, raza, status, edad, genero, talla, nombre, uuidRescatista, petImg, ciudad, perronalidad){
        this._uuid = generateUUID();
        this.tipo = tipo;
        this.raza = raza;
        this.status = status;
        this.edad = edad;
        this.genero = genero;
        this.talla = talla;
        this.nombre = nombre;
        this.uuidRescatista = uuidRescatista;
        this.petImg = petImg;
        this.ciudad = ciudad;
        this.perronalidad = perronalidad;
    }

    //getters
    get uuid(){
        return this._uuid;
    }
    get tipo(){
        return this._tipo;
    }
    get raza(){
        return this._raza;
    }
    get t
} 