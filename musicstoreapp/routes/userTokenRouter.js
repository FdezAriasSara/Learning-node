const jwt = require("jsonwebtoken");
const express = require('express');
const userTokenRouter = express.Router();
userTokenRouter.use(function (req, res, next) {
    console.log("userAuthorRouter");
    let token = req.headers['token'] || req.body.token || req.query.token;//we obtain the token and admit it to be sent in POST GET OR HEADER
    if (token != null) {
        // verificar el token
        jwt.verify(token, 'secreto', {}, function (err, infoToken) {
            if (err || (Date.now() / 1000 - infoToken.time) > 240) {//If we cannot decrypt it or it's time is out
                res.status(403); // Forbidden
                res.json({
                    authorized: false,
                    error: 'Token inválido o caducado'
                });
            } else {//if the token was actually decrypted.
                // dejamos correr la petición
                res.user = infoToken.user;
                next();
            }
        });
    } else {//if no token
        res.status(403); // Forbidden
        res.json({
            authorized: false,
            error: 'No hay Token'
        });
    }
});
module.exports = userTokenRouter;
