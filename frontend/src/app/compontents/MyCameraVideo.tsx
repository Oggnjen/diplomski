import React, { useEffect, useRef, useState } from 'react';
import '../styles/camera.css';
import { useMediaStream } from '@/backend-layer/media-access';
import { useMembers } from '@/backend-layer/call';

interface MyCameraProps {
  width?: number;
}

const MyCameraVideo = ({ width = 200 }: MyCameraProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useMediaStream();
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      videoRef.current.volume = 0;
    }
  }, [stream]);

  return (
    <div>
      <video id='localVideo' ref={videoRef} autoPlay playsInline width={width} />
    </div>
  );
};

export default MyCameraVideo;
