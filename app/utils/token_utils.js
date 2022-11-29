"use strict";
const jwt = require("jsonwebtoken");

let privateKeyR = process.env.TOKEN_KEY_R;

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

exports.verifyTokenR = verifyTokenR;