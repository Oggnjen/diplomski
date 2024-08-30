import { useState } from 'react';
import { Peers } from '../peers/Peers';
import { ChatContainer } from '../chat/ChatContainer';
import { SettingsContainer } from '../settings/SettingsContainer';
import { useCallId, useExitCall } from '@/backend-layer/call';
import { CallIdContainer } from './CallIdContainer';

export function CallRoom() {
  const callId = useCallId();
  const [isCallIdContainerVisible, setIsCallIdContainerVisible] = useState(true);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [isSettingsVisible, setSettignsVisible] = useState(false);
  const exitCall = useExitCall();

  const toggleChatVisibility = () => {
    setIsChatVisible((prevVisibility) => !prevVisibility);
  };

  const toggleSettingsVisibility = () => {
    setSettignsVisible(!isSettingsVisible);
  };
  return (
    <div className='flex flex-col h-screen'>
      <div className='flex-1'>
        <Peers />
      </div>

      <div>
        <div className='fixed bottom-0 left-24 transform -translate-x-1/2 flex flex-col items-center'>
          <div className='flex gap-4'>
            <button className='bg-blue-500 text-white px-3 py-2 rounded-full mb-2'>
              <img src='/icons/settings.svg' width={20} onClick={toggleSettingsVisibility} />
            </button>
            <img
              className='cursor-pointer'
              src='/icons/end-call.svg'
              width={40}
              onClick={async () => await exitCall()}
            />
          </div>
          <div
            className={`bg-white  rounded-md  transition-max-height duration-300 flex ${
              isSettingsVisible ? 'max-h-[240px]' : 'max-h-0'
            }`}
          >
            <SettingsContainer />
          </div>
        </div>
        {callId !== '' && (
          <div className='fixed bottom-0 -right-[130px] transform -translate-x-1/2 flex flex-col items-center'>
            <div className='flex justify-end w-full'>
              <button
                className='bg-blue-500 text-white px-3 py-2 rounded-full mb-2'
                onClick={() => setIsCallIdContainerVisible(!isCallIdContainerVisible)}
              >
                <img src='/icons/copy.svg' width={20} />
              </button>
            </div>
            <div
              className={`bg-white rounded-md  transition-max-height duration-300 ${
                isCallIdContainerVisible ? 'max-h-[240px]' : 'max-h-0'
              }`}
            >
              <CallIdContainer />
            </div>
          </div>
        )}
        <div className='fixed bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center'>
          <button className='bg-blue-500 text-white px-3 py-2 rounded-full mb-2' onClick={toggleChatVisibility}>
            Chat
          </button>
          <div
            className={`bg-white rounded-md overflow-y-auto transition-max-height duration-300 ${
              isChatVisible ? 'max-h-[440px]' : 'max-h-0'
            }`}
          >
            <ChatContainer />
          </div>
        </div>
      </div>
    </div>
  );
}
