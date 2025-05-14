const validator = require("validator");

const validateSignUpData = (req) =>{
    const {firstName, lastName, email, password} = req.body;

    if(!firstName || !lastName)
    {
        throw new Error("Name is not valid");
    }

    if(!validator.isEmail(email))
    {
        throw new Error("Email is not valid");
    }

    if(!validator.isStrongPassword(password))
    {
        throw new Error("Strong password required");

    }
}

module.exports = { validateSignUpData };