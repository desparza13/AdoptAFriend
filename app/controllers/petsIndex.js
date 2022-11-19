let pet1 = {"_tipo":"Perro", "_raza": "Pug", "_status": "adoptado","_edad":"Cachorro",
"_genero":"Hembra", "_talla":"Pequeño", "_nombre":"Gupi", "_uuidRescatista":"sontiaID",
"_petImg":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9WGIHyO_CHqep9WVip7-lyaEUw9X-vJ-62Q&usqp=CAU",
"_ciudad":"Guadalajara", "_perronalidad":"Faldero"};
let pet2 = {"_tipo":"Perro", "_raza": "Mestizo/Criollo", "_status": "adoptado","_edad":"Cachorro",
"_genero":"Hembra", "_talla":"Pequeño", "_nombre":"Nia", "_uuidRescatista":"jennID",
"_petImg":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9WGIHyO_CHqep9WVip7-lyaEUw9X-vJ-62Q&usqp=CAU",
"_ciudad":"Guadalajara", "_perronalidad":"Inteligente"};
let pet3 = {"_tipo":"Perro", "_raza": "Mestizo/Criollo", "_status": "adoptado","_edad":"Joven",
"_genero":"Macho", "_talla":"Mediano", "_nombre":"Milo", "_uuidRescatista":"jennID",
"_petImg":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9WGIHyO_CHqep9WVip7-lyaEUw9X-vJ-62Q&usqp=CAU",
"_ciudad":"Guadalajara", "_perronalidad":"Fiestero"};
let pet4 = {"_tipo":"Gato", "_raza": "Mestizo", "_status": "noAdoptado","_edad":"Joven",
"_genero":"Hembra", "_talla":"Pequeño", "_nombre":"Coqueta", "_uuidRescatista":"adoptanteID",
"_petImg":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9WGIHyO_CHqep9WVip7-lyaEUw9X-vJ-62Q&usqp=CAU",
"_ciudad":"Guadalajara", "_perronalidad":"Independiente"};

//Probar creación y obtención
createPet(pet1);
createPet(pet2);
createPet(pet3);
let mascotas = getPets();
console.table(mascotas);

//Probar actualización
updatePet(mascotas[2].uuid,pet4);
console.table(getPets());

//Obtener mascota por ID
let pet2Copy = getPetById(mascotas[1].uuid);
console.log(pet2Copy);

//Probar borrar
deletePet(mascotas[2].uuid);
console.table(getPets());