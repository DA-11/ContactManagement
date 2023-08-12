
const asynchHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
/**
 * A JSON Web Token, or JWT, is an open standard for securely creating and sending data between two parties, usually a client and a server.
 */

//@desc register new user
//@route POST /api/register
//@Access public 

const register = asynchHandler(async function(req,res){
    
    const{username, email, password} = req.body;
    console.log(req.body);
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    //checkin whether user already exists
    const userAvailable = await User.findOne({email});
    //findOne method of mongoose takes object as argument therefore converting email to object and then passing
    console.log(userAvailable);
    if(userAvailable){
        console.log("throw some erorr herree")
        res.status(401);
        throw new Error("user with given Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password,10);
   

    const user = User.create({
        username,
        email,
        password:hashedPassword,
    });
    console.log(hashedPassword);
    

    if(user){
        res.status(201).json({
            _id:user.id,
            email:user.email,
            message:"New user Successfully registered",
        });
    } else {
        res.status(400);
        throw new Error("user data not valid");
    }

    res.json({message:"Resource created"});
});


//@desc Login existing user
//@route POST /api/login
//@Access public 

const login = asynchHandler(async function(req,res){

    const{email,password} = req.body;

    console.log(req.body);
    if(!email || !password){
        res.status(400);
        throw new Error("Please fill the required details");
    }

    const user = await User.findOne({email});

    //compare user provided password with database password
    if(user && await bcrypt.compare(password,user.password)){

        const accessToken = jwt.sign({
            user : {
                username : user.username,
                email : user.email,
                id : user.id,
            },
        },
            process.env.JWT_KEY,
            {expiresIn : "60m"}
        ); 

        res.status(200).send(accessToken);

    } else {
        res.status(404);
        throw new Error("User not found or password does not match");
    }

});


//@desc get 
//@route GET /api/getUserDetails
//@Access private 

const getUserDetails = asynchHandler(async function(req,res){
    res.json(req.user);
});

module.exports = {register,
                  login,
                  getUserDetails}
