import mongoose from "mongoose"

const followSchema=new mongoose.Schema({
  follower:{
    type:mongoose.Schema.ObjectId,
    ref:"users",
    required:true
  },
  following:{
    type:mongoose.Schema.ObjectId,
    ref:"users",
    required:true
  }
})

const Follow=mongoose.model("Follow",followSchema)
export default Follow