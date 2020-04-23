const mongoose = require("mongoose")

const productSchema= new mongoose.Schema({

    title:{
        type:String
    },
    category:{
        type:Number
    },
    condition:{
        type:Number
    },
    quantity:{
        type:Number
    },
    color:{
        type:Number
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
    active:{
        type:Boolean
    },
    sold:{
        type:Boolean
    },
    blocked:{
        type:Boolean
    },
    priceRange:{
        type:Number
    },
    images:{
        type:Array
    },
    watching:{
        type:Array
    }
})
module.exports = mongoose.model("products", productSchema)