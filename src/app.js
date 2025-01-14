const express = require("express");

const app = express();

const {userAuth, adminAuth} = require("./middleware/auth.js")

app.use("/admin", adminAuth);

app.get("/user", userAuth,(req,res)=>{
    //console.log(req.params);
    res.send("Hello From user");
});

app.get("/admin/getAllData", (req,res)=>{
    console.log(req.params);
    res.send("Hello From Test");
});

app.get("/admin/deleteUser", (req,res)=>{
    res.send("saved successfullly to the database");
});


app.listen(7777,()=>{
    console.log("Server is successfully listening on 7777....");
});
