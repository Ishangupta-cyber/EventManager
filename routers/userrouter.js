import express from "express"
import { followUser, getlikedEvents, LoginUser, SignUpUser, unfollowUser } from "../controllers/usercontroller.js"
import { authorizer } from "../middlewares/authorization.js"

const userRouter =express.Router()

userRouter.post("/signup",SignUpUser)
userRouter.post("/login",LoginUser)

userRouter.post("/:id/follow",authorizer,followUser)
userRouter.post("/:id/unfollow",authorizer,unfollowUser)

userRouter.get("/like/events",authorizer,getlikedEvents)
export default userRouter