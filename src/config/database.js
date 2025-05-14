const mongoose = require('mongoose'); 

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://DevConnect:93sp0SdJAPOirA6m@devconnect.t2jja.mongodb.net/devConnect"
        );
};

module.exports = connectDB;
