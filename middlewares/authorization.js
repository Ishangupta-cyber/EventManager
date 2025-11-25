import jwt from "jsonwebtoken";
import UserModel from "../models/usermodel.js";

export async function authorizer(req, res, next) {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Token not provided",
      });
    }

    const data = jwt.verify(token, process.env.Secret);
    if (!data) {
      return res.status(403).json({
        status: false,
        message: "Invalid token",
      });
    }

    const authorid = data.id;
    const authoreduser = await UserModel.findById(authorid);

    if (!authoreduser) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    req.user = authoreduser;
    next();
  } 
  catch (err) {
    console.error("Authorization error:", err.message);
    return res.status(500).json({
      status: false,
      message: "Internal server error during authorization",
    });
  }
}