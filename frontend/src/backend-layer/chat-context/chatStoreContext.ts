import { emptyCallback } from "@/app/utils/constants";
import { Dispatch, SetStateAction, createContext } from "react";
import { CallMember } from "../call";

export interface Message {
  member: CallMember;
  message: string;
  time: string;
}

export interface ChatStoreState {
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;
  messageToAdd: string;
  setMessageToAdd: (text: string) => void;
}

export function createChatStoreDefaultValue(): ChatStoreState {
  return {
    messages: [],
    setMessages: emptyCallback,
    messageToAdd: "",
    setMessageToAdd: emptyCallback,
  };
}

export const ChatStoreContext = createContext(createChatStoreDefaultValue());
