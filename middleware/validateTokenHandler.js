const express = require('express');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async function(req,res,next){

    
    let authHeader = req.headers.authorization || req.headers.Authorization;
    /* when passing a req body the client has the option of setting the header of the req
       these headers are used to identify the client user 
       ex: in case of JWT token the client sets a header to authorization which means the req contains a token 
       for authorization.
       we are checking if the sent authorization is passed with lowercase A or uppercase A  
    */

    let token;
    if(authHeader && authHeader.startsWith("Bearer")){
    /*same case of above we are again checking if the token passed is of bearer type or not */    

        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_KEY, (err,decoded) => {
            if(err){
                res.status(400);
                throw new Error("User is not authorized");
            }

            console.log(decoded);
            req.user = decoded.user;
            next();
        });

        if(!token){
            res.status(401);
            throw new Error("User token not valid")
        }
    }

   
})

module.exports = validateToken;