import mongoose from 'mongoose';

const userSchema=new mongoose.Schema({
  name:{
    type : String,
    minlength: 3,
    required : true,                       
  },
  username:{
    type : String,
    minlength: 3,
    required : true,
    unique : true,//this is databse level constraint which makes sure no two usernames are same in the database
  },
  password:{
    type : String,
    minlength: 6,
    required : true,
    
  },
  isDeleted:{
    type:Boolean,
    default:false,
  }
})


const UserModel=mongoose.model('users',userSchema);

export default UserModel;