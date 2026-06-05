import { axiosInstance } from "./axios.js";

export const signin= async (signindata) =>
{
    const response=await axiosInstance.post("/auth/signin",signindata);
    return response.data;
};
export const login= async (loginData) =>
{
    const response=await axiosInstance.post("/auth/login",loginData);
    return response.data;
};
export const logout= async () =>
{
    const response=await axiosInstance.post("/auth/logout");
    return response.data;
};

export const getAuthUser=async () => {
    try{
    const res = await axiosInstance.get("/auth/me");  
    return res.data;
  } catch (error) {
    console.error("Error fetching auth user:", error);
  return null;
  }
};

export const completeOnboarding=async    (userdata)=> {
const response =await axiosInstance.post("/auth/onboarding",userdata);
return response.data;
};

export async function getUserFriends(){
    const response=await axiosInstance.get("/users/friends");
    return response.data;
}
export async function getRecommendedUsers(){
    const response=await axiosInstance.get("/users");
    return response.data;
}
export async function outgoingFriendReqs(){
    const response=await axiosInstance.get("/users/outgoing-friend-requests");
    return response.data; 
}
export async function sendFriendRequest(userId){
    const response=await axiosInstance.post(`/users/friends-request/${userId}`);
    return response.data; 
}
export async function getFriendRequests(){
    const response=await axiosInstance.get("/users/friend-requests");
    return response.data; 
}
export async function acceptFriendRequest(requestId){
    const response=await axiosInstance.put("/users/friend-request");
    return response.data; 
}
export async function getStreamToken(){
    const response=await axiosInstance.get("/chat/token");
    return response.data;
}
