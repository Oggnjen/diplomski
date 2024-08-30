import Button from '@/app/common-components/Button';
import MyCamera from '@/app/compontents/MyCamera';
import { CallIdContainer } from '@/app/compontents/call/CallIdContainer';
import { CallRoom } from '@/app/compontents/call/CallRoom';
import { Peers } from '@/app/compontents/peers/Peers';
import { useRedirectIfUserNotLogged } from '@/app/utils/auth';
import { useCallId, useCreateCall, useJoinCall } from '@/backend-layer/call';
import {
  useAddScreenShare,
  useCreateMediaStream,
  useIsCameraOn,
} from '@/backend-layer/media-access/mediaAccessStoreHooks';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Home = () => {
  const callId = useCallId();
  const router = useRouter();
  const openCamera = useCreateMediaStream();
  useEffect(() => {
    useRedirectIfUserNotLogged();
  }, []);
  useEffect(() => {
    if (callId !== '') toast.success(callId);
  }, [callId]);

  const createCall = useCreateCall();
  const mediaStream = useIsCameraOn();

  return (
    <div className=''>
      <div>
        {callId !== '' && <CallRoom />}
        {callId === '' && (
          <div className='h-screen flex items-center justify-center gap-10'>
            <div
              onClick={async () => {
                await openCamera({ video: true, audio: true });
                createCall();
              }}
              className='cursor-pointer border p-8 mt-20 border-blue-300 bg-white rounded-lg  shadow-2xl font-thin'
            >
              <div className='w-40'>
                <img src='/icons/create-call.svg' />
                <div className='text-center '>Create call</div>
              </div>
            </div>
            <div
              onClick={() => {
                router.push('/join-call');
              }}
              className='cursor-pointer border p-8 mt-20 border-blue-300 bg-white rounded-lg shadow-2xl font-thin'
            >
              <div className='w-40'>
                <img src='/icons/join-call.svg' />
                <div className='text-center '>Join call</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
