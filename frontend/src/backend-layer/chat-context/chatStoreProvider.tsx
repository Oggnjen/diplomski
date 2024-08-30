import { ReactNode, useState } from "react";
import { ChatStoreContext, ChatStoreState, Message } from "./chatStoreContext";

export function ChatStoreProvider({ children }: { children?: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageToAdd, setMessageToAdd] = useState("");
  let value: ChatStoreState = {
    messages,
    setMessages,
    messageToAdd,
    setMessageToAdd,
  };

  return (
    <ChatStoreContext.Provider value={value}>
      {children}
    </ChatStoreContext.Provider>
  );
}

export function withChatStoreProvider<P extends object>(
  Component: React.ComponentType<P>
) {
  const withChatStoreProvider = (props: P) => (
    <ChatStoreProvider>
      <Component {...props} />
    </ChatStoreProvider>
  );
  return withChatStoreProvider;
}
