import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  acceptFriendRequest,
  getFriendRequests,
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../Controlers/user.controllers.js";

const router = express.Router();

router.get("/friends", protectRoute, getUserFriends);
router.get("/recommended", protectRoute, getRecommendedUsers);
router.get("/friend-requests", protectRoute, getFriendRequests);
router.get("/friend-requests/outgoing", protectRoute, getOutgoingFriendReqs);
router.post("/friend-request/:recipientId", protectRoute, sendFriendRequest);
router.put("/friend-request/:requestId/accept", protectRoute, acceptFriendRequest);

export default router;
