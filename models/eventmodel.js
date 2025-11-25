import mongoose from 'mongoose';

const eventSchema=new mongoose.Schema({
  name:{
    type : String,
    minlength: 3,
    required : true,
  },                                         //ticket---->      //event(event),name
  description:{
    type : String,                           //event---->     //name , desc, venue, time , ticketprice, ticketavailable, organizer(ref to user)
    minlength: 10,
    required : true,

  },
  venue:{
    type : String,
    minlength: 3,
    required : true,
  },
  time:{
    type : Date,
    required : true,
  },
  ticketPrice:{
    type : Number,
    min: 0,
    
  },
  ticketAvailable:{
    type : Number,
    min: 0,
    required : true,
  },
  organizer:{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'users',
    required : true,
  },
  likeCount:{
    type:Number,
    min:0,
    default:0
  }
})

const EventModel=mongoose.model('event',eventSchema);

export default EventModel;