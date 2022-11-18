"use strict";

class PetException{
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
    get status(){
        return this._status;
    }
    get edad(){
        return this._edad;
    }
    get genero(){
        return this._genero;
    }
    get talla(){
        return this._talla;
    }
    get nombre(){
        return this._nombre;
    }
    get uuidRescatista(){
        return this._uuidRescatista;
    }
    get petImg(){
        return this._petImg;
    }
    get ciudad(){
        return this._ciudad;
    }
    get perronalidad(){
        return this._perronalidad;
    }

    //setters
    set uuid(value){
        throw new PetException("Los UUID de las mascotas son auto generados");
    }
    set tipo(value){
        if(typeof value!='string'){
            throw new PetException("El tipo de mascota debe ser un string");
        }
        else if(value===''){
            throw new PetException("El tipo de mascota no puede estar vacio");
        }
        else if (value==='Perro' || value==='Gato'){
            this._tipo=value;
        }
        else{
            throw new PetException("El tipo de mascota solo puede ser Perro o Gato");
        }
    }
    set raza(value){
        if(typeof value!='string'){
            throw new PetException("La raza de mascota debe ser un string");
        }
        else if(value===''){
            throw new PetException("La raza de mascota no puede estar vacio");
        }
        this._raza=value;
    }
    set status(value){
        if(typeof value!='string'){
            throw new PetException("El status de una mascota debe ser un string");
        }
        else if(value===''){
            throw new PetException("El status de una mascota no puede estar vacio");
        }
        else if (value==='adoptado' || value==='noAdoptado' || value==='enProceso'){
            this._status=value;
        }
        else{
            throw new PetException("El status de mascota solo puede ser adoptado, noAdoptado o enProceso");
        }
    }
    set edad(value){
        if(typeof value!='string'){
            throw new PetException("La edad de una mascota debe ser un string");
        }
        else if(value===''){
            throw new PetException("La edad de una mascota no puede estar vacio");
        }
        else if (value==='Cachorro' || value==='Joven' || value==='Adulto'){
            this._edad=value;
        }
        else{
            throw new PetException("La edad de mascota solo puede ser Cachorro, Joven o Adulto");
        }    
    }
    set genero(value){
        if(typeof value!='string'){
            throw new PetException("El género de una mascota debe ser un string");
        }
        else if(value===''){
            throw new PetException("El género de una mascota no puede estar vacio");
        }
        else if (value==='Macho' || value==='Hembra'){
            this._genero=value;
        }
        else{
            throw new PetException("El género de mascota solo puede ser Macho o Hembra");
        }  
    }
    set talla(value){
        if(typeof value!='string'){
            throw new PetException("El tamaño de una mascota debe ser un string");
        }
        else if(value===''){
            throw new PetException("El tamaño de una mascota no puede estar vacio");
        }
        else if (value==='Grande' || value==='Mediano' || value==='Pequeño'){
            this._talla=value;
        }
        else{
            throw new PetException("El tamaño de mascota solo puede ser Grande, Mediano o Pequeño");
        }  
    }
    set nombre(value){
        if(typeof value!='string'){
            throw new PetException("El nombre de una mascota debe ser un string");
        }
        else if(value===''){
            throw new PetException("El nombre de una mascota no puede estar vacio");
        }
        this._nombre=value;
    }
    set uuidRescatista(value){
        if(typeof value!='string'){
            throw new PetException("El uuid del rescatista de una mascota debe ser un string");
        }
        else if(value===''){
            throw new PetException("El uuid del rescatista de una mascota no puede estar vacio");
        }
        this._uuidRescatista=value;
    }
    set petImg(value){
        if(typeof value!='string'){
            throw new PetException("La imagen de una mascota debe ser un string");
        }
        else if(value===''){
            throw new PetException("La imagen de una mascota no puede estar vacio");
        }
        this._petImg=value;
    }
    set ciudad(value){
        if(typeof value!='string'){
            throw new PetException("El género de una mascota debe ser un string");
        }
        else if(value===''){
            throw new PetException("El género de una mascota no puede estar vacio");
        }
        this._ciudad=value;
    }
    set perronalidad(value){
        const perronalidades = ["Fiestero", "Independiente", "Dinámico", "Divertido", "Timido", "Juguetón", "Faldero", "Tapete", "Inteligente"];
        if(typeof value!='string'){
            throw new PetException("La perronalidad de una mascota debe ser un string");
        }
        else if(value===''){
            throw new PetException("La perronalidad de una mascota no puede estar vacio");
        }
        else if (perronalidades.includes(value)){
            this._status=value;
        }
        else{
            throw new PetException("El género de mascota solo puede ser Macho o Hembra");
        }  
    }

    //Funciones estáticas
    static petCreateFromJson(jsonValue){
        let obj = JSON.parse(jsonValue);
        return Pet.petCreateFromObject(obj);
    }

    static petCreateFromObject(obj){
        let newPet = {};
        Object.assign(newPet,obj); 
        Pet.petCleanObject(newPet);

        let pet = new Pet(newPet._tipo, newPet._raza, newPet._status, newPet._edad, newPet._genero, newPet._talla, newPet._nombre, newPet._uuidRescatista, newPet._petImg, newPet._ciudad, newPet._perronalidad);
        if(newPet.hasOwnProperty('_uuid')){
            let id = newPet._uuid;
            pet._uuid = id;
        }
        return pet;
    }

    static petCleanObject(obj){
        let props = ['uuid','tipo','raza','status','edad', 'genero', 'talla', 'nombre', 'uuidRescatista', 'petImg', 'ciudad', 'perronalidad'];
        for(let prop in props){
            if(!obj.hasOwnProperty(prop)){
                delete obj[prop];
            } 
        }
        return obj;
    }
} 