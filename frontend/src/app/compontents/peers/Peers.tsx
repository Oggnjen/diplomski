import { useAddNewMemberToStore, useMembers, useMyId } from '@/backend-layer/call';
import { Peer } from './Peer';
import { useContext, useEffect } from 'react';
import { WsStoreContext } from '@/backend-layer/ws-context/wsStoreContext';
import { RtcState, SdpPayload } from '@/backend-layer/peer-context/types';
import { RequestType } from '@/backend-layer/call/dtos';
import { PeerStoreProvider } from '@/backend-layer/peer-context/peerStoreProvider';
import MyCamera from '../MyCamera';
import { HiddenMembers } from '../call/OtherMembers';

export function Peers() {
  const members = useMembers();
  const { stomp } = useContext(WsStoreContext);
  const myId = useMyId();
  const addNewMember = useAddNewMemberToStore();

  useEffect(() => {
    if (stomp && myId) {
      stomp.subscribe(`/user/${myId}/queue/private`, async function (message) {
        const msg = JSON.parse(message.body) as SdpPayload;
        if (msg.requestType.toString() == RequestType.JOIN_NOTIFICATION.toString()) {
          addNewMember({
            email: msg.memberDto.email,
            name: msg.memberDto.name,
            surname: msg.memberDto.surname,
            memberId: msg.memberDto.memberId,
            rtcState: RtcState.NEED_TO_CREATE_OFFER,
          });
        }
      });
    }
  }, [myId]);

  return (
    <div className='relative w-full h-screen'>
      <MyCamera />
      {members.map((m) => (
        <PeerStoreProvider peerMember={m} key={m.memberId}>
          <Peer member={m} />
        </PeerStoreProvider>
      ))}
      <HiddenMembers />
    </div>
  );
}
