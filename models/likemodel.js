import mongoose from "mongoose"

const likeSchema=new mongoose.Schema({

  user:{
    type:mongoose.Schema.ObjectId,
    ref:"users"
  },
  event:{
    type:mongoose.Schema.ObjectId,
    ref:"event"
  }


  
})

const Like=mongoose.model("Like",likeSchema)

export default Like