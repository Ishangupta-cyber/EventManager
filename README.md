📌 Event Management API (Node.js + Express + MongoDB)

A production-ready backend service for managing events, likes, and ticket bookings — built with Node.js, Express.js, and MongoDB.
Provides secure authentication, atomic updates, and clean REST API architecture, with ready-to-use deployment + API documentation (Swagger UI + Postman).

🚀 Overview

The Event Management API enables:

User registration & authentication (JWT in HTTP-only cookies)

Event creation & listing

Liking / unliking events with atomic likeCount updates

Buying & cancelling event tickets

Retrieving most-liked events & user-liked events

Clean, well-structured REST API endpoints

Built using a professional MVC architecture with input validation, proper status codes, and scalable backend design.

🎯 Problem Solved

Small event organizers face challenges with:

Managing event details

Tracking ticket availability

Handling event popularity

Managing secure access

This API solves these issues with:

✔ Secure authenticated event creation
✔ Real-time ticket booking system
✔ Popularity metric using likeCount
✔ User interest tracking
✔ Modular, scalable backend ready for frontend integration

🏗 Tech Stack
Layer	Technology
Language	JavaScript (Node.js)
Framework	Express.js
Database	MongoDB + Mongoose
Auth	JWT (HTTP-only Cookie)
Security	bcrypt password hashing
Deployment	Render / Railway / Fly.io
API Docs	Swagger UI + Postman
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
│── openapi.yaml  ← Swagger API Schema

🔐 Authentication Flow

Passwords hashed using bcrypt

JWT generated on login & stored in HTTP-only cookie

Authorization middleware:

Reads token

Verifies JWT

Loads authenticated user

Blocks unauthorized access

📘 API Documentation
✅ Swagger UI (Live API Docs)

Your deployed Swagger UI is available at:

👉 https://eventmanager-2-upuo.onrender.com/api-docs

This interactive documentation allows you to:

Explore all APIs

Test endpoints live

View request & response schemas

Understand all params, headers & cookies

Swagger powered by openapi.yaml, included in repo.

🧪 Postman Public Workspace

(Add your Postman workspace URL here)

🌐 Live Base URL (Render Deployment)

Your backend is deployed at:

👉 https://eventmanager-2-upuo.onrender.com

Use this as your base URL for frontend or API testing.

📡 API Endpoints
USER ROUTES (/user)

(Complete list remains same as before — unchanged)

EVENT ROUTES (/event)

(Complete list remains same as before — unchanged)

TICKET ROUTES (/event/:id/ticket)

(Complete list remains same as before — unchanged)

🗄 Database Models

User, Event, Like & Ticket models remain exactly as described above.

🚀 Render Deployment Steps (Already Done)

This project is deployed on Render, using:

Start Command: node index.js

Environment Variables:

Database_URL=
Secret=
PORT=10000 (Assigned by Render automatically)


Render automatically builds the project and hosts:

The backend

Swagger UI at /api-docs

📘 Swagger Integration Explanation

This project includes full Swagger integration:

openapi.yaml created with all endpoints

Loaded using:

import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const swaggerDocument = YAML.load("./openapi.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


Accessible on both local and Render deployment.

🛠 How APIs Are Designed

✔ Clean REST structure
✔ Modular controller architecture
✔ Middleware-based auth
✔ Standard HTTP responses
✔ Atomic MongoDB updates ($inc)
✔ Reusable validation patterns
✔ Scalable for pagination & indexing

🔒 Security Measures

bcrypt hashed passwords

JWT + HTTP-only cookies

Authorization middleware

Central error handler

Input validation

No sensitive fields returned in API responses

📈 Optimizations

Atomic DB updates for likes & tickets

likeCount stored directly (no aggregation needed)

Lean queries for faster responses

Efficient filters & sorting on event list

Future-ready structure (pagination, search, indexing)

🙌 Author

Ishan Gupta
Backend Developer
Open to collaboration & improvements!