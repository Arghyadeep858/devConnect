const mongoose = require('mongoose'); 

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://DevConnect:Arghyadeep9123@devconnect.t2jja.mongodb.net/devConnect"
        );
};

module.exports = connectDB;
