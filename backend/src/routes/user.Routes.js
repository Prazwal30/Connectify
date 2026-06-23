import express from"express";
import{protctRoute}from"../middleware/auth.middleware.js";
import{getRecommendedUsers,getMFriends}from"../Controlers/user.controllers.js";
import {sendFriendRequest}from"../Controlers/friend.controllers.js";
import { getFriendRequests } from "../Controlers/user.controllers.js";
import { getOutgoingFriendRequests } from "../Controlers/user.controllers.js";

const router=express.Router();
router.get("/",getRecommendedUsers);
router.get("/friends",getMyFriends);

router.post("/friends-request/:id",sendFriendRequest);
router.put("/friend-request/:id/accept",acceptFriendRequest);

router.get("/friend-requests",getFriendRequests);
router.get("/outgoing-friend-requests",getOutgoingFriendRequests);



export default router;