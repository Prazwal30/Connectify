import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAuthUser from "../hooks/useAuthuser.js";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api.js";

import {
  Channel,
  ChannelHeader,
  Chat,
  MessageComposer,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";
import ChatLoader from "../components/ChatLoader.jsx";
import CallButton from "../components/CallButton.jsx";

const STREAM_API_KEY=import.meta.env.VITE_STREAM_API_KEY;
const ChatPage = () => {
const {id:targetUserId}=useParams()

const [chatClient,setChatClient]=useState(null);
const [channel,setChannel]=useState(null);
const [loading,setLoading]=useState(true);

const { authUser }=useAuthUser()

const {data:tokenData,isLoading:isTokenLoading,error:tokenError}=useQuery({
  queryKey:["streamToken"],
  queryFn:getStreamToken,
  enabled:!!authUser,
});
useEffect(()=>{
  const initChat=async()  =>{
    if(!authUser || isTokenLoading) return;
    if(!targetUserId || tokenError || !tokenData?.token) {
      setLoading(false);
      return;
    }
    try{
      console.log("Initializing chat client...");

      const client=StreamChat.getInstance(STREAM_API_KEY);
      await client.connectUser({
        id:authUser._id,
        name:authUser.fullName,
        image:authUser.profilepic,
      },tokenData.token)
      const channelId =[authUser._id,targetUserId].sort().join("-");


const currChannel=client.channel("messaging",channelId,{
  members:[authUser._id,targetUserId],
});
await currChannel.watch();

setChatClient(client);
setChannel(currChannel);

    }catch(error){
      console.error("Error initializing chat client:", error);
      toast.error("Failed to initialize chat. Please try again later.");
    }finally{
      setLoading(false);
    }
  };
  initChat();
},[tokenData,authUser,targetUserId,isTokenLoading,tokenError ]);
const handleVideoCall=()=>{
  if(channel){
    const callUrl=`${window.location.origin}/call?channelId=${channel.id}`;

    channel.sendMessage({
      text:`Video call initiated. Click to join: ${callUrl}`,
    })
    toast.success("Video call link sent in chat!");
  }
}
if(loading) return <ChatLoader/>;
if(!targetUserId) return <div className="p-6">No chat selected.</div>;
if(tokenError || !chatClient || !channel) return <div className="p-6">Unable to load chat. Please try again.</div>;
return (
  <div className="h-[calc(100vh-4rem)] bg-white">
    <Chat client={chatClient}>
      <Channel channel={channel}>
        <div className="w-full h-full relative">
          <CallButton handleVideoCall={handleVideoCall}/>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageComposer />
          </Window>
          <Thread />
        </div>
      </Channel>
    </Chat>
  </div>
);
};
export default ChatPage;
