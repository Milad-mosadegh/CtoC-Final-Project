const user= require("../model/userModel")

exports.signin=async (req,res)=>{

    console.log(req.body.data);
    const {email, pass} = req.body.data;
    await user.findOne({email},(err,doc)=>{
        if(err) return console.log(err)
            
        if(!doc) return res.status(404).send({status:"failed", message:"username or password is wrong"})
                
        if (doc.pass!== pass)return res.status(404).send({status:"failed", message:"username or password is wrong"})
            else res.status(200).send({status:"success", data:{
                                                                firstName:doc.firstName,
                                                                lastName:doc.lastName,
                                                                email:doc.email
                                                            }})
                    })
            }
            
exports.signup=async (req,res)=>{

    const {firstName,lastName,email,pass} = req.body.data
    const newUser = new user({
                firstName,
                lastName,
                email,
                pass,   
                confirmed:true
            });
    await newUser.save((err, doc)=>{
                if(err) res.json({status: "failed", message:err})
                    else {
                    res.json({status:"success", message:"you have successfull did it", user:doc})
                    }
            })
    }



    
