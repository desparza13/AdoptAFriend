"use strict";

class RescatistaException{
    constructor(errorMessage){
        this.errorMessage = errorMessage;
    }
}

class Rescatista{
    constructor(nombre,correo,usuario,ciudad){
        this._uuid = generateUUID();
        this.nombre=nombre;
        this.correo=correo;
        this.usuario=usuario;
        this.ciudad = ciudad;
    }

    get uuid(){
        return this._uuid;
    }

    set uuid(value){
        throw new RescatistaException("Los UUIDs de los rescatista son autogenerados.");
    }

    get nombre(){
        return this._nombre;
    }

    set nombre(name){
        if(typeof name !== 'string'){
            throw new RescatistaException("El nombre del rescatista es inválido.");
        }
        else if(value == ''){
            throw new RescatistaException("El nombre del rescatista no puede estar vacío.");
        }
        this._nombre=name;
    }

    get correo(){
        this._correo;
    }

    set correo(correo){
        if(typeof correo !== 'string'){
            throw new RescatistaException("El correo del rescatista es inválido.");
        }
        else if(correo == ''){
            throw new   RescatistaException("El correo del rescatista no puede estar vacío.");
        }
        this._correo=correo;
    }

    get usuario(){
        return this._usuario;
    }

    set usuario(usuario){
        if(usuario == ''){
            throw new   RescatistaException("El usuario del rescatista no puede estar vacío.");
        }
        this._usuario=usuario;
    }

    get ciudad(){
        return this._ciudad;
    }

    set ciudad(ciudad){
        if(typeof ciudad !== 'string'){
            throw new RescatistaException("La ciudad del rescatista es inválida.");
        }
        else if(ciudad == ''){
            throw new   RescatistaException("La ciudad del rescatista no puede estar vacía.");
        }
        this._ciudad=ciudad;
    }

    static RcreateFromJson(jsonValue){
        let obj = JSON.parse(jsonValue);
        return Adoptante.createFromObject(obj);
    }

    static RcreateFromObject(obj){
        let newRescatista = {};
        Object.assign(newRescatista,obj); //this will clone originak obj, but also handle possible non-object values.
        Product.cleanObject(newRescatista);

        let rescatista = new Adoptante(newRescatista._nombre,newRescatista._correo,newRescatista._usuario, newRescatista._ciudad);

        if(newRescatista.hasOwnProperty('_uuid')){
            let id = newRescatista._uuid;
            rescatista._uuid = id;
        }
            
        return rescatista;
    }

    static RcleanObject(obj){
        //Verify that we only contain the desired properties
        let props = ['nombre','correo','usuario','ciudad'];
        
        for(let prop in props){
            //if prop in properties continue, else delete
            if(!obj.hasOwnProperty(prop)){
                delete obj[prop];
            } 
        }
    }
}