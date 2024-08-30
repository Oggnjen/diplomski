import { ReactNode, useEffect, useState } from 'react';
import { PeerMember, RtcState, SdpPayload } from './types';
import { PeerStoreContext, PeerStoreState } from './peerStoreContext';
import { CallMember, useMembers, useMyId, useSendSdp } from '../call';
import { Client, Stomp } from '@stomp/stompjs';
import { RequestType } from '../call/dtos';
import { sendSdp } from '../call/callStoreService';
import { io } from 'socket.io-client';
import { rtcServers } from '@/app/utils/constants';
import { PeerStoreLogic } from './peerStoreLogic';

interface PeerStoreProviderProps {
  children?: ReactNode;
  peerMember: CallMember;
  changeMedia?: boolean;
}

export function PeerStoreProvider({ children, peerMember }: PeerStoreProviderProps) {
  const [rtcPeerConnection, setRtcPeerConnection] = useState<RTCPeerConnection>(new RTCPeerConnection(rtcServers));
  const [remoteStream, setRemoteStream] = useState<MediaStream | undefined>(undefined);
  const value: PeerStoreState = {
    rtcPeerConnection,
    setRtcPeerConnection,
    remoteStream,
    setRemoteStream,
  };

  return (
    <PeerStoreContext.Provider value={value}>
      <PeerStoreLogic peerMember={peerMember}>{children}</PeerStoreLogic>
    </PeerStoreContext.Provider>
  );
}

export function withPeerStoreProvider<P extends PeerStoreProviderProps>(Component: React.ComponentType<P>) {
  const withPeerStoreProvider = (props: P) => (
    <PeerStoreProvider peerMember={props.peerMember}>
      <Component {...props} />
    </PeerStoreProvider>
  );
  return withPeerStoreProvider;
}
