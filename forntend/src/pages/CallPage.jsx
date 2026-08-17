import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import useAuthUser from "../hooks/useAuthuser.js";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api.js";

import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import toast from "react-hot-toast";
import PageLoader from "../components/PageLoader";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const CallPage = () => {
  const [searchParams] = useSearchParams();
  const { id: routeCallId } = useParams();
  const callId = routeCallId || searchParams.get("channelId");
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);

  const { authUser, isLoading } = useAuthUser();

  const { data: tokenData, isLoading: isTokenLoading, error: tokenError } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    let videoClient;
    let callInstance;
    let isMounted = true;

    const initCall = async () => {
      if (!authUser || isTokenLoading) return;
      if (!STREAM_API_KEY || !callId || tokenError || !tokenData?.token) {
        setIsConnecting(false);
        return;
      }

      try {
        console.log("Initializing Stream video client...");

        const user = {
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilepic,
        };

        videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user,
          token: tokenData.token,
        });

        callInstance = videoClient.call("default", callId);

        await callInstance.join({ create: true });

        console.log("Joined call successfully");

        if (isMounted) {
          setClient(videoClient);
          setCall(callInstance);
        }
      } catch (error) {
        console.error("Error joining call:", error);
        toast.error("Could not join the call. Please try again.");
      } finally {
        if (isMounted) setIsConnecting(false);
      }
    };

    initCall();

    return () => {
      isMounted = false;
      if (callInstance) void callInstance.leave();
      if (videoClient) void videoClient.disconnectUser();
    };
  }, [tokenData, authUser, callId, isTokenLoading, tokenError]);

  if (isLoading || isConnecting) return <PageLoader />;

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="relative">
        {client && call ? (
          <StreamVideo client={client}>
            <StreamCall call={call}>
              <CallContent />
            </StreamCall>
          </StreamVideo>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p>Could not initialize call. Please refresh or try again later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const CallContent = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  const navigate = useNavigate();

  useEffect(() => {
    if (callingState === CallingState.LEFT) navigate("/", { replace: true });
  }, [callingState, navigate]);

  return (
    <StreamTheme>
      <SpeakerLayout />
      <CallControls />
    </StreamTheme>
  );
};

export default CallPage;
