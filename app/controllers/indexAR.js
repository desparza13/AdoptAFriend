"use strict";


let adoptante = {"_nombre":"Daniela Esparza", "_correo": "daniela.esparza@iteso.mx", "_usuario": "danmari","_ciudad":"Guadalajara"};
let adoptante1 = {"_nombre":"Jennifer Hernández", "_correo": "jennifer.hernandez@iteso.mx", "_usuario": "hdzmtjenni","_ciudad":"Guadalajara"};
let adoptante2 = {"_nombre":"Martin Herrera", "_correo": "martin.herrera@iteso.mx", "_usuario": "msanti","_ciudad":"Guadalajara"};
let adoptante3 = {"_nombre":"Martin Herrera", "_correo": "martin.@iteso.mx", "_usuario": "msanti","_ciudad":"Guadal"};


createAdoptante(adoptante);
createAdoptante(adoptante1);
createAdoptante(adoptante2);

let adoptant = getAdoptantes();


updateAdoptante(adoptant[2].uuid,adoptante3);
console.table(getAdoptantes());

let adop =  getAdoptantes();
deleteAdoptante(adop[0].uuid);
console.table(getAdoptantes());


//RESCATISTAS
console.log("Rescatistas");
let rescatista = {"_nombre":"Daniela Esparza", "_correo": "daniela.esparza@iteso.mx", "_usuario": "danmari","_ciudad":"Guadalajara"};
let rescatista1 = {"_nombre":"Jennifer Hernández", "_correo": "jennifer.hernandez@iteso.mx", "_usuario": "hdzmtjenni","_ciudad":"Guadalajara"};
let rescatista2 = {"_nombre":"Martin Herrera", "_correo": "martin.herrera@iteso.mx", "_usuario": "msanti","_ciudad":"Guadalajara"};
let rescatista3 = {"_nombre":"Martin Herrera", "_correo": "martin.@iteso.mx", "_usuario": "msanti","_ciudad":"Guadal"};


createRescatista(rescatista);
createRescatista(rescatista1);
createRescatista(rescatista2);

let rescat =getRescatistas();

console.table(getRescatistas());

updateRescatista(rescat[2].uuid,adoptante3);
console.table(getRescatistas());

let resc =  getRescatistas();
deleteRescatista(resc[0].uuid);
console.table(getRescatistas());