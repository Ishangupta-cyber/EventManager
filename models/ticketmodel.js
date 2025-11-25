import mongoose from 'mongoose';

const ticketSchema=new mongoose.Schema({
  event:{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'event',
    required : true,
  },
  name:{                                                    
    type : String,
    minlen: 3,
    required : true,
  },
  buyer:{
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'user'
  }

})

const TicketModel=mongoose.model('ticket',ticketSchema);

export default TicketModel;