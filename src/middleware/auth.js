const adminAuth = (req,res,next)=>{
    const token = "123";
    const isAdminAuthorized = token === "123";
    if(!isAdminAuthorized)
    {
        res.status(401).send("Unauthorised User")
    }
    else{
        next();
    }
};
const userAuth = (req,res,next)=>{
    const token = "123";
    const isAdminAuthorized = token === "123";
    if(!isAdminAuthorized)
    {
        res.status(401).send("Unauthorised User")
    }
    else{
        next();
    }
};


module.exports = {adminAuth,userAuth}