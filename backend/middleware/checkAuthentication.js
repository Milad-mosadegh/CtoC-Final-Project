const jwt = require("jsonwebtoken")
const jwtSecretKey= process.env.JWT_SECRET_KEY

exports.checkToken =(req,res, next)=>{
    const token = req.header("x-auth-token")

    if(!token) return res.status(401).json({
        status:"failed",
        message:"Authentication failed!"})
    
    try{
        jwt.verify(token, jwtSecretKey,(fail, decodedPayload)=>{
            if(fail) return res.status(401).json({
                status:"failed",
                message:"Authentication failed!"
            }) 
            else {
                req.userId =decodedPayload.id;
                next();
            }
        })
    } catch(error){
        res.status(500).json({
            status:"error",
            message:error
        })
    }
}