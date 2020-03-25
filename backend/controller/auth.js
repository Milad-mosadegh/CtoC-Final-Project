exports.signin=(req,res)=>{

    console.log(req.body.data);
    res.send({status:"success", message:"you reached login route"})
}