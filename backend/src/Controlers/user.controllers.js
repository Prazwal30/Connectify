import FriendRequest from "../models/FriendRequest.js";
import User from "../models/user.js";

const userFields = "fullName profilepic bio nativeLanguage learningLanguage location friends";

export async function getUserFriends(req, res) {
  try {
    const user = await User.findById(req.user._id).populate("friends", userFields);
    res.status(200).json(user?.friends || []);
  } catch (error) {
    console.error("Error in getUserFriends:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getRecommendedUsers(req, res) {
  try {
    const currentUser = req.user;
    const excludedUsers = [currentUser._id, ...(currentUser.friends || [])];

    const recommendedUsers = await User.find({
      _id: { $nin: excludedUsers },
      isOnboarded: true,
    }).select(userFields);

    res.status(200).json(recommendedUsers);
  } catch (error) {
    console.error("Error in getRecommendedUsers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getOutgoingFriendReqs(req, res) {
  try {
    const requests = await FriendRequest.find({
      sender: req.user._id,
      status: "pending",
    }).populate("recipient", userFields);

    res.status(200).json(requests);
  } catch (error) {
    console.error("Error in getOutgoingFriendReqs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getFriendRequests(req, res) {
  try {
    const incomingRequests = await FriendRequest.find({
      recipient: req.user._id,
      status: "pending",
    }).populate("sender", userFields);

    const acceptedRequests = await FriendRequest.find({
      sender: req.user._id,
      status: "accepted",
    }).populate("recipient", userFields);

    res.status(200).json({ incomingRequests, acceptedRequests });
  } catch (error) {
    console.error("Error in getFriendRequests:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function sendFriendRequest(req, res) {
  try {
    const { recipientId } = req.params;

    if (recipientId === req.user._id.toString()) {
      return res.status(400).json({ message: "You cannot send a request to yourself" });
    }

    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.user.friends.includes(recipientId)) {
      return res.status(400).json({ message: "User is already your friend" });
    }

    const existingRequest = await FriendRequest.findOne({
      sender: req.user._id,
      recipient: recipientId,
    });

    if (existingRequest) {
      return res.status(400).json({ message: "Friend request already sent" });
    }

    const request = await FriendRequest.create({
      sender: req.user._id,
      recipient: recipientId,
    });

    res.status(201).json(request);
  } catch (error) {
    console.error("Error in sendFriendRequest:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function acceptFriendRequest(req, res) {
  try {
    const { requestId } = req.params;

    const request = await FriendRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    if (request.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You cannot accept this request" });
    }

    request.status = "accepted";
    await request.save();

    await User.findByIdAndUpdate(request.sender, {
      $addToSet: { friends: request.recipient },
    });
    await User.findByIdAndUpdate(request.recipient, {
      $addToSet: { friends: request.sender },
    });

    res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    console.error("Error in acceptFriendRequest:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
