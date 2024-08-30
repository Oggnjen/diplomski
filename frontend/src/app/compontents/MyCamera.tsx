import React, { useEffect, useRef, useState } from 'react';
import '../styles/camera.css';
import { useMediaStream } from '@/backend-layer/media-access';
import { useMembers } from '@/backend-layer/call';
import MyCameraVideo from './MyCameraVideo';
import classNames from 'classnames';

interface MyCameraProps {
  width?: number;
}

const MyCamera = ({ width = 500 }: MyCameraProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useMediaStream();
  const members = useMembers();
  const [membersLength, setMembersLength] = useState(0);
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      videoRef.current.volume = 0;
    }
  }, [stream]);
  useEffect(() => {
    setMembersLength(members.length);
  }, [members]);
  return (
    <>
      <div
        className={classNames(
          'absolute mb-[60px]',
          { 'left-1/2 translate-x-[-50%]': membersLength == 0 },
          { 'ml-2 bottom-0 translate w-[200px]': membersLength != 0 }
        )}
      >
        {<MyCameraVideo width={membersLength == 0 ? 800 : 200} />}
      </div>
    </>
  );
};

export default MyCamera;
