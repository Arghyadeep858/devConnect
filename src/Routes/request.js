const User = require("../models/user.js");
const { userAuth } = require("../middleware/auth.js");

const express = require('express');

const requestRouter = express.Router();


requestRouter.post("sendConnectionRequest", userAuth, async (req,res) =>{

    const user = req.user;
    console.log("Sending a connection request");

    res.send(user.firstName + "Sent the connection request");
});

module.exports = requestRouter;

