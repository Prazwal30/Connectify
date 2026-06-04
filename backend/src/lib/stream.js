import { StreamChat } from "stream-chat";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.STREAM_API_KEY || process.env.STEAM_API_KEY || process.env.Streamchat_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET || process.env.STEAM_API_SECRET || process.env.Streamchat_API_SECRET;

if (!apiKey || !apiSecret) {
    console.error("stream chat api key or secret is missing in .env file");
}

const serverClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
    await serverClient.upsertUser(userData);
    return userData;
};

export const generateStreamToken = (userId) => {
    return serverClient.createToken(userId.toString());
};
