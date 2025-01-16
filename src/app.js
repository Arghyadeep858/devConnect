const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user.js");
const { Error } = require("mongoose");

app.use(express.json());

app.post("/signup", async (req, res)=>{
    try{

        const user = new User(req.body);
        await user.save();
        res.send("User Added Successfully");
    } 
    catch(err)
    {
        res.status(400).send(err.message);

    }
});

app.get("/user",async (req, res)=>{
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

app.delete("/user",async (req, res)=>{
    const userId = req.body.userId;

    try{
        
        const user = await User.findByIdAndDelete(userId);
        if(user.length != 0)
        {
            res.send("Successfully ddeleted the record");
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

app.patch("/user",async (req, res)=>{
    const userId = req.body.userId;
    const data  = req.body;
    const ALLOWED_UPDATE = ["firstName","lastName","gender","age","skills","photoUrl"];
    const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATE.includes(k));

    if(!isUpdateAllowed)
    {
        res.status(400).send("Field cannot be updated")
    }

    try{
        
        const user = await User.findByIdAndUpdate({_id:userId},data, {runValidators:true});
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
        res.status(400).send("Something went wrong"+err.message);

    }
    
});


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

