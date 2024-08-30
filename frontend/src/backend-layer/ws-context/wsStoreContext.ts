import { Client } from "@stomp/stompjs";
import { createContext } from "react";

export interface WsStoreState {
  stomp: Client | undefined;
  isOpen: boolean;
}

export function createWsStoreDefaultValue(): WsStoreState {
  return {
    stomp: undefined,
    isOpen: false,
  };
}

export const WsStoreContext = createContext(createWsStoreDefaultValue());
