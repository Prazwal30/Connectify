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

router.use(protectRoute);

router.get("/recommended", getRecommendedUsers);
router.get("/friends", getUserFriends);

router.post("/friend-request/:recipientId", sendFriendRequest);
router.put("/friend-request/:requestId/accept", acceptFriendRequest);

router.get("/friend-requests", getFriendRequests);
router.get("/friend-requests/outgoing", getOutgoingFriendReqs);

export default router;
