"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlayIcon, PauseIcon, SpeakerLoudIcon, SpeakerOffIcon } from "@radix-ui/react-icons";
import { Progress } from "@/components/ui/progress";

const VideoPlayer = ({ video, publicUrl }) => {
  const [isPaused, setIsPaused] = useState(true);
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();  // Reload the video when the source changes
    }
  }, [video]);

  const togglePlayPause = () => {
    if (videoRef.current) {
      setIsPaused(!isPaused);
      isPaused ? videoRef.current.play() : videoRef.current.pause();
    }
  };

  const updateTime = () => {
    if (videoRef.current) {
      setCurrentVideoTime(videoRef.current.currentTime);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      setIsMuted(!isMuted);
      videoRef.current.muted = !videoRef.current.muted;
    }
  };

  return (
    <div className="max-w-lg relative">
      
      <video
        className="w-full rounded"
        ref={videoRef}
        loop
        muted={isMuted}
        onTimeUpdate={updateTime}
        
      >
        <source src={publicUrl} type="video/mp4" />
      </video>
      <div className="absolute bottom-0 h-full w-full flex items-end justify-center">
        <Progress
          className="bg-grey-950/[0.5] m-1"
          value={(currentVideoTime / (videoRef.current?.duration || 1)) * 100}
        />
      </div>
      {/* <div className="absolute bottom-0 h-full w-full flex items-center justify-center"> */}
      <div className="absolute top-0 left-0 flex justify-end">
        <Button
           className="bg-gray-950/[.1] m-2 stroke-white hover:bg-gray-950/[.25]"
          variant="ghost"
          size="icon"
          onClick={togglePlayPause}
        >
          {isPaused ? <PlayIcon /> : <PauseIcon />}
        </Button>
      </div>
      <div className="absolute top-0 right-0 flex justify-end">
        <Button
          className="bg-gray-950/[.1] m-2 stroke-white hover:bg-gray-950/[.25]"
          variant="ghost"
          size="icon"
          onClick={toggleMute}
        >
          {isMuted ? <SpeakerOffIcon /> : <SpeakerLoudIcon />}
        </Button>
      </div>
     
    </div>
  );
};

export default VideoPlayer;
