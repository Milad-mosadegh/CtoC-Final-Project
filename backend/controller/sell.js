exports.submitAdd = async (req, res) => {

    console.log(req.body.data);
    //const {email, pass} = req.body.data;
    res.send({ status: "success", message: "you posted an add successfully" })

}