import Button from '@/app/common-components/Button';
import { ChatStoreContext } from '@/backend-layer/chat-context/chatStoreContext';
import { useAddMyMessage } from '@/backend-layer/chat-context/chatStoreHooks';
import { useContext, useState } from 'react';

export function ChatContainer() {
  const [text, setText] = useState('');
  const addMyMessage = useAddMyMessage();
  const { messages, setMessageToAdd } = useContext(ChatStoreContext);
  return (
    <div className='relative min-h-[400px] max-h-[400px] min-w-[600px] mt-6'>
      <div className=' min-h-[350px] max-h-[350px]  overflow-y-scroll'>
        {messages.map((m, i) => (
          <div key={m.member.memberId + i} className='flex gap-2'>
            <div className='font-thin italic'>{m.time}</div>
            <div className='font-semibold'>
              {m.member.name} {m.member.surname}:
            </div>
            <div className='max-w-[400px]'>{m.message}</div>
          </div>
        ))}
      </div>

      <div className='absolute w-full bottom-0'>
        <div className='flex justify-between w-full h-[40px]'>
          <input
            type='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
            className='border-[2px] w-full'
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setMessageToAdd(text);
                addMyMessage(text);
                setText('');
              }
            }}
          />
          <Button
            text='Send'
            onClick={() => {
              setMessageToAdd(text);
              addMyMessage(text);
              setText('');
            }}
          />
        </div>
      </div>
    </div>
  );
}
