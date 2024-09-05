import {
  MeetingConsumer,
  Constants,
  MeetingProvider,
  useMeeting,
} from "@videosdk.live/react-sdk";
import { authToken } from "../API";
import React, { useEffect, useMemo, useRef } from "react";
import Hls from "hls.js";

const HLSPlayer = () => {
  const { hlsUrls, hlsState } = useMeeting();

  const playerRef = useRef(null);

  const hlsPlaybackHlsUrl = useMemo(() => hlsUrls.playbackHlsUrl, [hlsUrls]);

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls({
        capLevelToPlayerSize: true,
        maxLoadingDelay: 4,
        minAutoBitrate: 0,
        autoStartLoad: true,
        defaultAudioCodec: "mp4a.40.2",
      });

      let player = document.querySelector("#hlsPlayer");

      hls.loadSource(hlsPlaybackHlsUrl);
      hls.attachMedia(player);
    } else {
      if (typeof playerRef.current?.play === "function") {
        playerRef.current.src = hlsPlaybackHlsUrl;
        playerRef.current.play();
      }
    }
  }, [hlsPlaybackHlsUrl, hlsState]);

  return (
    <video
      ref={playerRef}
      id="hlsPlayer"
      autoPlay
      controls
      style={{ width: "70%", height: "70%" }}
      playsInline
      playing
      onError={(err) => console.log(err, "hls error")}
    ></video>
  );
};

const ViewerScreenContainer = ({ meetingId }) => {
  return (
    <MeetingProvider
      token={authToken}
      config={{ meetingId, name: "emrich", mode: "VIEWER" }}
      joinWithoutUserInteraction
    >
      <MeetingConsumer>
        {({ hlsState }) =>
          hlsState === Constants.hlsEvents.HLS_PLAYABLE ? (
            <HLSPlayer />
          ) : (
            <p> Waiting For Host to Start Stream </p>
          )
        }
      </MeetingConsumer>
    </MeetingProvider>
  );
};

export default ViewerScreenContainer;
