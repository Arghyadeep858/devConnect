const bcrypt = require("bcrypt");                               //use to encrypt/decrypt password
const User = require("../models/user.js");
const {validateSignUpData} = require("../utils/validation.js");  

const express = require("express");
const authRouter = express.Router();

authRouter.post("/signup", async (req, res)=>{
    try{
        // Validation function resides in utils
        validateSignUpData(req);
        const password = req.body.password;
 
        // Password encryption by bcrypt function
        const passwordHash = await bcrypt.hash(password, 10);
        req.body.password = passwordHash;

        // Creating a new instance of the user model
        const user = new User(req.body);

        // validated data and encrypted password saved
        await user.save();
        res.send("User Added Successfully");
    } 
    catch(err)
    {
        res.status(400).send("ERROR: "+err.message);

    }
});


authRouter.post("/login", async (req, res)=>{
    try{
 
        //find user details which returns one data where email is req.body.email
        const user = await User.findOne( {email: req.body.email} );

        //If data is not fetched by the email then throw an error
        if(!user)
        {
                throw new Error("Invalid credentials");
        }

        //After email match , bcrypt compare helps to check if the password is matched or not
        const {password} = req.body;
        const isPasswordValid = await user.validatePassword(password);

        if(isPasswordValid)
        {
                // creating jwt token
                const token = await user.getJWT();
                console.log("hello "+token);

                // embedded into cookies
                res.cookie("token", token,  {
                    expires: new Date(Date.now() + 8 * 3600000)
                });

                res.send("Login successfull");
        }
        else{
                throw new Error("Invalid credentials");
            }

    } 
    catch(err)
    {
        res.status(400).send("ERROR: "+err.message);

    }
});

module.exports = authRouter;

