const mongoose  = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required: true,
        minLength:4,
        maxLength:20
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required: true,
        lowercase: true,
        unique: true ,
        trim: true      
    },
    password:{
        type:String,
        required: true
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value))
            {
                throw new Error("Gender data is not valid");
            }
        },
    },
    photoUrl:{
        type:String,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Ficonduck.com%2Ficons%2F180867%2Fprofile-circle&psig=AOvVaw2wMh-W3mxYzZaG_R7zeoQ-&ust=1737023439370000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNiWzOPC94oDFQAAAAAdAAAAABAE"
    },
    about: {
        type: String,
        default:"Hey there i am using devConnect"
    },
    skill: {
        type: [String],
    },

},
{
    timestamps: true,
}


);



module.exports = mongoose.model("User",userSchema);
