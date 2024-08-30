import Button from '@/app/common-components/Button';
import MyCamera from '@/app/compontents/MyCamera';
import { CallRoom } from '@/app/compontents/call/CallRoom';
import { Peers } from '@/app/compontents/peers/Peers';
import { useRedirectIfUserNotLogged } from '@/app/utils/auth';
import { useJoinCall, useMyId } from '@/backend-layer/call';
import { useCreateMediaStream, useIsCameraOn } from '@/backend-layer/media-access/mediaAccessStoreHooks';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const JoinCall = () => {
  const createMediaStream = useCreateMediaStream();
  const router = useRouter();
  const joinCall = useJoinCall();
  const mediaStream = useIsCameraOn();
  const myId = useMyId();
  const [callId, setCallId] = useState('');
  useEffect(() => {
    useRedirectIfUserNotLogged();
  }, []);

  return (
    <div className=''>
      <div>
        {myId !== '' && <CallRoom />}
        {myId === '' && (
          <div className='h-screen flex items-center justify-center gap-10'>
            <div
              className='cursor-pointer border p-5 mt-20 border-blue-300 bg-white rounded-lg flex  gap-4 shadow-2xl font-thin'
              onClick={() => router.back()}
            >
              <div className='w-10'>
                <img src='/icons/back.svg' />
              </div>
            </div>
            <div className='cursor-pointer border p-8 mt-20 border-blue-300 bg-white rounded-lg flex w-[600px] gap-4 shadow-2xl font-thin'>
              <input
                type='text'
                value={callId}
                onChange={(e) => setCallId(e.target.value)}
                className='border-[2px] border-black w-full'
              />
              <Button
                text='Join call'
                onClick={async () => {
                  if (callId !== '') {
                    await createMediaStream({ video: true, audio: true });
                    joinCall(callId);
                  } else {
                    toast.warning('Please provide call id');
                  }
                }}
                className='w-[200px]'
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinCall;
{
  /* <div className='flex'>
<label className='w-[100px] self-center'>CALL ID</label>
<input
  type='text'
  value={callId}
  onChange={(e) => setCallId(e.target.value)}
  className='border-[2px] border-black w-full'
/>
</div>
<div className='flex justify-center'>
<div className='w-[200px]'>
  <Button
    text='Camera'
    onClick={() =>
      createMediaStream({
        video: true,
        audio: true,
      })
    }
  />
</div>
<div>
  <div className='w-[200px]'>
    <Button
      text='Join call'
      onClick={() => {
        if (mediaStream) {
          if (callId !== '') {
            joinCall(callId);
          } else {
            toast.warning('Please provide call id');
          }
        } else {
          toast.warning("You cannot join call if you don't open camera. For now... :)");
        }
      }}
    />
  </div>
</div>
<div>
  <div className='w-[200px]'>
    <Button
      text='Make call'
      onClick={() => {
        router.push('/');
      }}
    />
  </div>
</div>
</div> */
}
