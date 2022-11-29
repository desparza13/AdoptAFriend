"use strict";
const jwt = require("jsonwebtoken");

let privateKeyR = process.env.TOKEN_KEY_R;
let privateKeyA = process.env.TOKEN_KEY_A;

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

const verifyTokenA = (req, res, next) => { //Verificar que el token esté correcto
    let token = req.get("x-auth"); 
    if (token == undefined) {
        return res.status(403).send("Missing token"); //si no hay token
    }

    jwt.verify(token, privateKeyA, (err, decoded) => { //Verifica que el token sea igual a la llave de respatista
        if (err) return res.status(401).send("Invalid Token");

        req.adoptanteInfo = decoded;
        return next();
    });
};

exports.verifyTokenR = verifyTokenR;
exports.verifyTokenA = verifyTokenA;