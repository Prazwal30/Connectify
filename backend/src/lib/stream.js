import { StreamChat } from "stream-chat";
import dotenv from "dotenv";
dotenv.config();
const apiKey =
    process.env.STREAM_API_KEY ||
    process.env.STEAM_API_KEY ||
    process.env.Streamchat_API_KEY;
const apiSecret =
    process.env.STREAM_API_SECRET ||
    process.env.STEAM_API_SECRET ||
    process.env.Streamchat_API_SECRET;
if(!apiKey||!apiSecret){
    console.error("stream chat api key or secret is missing in .env file");
} 
const serverClient=StreamChat.getInstance(apiKey,apiSecret);
export const upsertStreamUser=async (userdata) => {
        try{
            await serverClient.upsertUser(userdata);
            return userdata;
        } catch (error) {
            console.error("Error upserting stream user:", error);
            
        }
}
export const  generateStreamToken=(userId)=>{
try{
const userIdStr=userId.toString();
return serverClient.createToken(userIdStr); 
}catch(error){
console.error("Error generating stream token:", error);
throw error;
}


}
