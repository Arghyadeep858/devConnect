const mongoose  = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");                               //use to encrypt/decrypt password
 

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
        trim: true ,
        validate(value){
            if(!validator.isEmail(value))
            {
                throw new Error("Invalid Email");
            }
        }    
    },
    password:{
        type:String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value))
            {
                throw new Error("Password should be strong");
            }
        }    
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

 userSchema.methods.getJWT = async function ()   {
    const user = this;

    const token = await jwt.sign({_id: user._id}, "devConnect@1234");
    return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser)   {
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
};

module.exports = mongoose.model("User",userSchema);
