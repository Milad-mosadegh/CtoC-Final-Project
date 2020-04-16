const user= require("../model/userModel")
const bcrypt =require("bcrypt")
const jwt = require("jsonwebtoken")
const jwtSecretKey = process.env.JWT_SECRET_KEY
const emailCheck = require("../middleware/nodemailer")
const passRecovery = require("../model/passRecoveryModel")

//Token Generator
const createToken =  id => jwt.sign({id}, jwtSecretKey, {expiresIn:3600})

//Password Recovery Token
const passResetToken = (payload,pass) =>jwt.sign(payload, pass, {expiresIn:3600})

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
//Checking Authentication of user

exports.authenticated=async(req,res)=>{
    console.log("it is authenticaed route",req.header)
    res.json({status:"success", message:"you reached authenticated route"})
}
//Reseting Passowrd and Sending Link

exports.resetLink = async(req,res)=>{
    const {email} =req.body.data
    let userCheck= await user.findOne({email})
    if(!userCheck) return res.json({status:"failed", message:"Invalid email address"})

    const payload ={
        id:userCheck._id,
        email:userCheck.email
    }

    const resetToken = await passResetToken(payload, userCheck.pass)
    console.log(resetToken)
    const newPassRcovery= new passRecovery({
        userId : userCheck._id,
        recovered:false,
        requestTimeStamp:Date.now(),
        tokenId:resetToken,
        previousPass:userCheck.pass

    });
    newPassRcovery.save(async (err, doc)=>{
        if(err) res.json({status: "failed", message:err})
        else{ 
            let resetLinkSent = await emailCheck.confirmation({
                id:userCheck._id,
                email:userCheck.email,
                subject:"Reset Password at c2c",
                text:"",
                html:`<b>To Change your passowrd please <a href="http://localhost:3000/resetpass/${payload.id}/${resetToken}">Click here!</a></b>`
            })
            if(resetLinkSent) res.json({status:"success", message:"Email containg reset link successfuly sent. Please check your email."})
                else res.json({status:"failed", message:"Sorry we are unable to proccess your request please try again later"})
        }
    })    
}

exports.recoverPassword = async(req,res)=>{
    const {id, token} = req.body.data
    console.log(id)
    console.log(token)
    let tokenCheck= await passRecovery.findOne({tokenId:token})
    if(!tokenCheck) return res.json({status:"failed", message:"invalid token"})
    if(tokenCheck.recovered) return res.json({status:"failed", message:"invalid token"})
        else res.json({
            status   :"success",
            message  : "Valid Request ", 
            token    
             })
   
    }



exports.resetPassword=async(req,res)=>{
    const {pass,confirmPass} = req.body.data
    const token = req.header("x-auth-token")
    const id = req.params.id

    if(!token) return res.json({
        status:"failed",
        message:"Authentication failed!"})
    
    if(pass!==confirmPass) return res.json({status:"failed", message:"Passwords mismatch please check your inputs"})
    
    let targetUser = await user.findById(id)

    if(!targetUser) return res.json({status:"failed", message:"Authentication failed"})

    const jwtPassKey = targetUser.pass
    
    try{
        jwt.verify(token, jwtPassKey,(fail, decodedPayload)=>{
            if(fail) return res.json({
                status:"failed",
                message:"Authentication failed! in jwt part"
            }) 
            else {
                console.log("its payload", decodedPayload)
               
            }
        })
    } catch(error){
        res.status(500).json({
            status:"error",
            message:error
        })
    }

    let hashedPass = await bcrypt.hash(pass, 10)
    const profileData = {
        pass:hashedPass
    }
    console.log(id, profileData)
    console.log(await user.findById(id))
    await user.findByIdAndUpdate(id, profileData,async (err, doc)=>{
        if(err) return res.json({status:"failed", message:err})
        else {

            await passRecovery.findOneAndUpdate({tokenId:token}, {recovered:true}, (err,doc)=>{
                if(err) res.json({status:"failed", message:err})
                    else res.json({status:"success", message:"You have succesfully cahnged your password"})
            })
            console.log("Successfully change")
        }

     })
}




    
