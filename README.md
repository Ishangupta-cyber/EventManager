📌 Event Management API (Node.js + Express + MongoDB)

A production-ready backend service for managing events, likes, and ticket bookings — built with Node.js, Express.js, and MongoDB.
Provides secure authentication, atomic updates, and clean REST API architecture, with ready-to-use deployment + API documentation.

🚀 Overview

The Event Management API enables:

User registration & authentication (JWT in HTTP-only cookies)

Event creation & listing

Liking/unliking events with atomic likeCount updates

Buying & cancelling event tickets

Retrieving most-liked events & user-liked events

Clean, well-structured REST API endpoints

This backend is built using professional MVC structure and includes input validation, proper status codes, and optimizations suited for real-world systems.

🎯 Problem Solved

Small event organizers struggle with:

Managing event details

Tracking ticket availability

Handling event popularity

Providing secure access

This API solves these issues by offering:

✔ Secure authenticated event creation
✔ Real-time ticket booking logic
✔ Simple popularity metrics (likeCount)
✔ User interest tracking
✔ Modular backend ready for frontend integration

🏗 Tech Stack
Layer	Technology
Language	JavaScript (Node.js)
Framework	Express.js
Database	MongoDB + Mongoose
Auth	JWT (HTTP-only Cookie)
Security	bcrypt password hashing
Deployment	Render / Railway / Fly.io
Docs	Postman Collection / Swagger UI
📂 Project Structure
EventManagement/
│── controllers/
│── middlewares/
│── models/
│── routers/
│── statuscode/
│── index.js
│── package.json
│── .env

🔐 Authentication Flow

Users sign up → password hashed using bcrypt

Users log in → server sets a JWT in an HTTP-only cookie

Protected endpoints use middleware to:

Verify token

Load user

Block unauthorized access

📘 API Documentation

You can access complete API docs via:

Postman Public Workspace

(Add your workspace URL here)

Swagger UI (Optional)

Add Swagger using /api-docs route if integrated.

📡 API Endpoints

Base URL (Local):

http://localhost:3000

👤 User Routes (/user)
1. Sign Up

POST /user/signup

Request

{
  "name": "Ishan",
  "username": "ishan123",
  "password": "pass123"
}


Response (201)

{
  "success": true,
  "message": "User created successfully"
}

2. Login

POST /user/login

Response

{
  "success": true,
  "message": "Login successful"
}


JWT token is returned inside an HTTP-only cookie.

3. Get User's Liked Events

GET /user/likes (protected)
Returns all events liked by the logged-in user.

🎟 Event Routes (/event)
1. Create Event

POST /event (protected)

Request

{
  "name": "Tech Summit",
  "description": "Tech event",
  "venue": "Delhi",
  "time": "2025-05-12T12:00:00.000Z",
  "ticketPrice": 500,
  "ticketAvailable": 100
}

2. Get Events

GET /event

Supports filtering:

?venue=delhi  
?minPrice=100  
?maxPrice=1000  
?upcomingOnly=true  
?sortBy=time|popularity  

3. Like / Unlike Event

POST /event/:id/like

Toggles like status & updates likeCount atomically.

4. Check if User Has Liked

GET /event/:id/user-liked

5. Most Liked Events

GET /event/most-liked?limit=5

🎫 Ticket Routes
1. Buy Ticket

POST /event/:id/ticket

Request

{
  "name": "Ishan"
}


Response

{
  "status": true,
  "message": "Ticket purchased successfully"
}

2. Cancel Ticket

DELETE /event/:id/ticket

🗄 Database Models
User
{
  name: String,
  username: String,
  password: String
}

Event
{
  name: String,
  description: String,
  venue: String,
  time: Date,
  ticketPrice: Number,
  ticketAvailable: Number,
  organizer: ObjectId,
  likeCount: Number
}

Like
{
  user: ObjectId,
  event: ObjectId
}

Ticket
{
  event: ObjectId,
  name: String,
  buyer: ObjectId
}

🚀 Deployment (Render Example)

Push code to GitHub

Create new Web Service on Render

Add environment variables:

Database_URL=
Secret=
PORT=3000


Set Start Command:

node index.js


Once deployed, replace local URL with deployed URL in Postman.

🛠 How APIs Are Designed

✔ Clean REST patterns
✔ Predictable URLs
✔ Clear controller separation
✔ Middleware-based auth
✔ Input validation and detailed error responses
✔ Atomic updates for performance ($inc for likes & tickets)

🔒 Security Measures

bcrypt password hashing

JWT + HTTP-only cookies

Token validation middleware

Centralized error handler

Input validation on all routes

No sensitive data in responses

📈 Optimizations

Atomic updates instead of expensive DB queries

likeCount stored directly → no aggregation needed

Lean queries for faster responses

Optional filters for event listing

Future-ready structure for search, pagination, and indexing

🌟 Future Enhancements

Role-based access (Organizers vs Attendees)

Ticket QR generation

Event categories & search

Pagination

Email notifications

🙌 Author

Ishan Gupta
Backend Developer
Open to collaboration & improvements!