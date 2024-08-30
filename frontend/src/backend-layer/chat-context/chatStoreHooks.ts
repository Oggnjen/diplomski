import { useContext } from 'react';
import { ChatStoreContext, Message } from './chatStoreContext';
import { useMyEmail, useMyId, useMyName, useMySurname } from '../call';
import { RtcState } from '../peer-context/types';
import { getCurrentTime } from '@/app/utils/utilMethods';

export function useAddMessage() {
  const context = useContext(ChatStoreContext);
  return (messageData: Message) => {
    context.setMessages((prevMessages) => {
      return [...prevMessages, messageData];
    });
  };
}

export function useAddMyMessage() {
  const context = useContext(ChatStoreContext);
  const myId = useMyId();
  const myName = useMyName();
  const mySurname = useMySurname();
  const myEmail = useMyEmail();
  return (message: string) => {
    const messages = context.messages;
    context.setMessages([
      ...messages,
      {
        member: {
          email: myEmail,
          memberId: myId,
          name: myName,
          surname: mySurname,
          rtcState: RtcState.SDP_FULLFILED,
        },
        message: message,
        time: getCurrentTime(),
      },
    ]);
  };
}
