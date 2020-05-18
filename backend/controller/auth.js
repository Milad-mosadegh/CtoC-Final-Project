const User= require("../model/userModel")
const bcrypt =require("bcrypt")
const jwt = require("jsonwebtoken")
const jwtSecretKey = process.env.JWT_SECRET_KEY
const emailCheck = require("../middleware/nodemailer")


//Token Generator
const createToken =  id => jwt.sign({id}, jwtSecretKey, {expiresIn:3600})



//Sign in  Area
exports.signin=async (req,res)=>{

    const {email, pass} = req.body.data;
    await User.findOne({email},(err,result)=>{
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
                                const {id, firstName, lastName } = result
                                res.json({
                                    status   :"success",
                                    message  : "Welcome! you are successfully logged in. ",
                                    data     : {id, firstName, lastName}, 
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

    let userCheck= await User.findOne({email})

    if(userCheck){
        return res.json({status:"failed", message:"Sorry! this email is already registered with us"})
    }

    let hashedPass = await bcrypt.hash(pass, 10)
    if(!hashedPass) return res.status(501).json({status:"failed", message:"Technical Erro 501, Please contact support team!"})
    const newUser = new User({
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
    await User.findById(req.userId, (err, doc)=>{
        if(err) return res.json({status:"failed", message:"Unable to retrieve your data please try again"})
        const {firstName, lastName, email, address, paypalId, phoneNumber, profileImage} = doc 
        let profileData={
            firstName,
            lastName,
            email, 
            address, 
            paypalId, 
            phoneNumber, 
            profileImage
        }
        res.json({status:"success", message:"You have been authorized", data:profileData})
})
}
exports.changePassword =async(req,res)=>{
    const {pass, confirmPass, oldPass} = req.body.data

    if(pass!==confirmPass) return res.json({status:"failed", message:"Request Failed, Please check your inputs"})

    await User.findById(req.userId,(err,result)=>{
        if(err) return res.status(500).json({
            status:"failed",
            message:"Sorry, we are unable to process your request please try again"})
            
        if(!result) return res.json({
            status:"failed",
            message:"Authorization failed , please check your credentials"})

        bcrypt.compare(oldPass,result.pass)
                .then(async(isPassCorrect)=>{
                    if(!isPassCorrect) return res.json({status:"failed",message:"Authorization failed , please check your credentials"})                
                    if(isPassCorrect){
                        let hashedPass = await bcrypt.hash(pass, 10)
                        const profileData = {pass:hashedPass};
                        await User.findByIdAndUpdate(req.userId, profileData,async (err, doc)=>{
                            if(err) return res.json({status:"failed", message:err})
                            else {
                                
                                res.json({status:"success", message:"You have succesfully cahnged your password"})
                                    }
                                })
                            } 
                })
        })
}