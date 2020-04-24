
const mongoose = require("mongoose");
const { Schema } = mongoose;

const ConversationSchema = new Schema({

  messages:{
    type: Array,
    required: true,
    items:{
      type:Object,
      properties:{
        senderId:{
          type:String,
          required:true
        },
        message:{
          type:String,
          required:true
        },
        timeStamp:{
          type : Date,
          default: Date.now 
        }
      }
    }
  },
  title:{
          type:String,
          required:true
  },
  recipentId:{
          type:String,
          required:true
        },
  senderId:{
          type:String,
          required:true
  },
  productId:{
          type:String,
          required:true
  },
  timeStamp:{
    type : Date,
    default:Date.now
  }
  
   
});

module.exports = mongoose.model("c2cconversations", ConversationSchema)
