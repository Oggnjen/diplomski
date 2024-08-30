import {
  CallMember,
  useMemberPostion,
  useMembersLength,
  useShowMemberAsBig,
  useShowMemberAsSmall,
} from '@/backend-layer/call';
import { useRemoteStream, useRtcPeerConnection, useSetRemoteStream } from '@/backend-layer/peer-context/peerStoreHooks';
import { useEffect, useRef, useState } from 'react';
import { PeerVideo } from './PeerVideo';
import React from 'react';
import classNames from 'classnames';
import { PeerHeader } from './PeerHeader';

interface PeerProps {
  member: CallMember;
}

export const Peer = React.memo(({ member }: PeerProps) => {
  const position = useMemberPostion(member.memberId);
  const peerConnection = useRtcPeerConnection();
  const membersLength = useMembersLength();
  const remoteStream = useRemoteStream();
  const videoRef2 = useRef<HTMLVideoElement | null>(null);
  const videoRef6 = useRef<HTMLVideoElement | null>(null);
  const videoRef7 = useRef<HTMLVideoElement | null>(null);
  const videoRef5 = useRef<HTMLVideoElement | null>(null);
  const videoRef8 = useRef<HTMLVideoElement | null>(null);
  const setRemoteStream = useSetRemoteStream();
  useEffect(() => {
    if (peerConnection) {
      peerConnection.ontrack = (event) => {
        const [remoteStream] = event.streams;
        if (videoRef2.current && position == 2) {
          videoRef2.current.srcObject = remoteStream;
          setRemoteStream(remoteStream);
        }
        if (videoRef6.current && position == 6) {
          videoRef6.current.srcObject = remoteStream;
          setRemoteStream(remoteStream);
        }
        if (videoRef5.current && position == 5) {
          videoRef5.current.srcObject = remoteStream;
          setRemoteStream(remoteStream);
        }
        if (videoRef7.current && position == 7) {
          videoRef7.current.srcObject = remoteStream;
          setRemoteStream(remoteStream);
        }
        if (videoRef8.current && position == 8) {
          videoRef8.current.srcObject = remoteStream;
          setRemoteStream(remoteStream);
        }
      };

      peerConnection.onconnectionstatechange = () => {
        if (peerConnection.connectionState == 'failed') {
          console.error(`Peer ${member.email} ${member.memberId} disconected`);
        }
      };
    }
  }, [peerConnection]);

  useEffect(() => {
    if (videoRef2.current && position == 2 && remoteStream) {
      videoRef2.current.srcObject = remoteStream;
      setRemoteStream(remoteStream);
    }
    if (videoRef6.current && position == 6 && remoteStream) {
      videoRef6.current.srcObject = remoteStream;
      setRemoteStream(remoteStream);
    }
    if (videoRef5.current && position == 5 && remoteStream) {
      videoRef5.current.srcObject = remoteStream;
      setRemoteStream(remoteStream);
    }
    if (videoRef7.current && position == 7 && remoteStream) {
      videoRef7.current.srcObject = remoteStream;
      setRemoteStream(remoteStream);
    }
    if (videoRef8.current && position == 8 && remoteStream) {
      videoRef8.current.srcObject = remoteStream;
      setRemoteStream(remoteStream);
    }
  }, [position]);

  const getVideoWidthBasedOnPostion = () => {
    if (position == 2) {
      return 900;
    }
    return 300;
  };

  return (
    <>
      {/* <div
        className={classNames(
          'absolute left-1/2 translate-x-[-50%] p-2 bg-slate-50 rounded-xl transition-all',
          { 'left-1/2 translate-x-[-50%]': position == 2 },
          { 'left-1/2 bottom-0 translate-x-[-50%] w-[300px] mb-[60px]': position == 6 && membersLength != 3 },
          { 'left-1/4 bottom-0 translate-x-[-50%] w-[300px] mb-[60px]': position == 6 && membersLength == 3 },
          { 'left-1/4 bottom-0 translate-x-[-50%] w-[300px] mb-[60px] ': position == 5 && membersLength != 3 },
          { 'left-3/4 bottom-0 translate-x-[-50%] w-[300px] mb-[60px] ': position == 5 && membersLength == 3 },
          { 'left-3/4 bottom-0 translate-x-[-50%] w-[300px] mb-[60px]': position == 7 },
          { 'left-3/4 bottom-0 translate-x-[-50%] w-[0px] h-0 mb-[60px] hidden': position == 8 }
        )}
      > */}
      <div className='absolute left-0 w-full h-full grid grid-cols-5 grid-rows-4'>
        <div className=' h-full flex items-center justify-center p-[80px]'>
          <div>
            <div
              className={classNames(
                'p-2 bg-slate-50 rounded-xl transition-all  shadow-2xl',
                { hidden: position != 5 },
                { visible: position == 5 }
              )}
            >
              <PeerHeader member={member} />
              <video
                id='remoteVideo'
                ref={videoRef5}
                autoPlay
                playsInline
                muted={position != 5}
                className='mt-7'
              ></video>
            </div>
          </div>
        </div>
        <div className=' col-span-4 row-span-4 h-full flex items-center justify-center w-full'>
          <div>
            <div
              className={classNames(
                'p-2 bg-slate-50 rounded-xl transition-all  shadow-2xl',
                'w-[1200px]',
                { hidden: position != 2 },
                { visible: position == 2 }
              )}
            >
              <PeerHeader member={member} />
              <video
                id='remoteVideo'
                ref={videoRef2}
                autoPlay
                playsInline
                muted={position != 2}
                className='mt-7 w-full'
              ></video>
            </div>
          </div>
        </div>

        <div className='h-full flex items-center justify-center p-[80px]'>
          <div>
            <div
              className={classNames(
                'p-2 bg-slate-50 rounded-xl transition-all shadow-2xl',
                '',
                { hidden: position != 6 },
                { visible: position == 6 }
              )}
            >
              <PeerHeader member={member} />
              <video
                id='remoteVideo'
                ref={videoRef6}
                autoPlay
                playsInline
                muted={position != 6}
                className='mt-8 w-auto'
              ></video>
            </div>
          </div>
        </div>
        <div className=' h-full flex items-center justify-center p-[80px]'>
          <div>
            <div
              className={classNames(
                'p-2 bg-slate-50 rounded-xl transition-all  shadow-2xl',
                { hidden: position != 7 },
                { visible: position == 7 }
              )}
            >
              <PeerHeader member={member} />

              <video
                id='remoteVideo'
                ref={videoRef7}
                autoPlay
                playsInline
                width={getVideoWidthBasedOnPostion()}
                muted={position != 7}
                className='mt-8 w-auto'
              ></video>
            </div>
          </div>
        </div>
        <div className='w-full'>
          <div>
            <div className={classNames('p-2 bg-slate-50 rounded-xl transition-all hidden')}>
              <video
                id='remoteVideo'
                ref={videoRef8}
                autoPlay
                playsInline
                width={getVideoWidthBasedOnPostion()}
              ></video>
            </div>
          </div>
          {/* <PeerHeader member={member} />
          <video id='remoteVideo' ref={videoRef} autoPlay playsInline width={getVideoWidthBasedOnPostion()}></video> */}
        </div>
        {/* <div>
          <PeerHeader member={member} />
          <video id='remoteVideo' ref={videoRef} autoPlay playsInline width={getVideoWidthBasedOnPostion()}></video>
        </div> */}
        {/* {
          <PeerVideo
            member={memoizedMember}
            videoRef={videoRef}
            width={getVideoWidthBasedOnPostion()}
            changeVisibility={() => {
              if (position == 2) {
                showMemberAsSmall(memoizedMember);
              } else if (position == 6 || position == 5 || position == 7) {
                showMemberAsBig(memoizedMember);
              }
            }}
            settingsText={position == 2 ? 'Show smaller' : 'Show bigger'}
          >
            <div>
              <video id='remoteVideo' ref={videoRef} autoPlay playsInline width={getVideoWidthBasedOnPostion()}></video>
            </div>
          </PeerVideo>
        } */}
      </div>
    </>
  );
});
