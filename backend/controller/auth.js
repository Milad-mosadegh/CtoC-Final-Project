const user= require("../model/userModel")
const bcrypt =require("bcrypt")
const jwt = require("jsonwebtoken")
const jwtSecretKey = process.env.JWT_SECRET_KEY
const emailCheck = require("../middleware/nodemailer")

//Token Generator
const createToken =  id => jwt.sign({id}, jwtSecretKey, {expiresIn:1000000})

//Sign in  Area
exports.signin=async (req,res)=>{

    const {email, pass} = req.body.data;
    await user.findOne({email},(err,result)=>{
        if(err) return res.status(500).json({
            status:"failed",
            message:"Sorry, we are unable to process your request please try again"})
            
        if(!result) return res.json({
            status:"failed",
            message:"Authorization failed , please check your credentials"})

        bcrypt.compare(pass,result.pass)
                .then(async(isPassCorrect)=>{
                   if(isPassCorrect) {
                        if(result.confirmed){
                                const token = await createToken(result.id)
                                res.json({
                                    status   :"success",
                                    message  : "Welcome! you are successfully logged in. ", 
                                    token
                                     })
                                    }   else res.json({
                                                    status:"failed",
                                                    message:"Authentication failed, please confirm you email address first"
                                    })
                            } 
                            else res.json({
                                        status:"failed",
                                        message:"Authorization failed , please check your credentials"})
                })
                    })
            }
// Signup Area           
exports.signup=async (req,res)=>{

    const {firstName,lastName,email,pass} = req.body.data

    let userCheck= await user.findOne({email})

    if(userCheck){
        return res.json({status:"failed", message:"Sorry! this email is already registered with us"})
    }

    let hashedPass = await bcrypt.hash(pass, 10)
    console.log(hashedPass)
    if(!hashedPass) return res.status(501).json({status:"failed", message:"Technical Erro 501, Please contact support team!"})
    const newUser = new user({
                firstName,
                lastName,
                email,
                pass:hashedPass,   
                confirmed:true,
                accessLevel : "user"
            });
     newUser.save((err, doc)=>{
                if(err) res.status(500).json({status: "failed", message:err})
                    else{ 
                        res.json({status:"success", message:"Welcome ! Your account is successfully created"})
                        //emailCheck.confirmation(doc)
                    }
                    
            })
        }

exports.authenticated=async(req,res)=>{
    console.log("it is authenticaed route",req.header)
    res.json({status:"success", message:"you reached authenticated route"})
}



    
