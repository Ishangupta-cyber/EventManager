import express from "express"
import { createEvent, getEventfromFollowedUsers, getEvents, getlikedEvents, mostLikedEvents, toggleLikeEvent } from "../controllers/eventcontroller.js"
import { authorizer } from "../middlewares/authorization.js"

const EventRouter=express.Router()

EventRouter.post("/",authorizer,createEvent)

EventRouter.get("/",getEvents)



EventRouter.get("/most-liked",authorizer,mostLikedEvents)

EventRouter.get("/feed",authorizer,getEventfromFollowedUsers)

EventRouter.patch("/:id/like",authorizer,toggleLikeEvent)

export default EventRouter
