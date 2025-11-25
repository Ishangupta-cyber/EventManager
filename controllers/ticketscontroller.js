import EventModel from "../models/eventmodel.js";
import TicketModel from "../models/ticketmodel.js";

export async function BuyTicket(req,res){

    try {
        const eventId=req.params.id;
        const buyer=req.user;
        const name=req.body.name;

        const event = await EventModel.findById(eventId);

        if (!event) {
            return res.status(404).send("Event not found");
        }

        const now=new Date()
        const eventTime=new Date(event.time)

        if(eventTime<=now){
          return res.status(400).send("Event has already occurred");
        }

        if (event.ticketAvailable < 1) {
            return res.status(400).send("No tickets available");
        }


        await event.updateOne({                                                     
          ticketAvailable : event.ticketAvailable - 1
        })

        const ticket=await TicketModel.create({
          event :eventId,
          name: name,
          buyer:buyer
        })


        res.status(200).json({
          status: true,
          message: "Ticket purchased successfully",
          data: ticket
        })
    } 
    
    catch (error) {
        res.status(500).json({
          status: false,
          message:`Internal Server Error: ${error.message}`

        })
    }


}

export async function DeleteTickets(req,res){
  try{
    const user=req.user
    const ticket_id=req.params.id
    
    const ticket= await TicketModel.findById(ticket_id).populate('event')

    if(!ticket){
      return res.status(404).json({
        status:false,
        message:"Ticket not found"
      })
    }

    if(user._id==ticket.buyer.toString() || user._id.toSting()==ticket.event.organizer){
      await TicketModel.findByIdAndDelete(ticket_id)
      //update ticket available count in event model
      await EventModel.findByIdAndUpdate(ticket.event._id,{
        $inc:{ticketAvailable:1}
      })
      return res.status(200).json({
        status:true,
        message:"Ticket deleted successfully"
      })
    }
    return res.status(403).json({
      status:false,
      message:"You are not authorized to delete this ticket"
    })
  }

  catch(err){
    res.status(500).json({
      status:false,
      message:"Internal Server Error"
    })
  }
}