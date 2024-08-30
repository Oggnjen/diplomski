import { CallMember, useMemberPostion } from '@/backend-layer/call';
import { useRemoteStream } from '@/backend-layer/peer-context/peerStoreHooks';
import classNames from 'classnames';

import React, { MutableRefObject, ReactNode, useEffect, useRef } from 'react';
import { useState } from 'react';
import { PeerHeader } from './PeerHeader';

interface PeerProps {
  member: CallMember;
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
  width: number;
  changeVisibility: (member: CallMember) => void;
  settingsText: string;
  children: ReactNode;
}

export const PeerVideo = React.memo(
  ({ member, videoRef, width, changeVisibility, settingsText, children }: PeerProps) => {
    const [toggle, setToggle] = useState(true);
    const clonedRef = useRef<HTMLVideoElement | null>(null);
    const remoteStream = useRemoteStream();
    const position = useMemberPostion(member.memberId);
    // potrebno odraditi isto ovo i kad se promijeni pozicija
    const handleCloneVideo = () => {
      console.log('oppp');
      setToggle(!toggle);
      console.log(remoteStream);
      console.log(clonedRef.current);

      if (clonedRef.current && remoteStream) {
        console.log('oppp');

        clonedRef.current.srcObject = remoteStream;
        console.log(clonedRef.current);
      }
    };
    return (
      <div>
        <PeerHeader member={member} />
        <>{children}</>
        <div className={classNames({ hidden: toggle }, { visible: !toggle })}>
          <video id='remoteVideo' ref={videoRef} autoPlay playsInline width={width}></video>
        </div>
        {/* <video id='remoteVideo' ref={clonedRef} autoPlay playsInline width={width}></video> */}
        <div className={classNames({ hidden: !toggle }, { visible: toggle })}>
          <video id='remoteVideo' ref={clonedRef} autoPlay playsInline width={width}></video>
        </div>
        <button onClick={handleCloneVideo}>Clone Video</button>
      </div>
    );
  }
);
