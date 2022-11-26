"use strict";

class PetFavoriteException{
    constructor(errorMessage){
        this.errorMessage = errorMessage;
    }
}

class PetFavorite{
    constructor(){
        this.pets=[];
        this.petFavUuids = [];
    }

    get pets(){
        return this._pets;
    }
    set pets(value){
        this._pets=[];
        if (typeof value=='string'){
            value = JSON.parse(value);
            this._pets.push(Pet.petCreateFromObject(value));
        }
    }
    addItem(petFavUuid){
        const searchIndex = this.petFavUuids.findIndex(this.petFavUuids==petFavUuid);
        if (searchIndex!=-1){
            throw new PetFavoriteException("La mascota ya está en tu lista de favoritos");
        }else{
            this.petFavUuids.push(petFavUuid);
        }
    }
    removeItem(petFavUuid){
        const searchIndex = this.petFavUuids.findIndex(this.petFavUuids==petFavUuid);
        if(searchIndex!=-1){
            this.petFavUuids.splice(searchIndex,1);
            this.pets.splice(searchIndex,1);
        }else{
            throw new PetFavoriteException("No se puede eliminar una mascota que no existe en la lista de favoritos");
        }
    }

}