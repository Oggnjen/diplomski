import { createContext } from 'react';
import { emptyCallback } from '@/app/utils/constants';

export interface PeerStoreState {
  rtcPeerConnection: RTCPeerConnection | undefined;
  remoteStream: MediaStream | undefined;
  setRemoteStream: (remoteStream: MediaStream) => void;
  setRtcPeerConnection: (rtcPeerConnection: RTCPeerConnection) => void;
}

export function createPeerStoreDefaultValue(): PeerStoreState {
  return {
    rtcPeerConnection: undefined,
    setRtcPeerConnection: emptyCallback,
    remoteStream: undefined,
    setRemoteStream: emptyCallback,
  };
}

export const PeerStoreContext = createContext(createPeerStoreDefaultValue());
