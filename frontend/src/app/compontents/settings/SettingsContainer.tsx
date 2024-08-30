import { useCallId, useCreateCall } from '@/backend-layer/call';
import {
  useIsCamOn,
  useIsMicOn,
  useStartCamera,
  useStartMic,
  useStopCamera,
  useStopMic,
} from '@/backend-layer/media-access';
import { useAddScreenShare, useCreateMediaStream } from '@/backend-layer/media-access/mediaAccessStoreHooks';
import { useState } from 'react';

export function SettingsContainer() {
  const stopCamera = useStopCamera();
  const startCamera = useStartCamera();
  const stopMic = useStopMic();
  const startMic = useStartMic();
  const [isCamOn, setIsCamOn] = useState(useIsCamOn());
  const [isMicOn, setIsMicOn] = useState(useIsMicOn());
  const createMediaStream = useCreateMediaStream();
  const addScreenShare = useAddScreenShare();
  const callId = useCallId();

  return (
    <div className='p-4 flex gap 5 my-4 '>
      {isCamOn && (
        <div
          onClick={() => {
            startCamera();
            setIsCamOn(false);
          }}
          className='w-8 cursor-pointer mr-2'
        >
          <img src='/icons/cam-off.svg' />
        </div>
      )}
      {!isCamOn && (
        <div
          onClick={() => {
            stopCamera();
            setIsCamOn(true);
          }}
          className='w-8 cursor-pointer mr-2'
        >
          <img src='/icons/cam-on.svg' />
        </div>
      )}

      {isMicOn && (
        <div
          onClick={() => {
            startMic();
            setIsMicOn(false);
          }}
          className='w-8 cursor-pointer mr-2'
        >
          <img src='/icons/mic-off.svg' />
        </div>
      )}
      {!isMicOn && (
        <div
          onClick={() => {
            stopMic();
            setIsMicOn(true);
          }}
          className='w-8 cursor-pointer mr-2'
        >
          <img src='/icons/mic-on.svg' />
        </div>
      )}
      <div
        onClick={() => {
          createMediaStream({
            video: true,
            audio: true,
          });
        }}
        className='w-8 cursor-pointer mr-2'
      >
        <img src='/icons/webcam.svg' />
      </div>
      {callId != '' && (
        <div
          onClick={() => {
            addScreenShare();
          }}
          className='w-8 cursor-pointer'
        >
          <img src='/icons/screen-share.svg' />
        </div>
      )}
    </div>
  );
}
