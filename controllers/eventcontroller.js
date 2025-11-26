import EventModel from "../models/eventmodel.js";
import Follow from "../models/followmodel.js";
import Like from "../models/likemodel.js";

 function handleServerError(res, err, message = "Internal Server Error") {
  console.error(message, err?.message || err);
  return res.status(500).json({
    success: false,
    message: err?.message || message,
  });
}

export async function createEvent(req, res) {
  try {
    const { name, venue, description, time, ticketPrice, ticketAvailable } = req.body;
    const organizer = req.user?._id;

    // Basic required fields check
    if (
      !name?.trim() ||
      !venue?.trim() ||
      !description?.trim() ||
      !time ||
      ticketPrice === undefined ||
      ticketAvailable === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, venue, description, time, ticketPrice, ticketAvailable) are required",
      });
    }

    // Time validation
    const eventTime = new Date(time);
    if (Number.isNaN(eventTime.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid time format",
      });
    }

    const now = new Date();
    if (eventTime <= now) {
      return res.status(400).json({
        success: false,
        message: "Event time must be in the future",
      });
    }

    // ticketPrice validation
    const priceNum = Number(ticketPrice);
    if (!Number.isFinite(priceNum) || priceNum < 0) {
      return res.status(400).json({
        success: false,
        message: "ticketPrice must be a non-negative number",
      });
    }

    // ticketAvailable validation
    const ticketCount = Number(ticketAvailable);
    if (!Number.isInteger(ticketCount) || ticketCount <= 0) {
      return res.status(400).json({
        success: false,
        message: "ticketAvailable must be a positive integer",
      });
    }

    if (!organizer) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: organizer not found in request",
      });
    }

    const event = await EventModel.create({
      name: name.trim(),
      description: description.trim(),
      venue: venue.trim(),
      time: eventTime,
      ticketPrice: priceNum,
      ticketAvailable: ticketCount,
      organizer,
    });

    return res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: event,
    });
  } catch (err) {
    return handleServerError(res, err);
  }
}




export async function getEvents(req, res) {
  try {
    const {
      venue,
      minPrice,
      maxPrice,
      upcomingOnly,
      sortBy = "time",
      order = "asc",
    } = req.query;

    const filter = {};

    if (venue) {
      filter.venue = { $regex: venue, $options: "i" };
      // case-insensitive match regex is used for partial matching 
    }
    if (upcomingOnly === "true") {
      filter.time = { $gt: new Date() };
    }

    const priceFilter = {};
    if (minPrice !== undefined) priceFilter.$gte = Number(minPrice);
    if (maxPrice !== undefined) priceFilter.$lte = Number(maxPrice);
    if (Object.keys(priceFilter).length > 0) {
      filter.ticketPrice = priceFilter;
    }

    const sort = {};
    const sortOrder = order === "desc" ? -1 : 1;

    if (sortBy === "popularity") {
      sort.likeCount = sortOrder;
    } else if (sortBy === "time") {
      sort.time = sortOrder;
    } else {
      // default
      sort.time = 1;
    }

    const events = await EventModel.find(filter)
      .sort(sort)
      .populate("organizer", "name username");

    return res.status(200).json({
      success: true,
      data: events,
    });
  } catch (err) {
    return handleServerError(res, err);
  }
}



export async function mostLikedEvents(req, res) {
  try {
    const limit = Number.parseInt(req.query.limit, 10) || 5;

    const events = await EventModel.find()
      .sort({ likeCount: -1 })
      .limit(limit)
      .lean();

    return res.status(200).json({
      success: true,
      data: events,
    });
  } catch (err) {
    return handleServerError(res, err);
  }
}




export async function getEventfromFollowedUsers(req,res){

  try{
    const user=req.user
    //get followed users
    const followedUsers=await Follow.find({
      follower:user._id
    })
    const followedUserIds=followedUsers.map(follow=>follow.following)

    //get events from followed users
    const events=await EventModel.find({
      organizer:{
        $in:followedUserIds
      }
    }).populate('organizer','name email')
    return res.status(200).json({
      success:true,
      data:events
    })
  }
  catch(err){
    return res.status(500).json({
      success:false,
      message:err.message||"Internal Server Error"
    })
  }
  }





  export async function toggleLikeEvent(req, res) {
  try {
    const userId = req.user?._id;
    const { id: eventId } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const event = await EventModel.findById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    const existingLike = await Like.findOne({ user: userId, event: eventId });

    let message;
    let incValue;

    if (existingLike) {
      // unlike
      await existingLike.deleteOne();
      incValue = -1;
      message = "Event unliked successfully";
    } else {
      // like
      await Like.create({ user: userId, event: eventId });
      incValue = 1;
      message = "Event liked successfully";
    }

    // atomic increment on likeCount
    const updatedEvent = await EventModel.findByIdAndUpdate(
      eventId,
      { $inc: { likeCount: incValue } },
      { new: true }
    ).select("likeCount");

    return res.status(200).json({
      success: true,
      message,
      likeCount: updatedEvent?.likeCount ?? event.likeCount,
    });
  } catch (err) {
    return handleServerError(res, err);
  }
}





