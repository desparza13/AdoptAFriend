"use strict";
const jwt = require("jsonwebtoken");

let privateKeyR = process.env.TOKEN_KEY_R;
let privateKeyA = process.env.TOKEN_KEY_A;

//Verificar token Rescatista
const verifyTokenR = (req, res, next) => { //Verificar que el token esté correcto
    let token = req.get("x-auth"); 
    if (token == undefined) {
        return res.status(403).send("Missing token"); //si no hay token
    }
    jwt.verify(token, privateKeyR, (err, decoded) => { //Verifica que el token sea igual a la llave de respatista
        if (err) return res.status(401).send("Invalid Token");
        req.rescatistaInfo = decoded;
        return next();
    });
};
//Verificar token Adoptante
const verifyTokenA = (req, res, next) => { //Verificar que el token esté correcto
    let token = req.get("x-auth"); 
    console.log(token);
    if (token == undefined) {
        return res.status(403).send("Missing token"); //si no hay token
    }

    jwt.verify(token, privateKeyA, (err, decoded) => { //Verifica que el token sea igual a la llave de respatista
        if (err) return res.status(401).send("Invalid Token");

        req.adoptanteInfo = decoded;
        return next();
    });
};
//Verificar token de usuario (Adoptantes y rescatistas)
const verifyToken = (req, res, next) => { //Verificar que el token esté correcto
    let token = req.get("x-auth"); 
    console.log(token);
    if (token == undefined) {
        return res.status(403).send("Missing token"); //si no hay token
    }
    jwt.verify(token, privateKeyA, (err, decoded) => { //Verifica que el token sea igual a la llave de respatista
        if (err){
            jwt.verify(token, privateKeyR, (err, decoded) => { //Verifica que el token sea igual a la llave de respatista
                if (err){
                    return res.status(401).send("Invalid Token");
                }
                req.adoptanteInfo = decoded;
                return next();
            });
        }
        req.adoptanteInfo = decoded;
        return next();
    });
};

exports.verifyToken = verifyToken;
exports.verifyTokenR = verifyTokenR;
exports.verifyTokenA = verifyTokenA;