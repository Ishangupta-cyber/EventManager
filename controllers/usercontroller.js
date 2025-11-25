import  jwt  from "jsonwebtoken"
import bcrypt from "bcrypt"
import UserModel from "../models/usermodel.js"
import Like from "../models/likemodel.js"
import Follow from "../models/followmodel.js"

export async function SignUpUser(req,res){
  try{
    const data=req.body

    if(!data?.username?.trim() || !data?.password?.trim() || !data?.name?.trim()){
      return res.status(400).json({
        success: false,
        message:"All fields are required"
      })
    }

    const hashedPassword=await bcrypt.hash(data.password.trim(),10)

    const createdUser=await UserModel.create({
      name:data.name.trim(),
      username:data.username.trim(),
      password:hashedPassword
    })

    const token =jwt.sign({id:createdUser._id},process.env.Secret)


    res.cookie("token",token).json({
      success:true,
      data:createdUser,
      token:token
    })
  }

  catch(err){
    res.status(500).json({
      success:false,
      message:err.message|| "Something Went Wrong"
    })

  }
}

export async function LoginUser(req, res) {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        status: false,
        message: "Username and password are required",
      });
    }

    // Find user by username
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    // Compare password
    const isTrue = await bcrypt.compare(password, user.password);
    if (!isTrue) {
      return res.status(401).json({
        status: false,
        message: "Incorrect password",
      });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.Secret);

    
    return res.cookie("token",token).status(200).json({
      status: true,
      token:token,
      message: "Login successful",
    });

  } 
  catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
}
//follow user function to be added here
export async function followUser(req,res){
  try{
    const user=req.user
    const userIdToFollow=req.params.id
    //logic to follow user
    const userToFollow=await UserModel.findById(userIdToFollow)
    if(!userToFollow){
      return res.status(404).json({
        success:false,
        message:"User to follow not found"
      })
    }
    //check if already following
    const alreadyFollowing=await Follow.findOne({
      follower:user._id,
      following:userIdToFollow
    })
    if(alreadyFollowing){
      return res.status(400).json({
        success:false,
        message:"Already following this user"
      })
    }
    const newFollow=await Follow.create({
      follower:user._id,
      following:userIdToFollow
    })

    return res.status(200).json({
      success:true,
      data:newFollow,
      message:`You are now following ${userToFollow.username}`
    })
  }


  catch(err){
    return res.status(500).json({
      success:false,
      message:err.message||"Internal Server Error"
    })
  }
}
export async function unfollowUser(req,res){
  try{
    const user=req.user
    const userIdToUnfollow=req.params.id
    //logic to unfollow user
    const userToUnfollow=await UserModel.findById(userIdToUnfollow)
    if(!userToUnfollow){
      return res.status(404).json({
        success:false,
        message:"User to unfollow not found"
      })
    }
    //check if already following
    const alreadyFollowing=await Follow.findOne({
      follower:user._id,
      following:userIdToUnfollow
    })
    if(!alreadyFollowing){
      return res.status(400).json({
        success:false,
        message:"You are not following this user"
      })
    }
    await alreadyFollowing.deleteOne()

    return res.status(200).json({
      success:true,
      message:`You have unfollowed ${userToUnfollow.username}`
    })
  }
  catch(err){
    return res.status(500).json({
      success:false,
      message:err.message||"Internal Server Error"
    })
  }
}



