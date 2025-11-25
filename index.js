import dotenv from "dotenv"
import express from 'express';
import mongoose from 'mongoose';
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import userRouter from './routers/userrouter.js';
import cookieParser from "cookie-parser";
import EventRouter from "./routers/eventRouter.js";
import TicketRouter from "./routers/ticketRouter.js";
dotenv.config()

const app = express()

app.use(cookieParser()) //middleware to parse cookies from incoming requests . It will convert the cookies into an object from string format and attach it to req.cookies. As earlier cookies are sent as string in HTTP headers.
app.use(express.json())

app.use("/user",userRouter)
app.use("/event",EventRouter)
app.use("/",TicketRouter)



const swaggerDocument = YAML.load("./openapi.yaml");
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerDocument))

mongoose.connect(process.env.Database_URL).then(()=>{
app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
})


// $inc parameter validation in create event controller for ticketprice and ticketavailable to be non negative numbers


// 401 - Token not provided
// 403 - Invalid token (unauthorized access)
// 404 - User not found
// 500 - Internal server error during authorization



