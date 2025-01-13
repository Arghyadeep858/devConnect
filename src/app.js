const express = require("express");

const app = express();

app.use("/", (req,res)=>{
    res.send("Hello From the dashboard");
});

app.use("/test", (req,res)=>{
    res.send("Hello From Test");
});

app.use("/hello", (req,res)=>{
    res.send("Hello From server");
});


app.listen(7777,()=>{
    console.log("Server is successfully listening on 7777....");
});
