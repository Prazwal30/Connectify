import { axiosInstance } from "./axios.js";

export const signin = async (signinData) => {
  const response = await axiosInstance.post("/auth/signin", signinData);
  return response.data;
};

export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

export const completeOnboarding = async (userData) => {
  const response = await axiosInstance.post("/auth/onboarding", userData);
  return response.data;
};

export const getUserFriends = async () => {
  const response = await axiosInstance.get("/user/friends");
  return response.data;
};

export const getRecommendedUsers = async () => {
  const response = await axiosInstance.get("/user/recommended");
  return response.data;
};

export const getOutgoingFriendReqs = async () => {
  const response = await axiosInstance.get("/user/friend-requests/outgoing");
  return response.data;
};

export const getFriendRequests = async () => {
  const response = await axiosInstance.get("/user/friend-requests");
  return response.data;
};

export const sendFriendRequest = async (recipientId) => {
  const response = await axiosInstance.post(`/user/friend-request/${recipientId}`);
  return response.data;
};

export const acceptFriendRequest = async (requestId) => {
  const response = await axiosInstance.put(`/user/friend-request/${requestId}/accept`);
  return response.data;
};

export const getStreamToken = async () => {
  const response = await axiosInstance.get("/chat/token");
  return response.data;
};
