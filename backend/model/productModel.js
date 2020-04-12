const mongoose = require("mongoose")

const productSchema= new mongoose.Schema({

    title:{
        type:String
    },
    category:{
        type:Number
    },
    condition:{
        type:String
    },
    quantity:{
        type:Number
    },
    color:{
        type:String
    },
    price:{
        type:Number
    },
    description:{
        type:String
    },
    creator:{
        type:String
    },
    views:{
        type:Number
    },
    status:{
        type:Boolean
    },
    sold:{
        type:Boolean
    },
    images:{
        type:Array
    }
})
module.exports = mongoose.model("products", productSchema)