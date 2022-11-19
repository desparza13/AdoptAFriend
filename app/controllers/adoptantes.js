"use strict";

class AdoptanteException{
    constructor(errorMessage){
        this.errorMessage = errorMessage;
    }
}

class Adoptante{
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
        throw new AdoptanteException("Los UUIDs de los adoptantes son autogenerados.");
    }

    get nombre(){
        return this._nombre;
    }

    set nombre(name){
        if(typeof name !== 'string'){
            throw new AdoptanteException("El nombre del adoptante es inválido.");
        }
        else if(name == ''){
            throw new AdoptanteException("El nombre del adoptante no puede estar vacía.");
        }
        this._nombre=name;
    }

    get correo(){
        this._correo;
    }

    set correo(correo){
        if(typeof correo !== 'string'){
            throw new AdoptanteException("El correo del adoptante es inválido.");
        }
        else if(correo == ''){
            throw new   AdoptanteException("El correo del adoptante no puede estar vacío.");
        }
        this._correo=correo;
    }

    get usuario(){
        return this._usuario;
    }

    set usuario(usuario){
        if(usuario == ''){
            throw new   AdoptanteException("El usuario del adoptante no puede estar vacío.");
        }
        this._usuario=usuario;
    }

    get ciudad(){
        return this._ciudad;
    }

    set ciudad(ciudad){
        if(typeof ciudad !== 'string'){
            throw new AdoptanteException("La ciudad del adoptante es inválida.");
        }
        else if(ciudad == ''){
            throw new   AdoptanteException("La ciudad del adoptante no puede estar vacía.");
        }
        this._ciudad=ciudad;
    }

    static AcreateFromJson(jsonValue){
        let obj = JSON.parse(jsonValue);
        return Adoptante.AcreateFromObject(obj);
    }

    static AcreateFromObject(obj){
        let newAdoptante = {};
        Object.assign(newAdoptante,obj); //this will clone originak obj, but also handle possible non-object values.
        Adoptante.AcleanObject(newAdoptante);

        let adoptante = new Adoptante(newAdoptante._nombre,newAdoptante._correo,newAdoptante._usuario, newAdoptante._ciudad);

        if(newAdoptante.hasOwnProperty('_uuid')){
            let id = newAdoptante._uuid;
            adoptante._uuid = id;
        }
            
        return adoptante;
    }

    static AcleanObject(obj){
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