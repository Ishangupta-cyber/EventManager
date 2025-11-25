import express from "express"

import { authorizer } from "../middlewares/authorization.js"
import { BuyTicket, DeleteTickets } from "../controllers/ticketscontroller.js"

const TicketRouter=express.Router()

TicketRouter.post("/event/:id/ticket",authorizer,BuyTicket)
TicketRouter.delete("/event/:id/ticket",authorizer,DeleteTickets)

export default TicketRouter
