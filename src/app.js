const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user.js");
const { Error } = require("mongoose");
 
app.use(express.json());                                        // Middleware: use to parse request to json
app.use(express.urlencoded({extended : true}));                 // Middleware: url encoding handled by express

const cookieParser =  require("cookie-parser");
const { userAuth } = require("./middleware/auth.js");


app.use(cookieParser()); // Using middleware of cookie parser
 
const auth = require("./Routes/auth.js");
const profile = require("./Routes//profile.js");
const user = require("./Routes/request.js");

app.use("/", auth);
app.use("/", profile);
app.use("/", user);

app.get("/feed", userAuth ,async (req,res)=>{
    try{

        const user = await User.find({});
        if(!user)
        {
            throw new Error("Invalid credentials");
        }
        console.log(user);
        res.send(user);
     
    }
    catch(err)
    {
        res.status(400).user("Error: "+err.message);
    }
});


/* This is Get User by email function */ 

app.get("/user", userAuth, async (req, res)=>{
    const userEmailId = req.body.email;

    try{
        
        const user = await User.findOne({ email: userEmailId});
        if(user.length != 0)
        {
            res.send(user);
        }
        else{
            res.status(400).send("Something went wrong");  
        }
    } 
    catch(err)
    {
        res.status(400).send("Something went wrong"+err.message);

    }
    
});


/* This is delete function */ 

app.delete("/user", userAuth, async (req, res)=>{
    const userId = req.body.userId;

    try{
        // find by id and delete
        const user = await User.findByIdAndDelete(userId);
        if(user.length != 0)
        {
            res.send("Successfully deleted the record");
        }
        else{
            res.status(400).send("Something went wrong");  
        }
    } 
    catch(err)
    {
        res.status(400).send("Something went wrong"+err.message);
    }
    
});


/* This is Update function */ 

app.patch("/user/:userId", userAuth, async (req, res)=>{
    

    try{
        //user id comes from parameter/url userId
        const userId = req.params.userId;
        
        const data  = req.body;

        //Separate some fields which only allowed for updating
        const ALLOWED_UPDATE = ["userId","firstName","lastName","gender","age","skill","photoUrl"];

        //The code checks if every key in the data object is present in the ALLOWED_UPDATE array
        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATE.includes(k));

        if(!isUpdateAllowed)
        {
            throw new Error("Field cannot be updated");
        }

        if(data?.skill.length>10)
        {
            throw new Error("Skills cannot be more than 10");
        }

        // find user id comes from parameter/url and update fields
        const user = await User.findByIdAndUpdate({_id:userId}, data, {runValidators:true});
        if(user.length != 0)
        {
            res.send("Successfully updated the record");
        }
        else{

            res.status(400).send("Something went wrong");  
        }
    } 
    catch(err)
    {
        throw new Error("Something went wrong: "+err.message);

    }
    
});

//Connnection with database 
connectDB()
    .then(()=>{
        console.log("Database connection established");

        app.listen(7777,()=>{
            console.log("Server is successfully listening on 7777....");
        });
        
    })
    .catch((err)=>{
        console.error("Database cannot be connected"+err.message);
    });

