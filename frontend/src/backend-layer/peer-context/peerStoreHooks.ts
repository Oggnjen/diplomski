import { useContext } from 'react';
import { PeerStoreContext } from './peerStoreContext';
import { PeerMember, RtcState } from './types';
import { sendSdp } from '../call/callStoreService';
import { RequestType } from '../call/dtos';
import { CallMember, useSendSdp } from '../call';
import { useChangeMemberInStore } from '../call/useChangeMemberInStore';
import { Message } from '../chat-context/chatStoreContext';
import { getCurrentTime } from '@/app/utils/utilMethods';
import { toast } from 'react-toastify';
import { MediaAccessStoreContext } from '../media-access/mediaAccessStoreContext';

export function useRtcPeerConnection() {
  return useContext(PeerStoreContext).rtcPeerConnection;
}

export function useCreateAndSendOffer() {
  const { rtcPeerConnection, setRtcPeerConnection } = useContext(PeerStoreContext);
  const sendSdp = useSendSdp();

  return async (member: CallMember) => {
    if (rtcPeerConnection) {
      const offer = await rtcPeerConnection.createOffer();

      await rtcPeerConnection.setLocalDescription(offer);
      setRtcPeerConnection(rtcPeerConnection);

      await sendSdp(member.memberId, RequestType.SENDING_OFFER, JSON.stringify(offer));
    }
  };
}

export function useSetOfferAndSendAnswer() {
  const { rtcPeerConnection, setRtcPeerConnection } = useContext(PeerStoreContext);
  const sendSdp = useSendSdp();
  const changeMember = useChangeMemberInStore();

  return async (member: CallMember, offer: RTCSessionDescriptionInit) => {
    if (rtcPeerConnection) {
      await rtcPeerConnection.setRemoteDescription(offer);
      const answer = await rtcPeerConnection.createAnswer();
      await rtcPeerConnection.setLocalDescription(answer);
      await sendSdp(member.memberId, RequestType.SENDING_ANSWER, JSON.stringify(answer));
      setRtcPeerConnection(rtcPeerConnection);
      changeMember(member, RtcState.SDP_FULLFILED);
    }
  };
}

export function useSetAnswer() {
  const { rtcPeerConnection, setRtcPeerConnection } = useContext(PeerStoreContext);
  const changeMember = useChangeMemberInStore();
  return async (member: CallMember, answer: RTCSessionDescriptionInit) => {
    if (rtcPeerConnection) {
      setRtcPeerConnection(rtcPeerConnection);
      await rtcPeerConnection.setRemoteDescription(answer);
      changeMember(member, RtcState.SDP_FULLFILED);
    }
  };
}

export function useAddIdeCandidate() {
  const { rtcPeerConnection, setRtcPeerConnection } = useContext(PeerStoreContext);
  return async (iceCandidate: RTCIceCandidate) => {
    if (rtcPeerConnection && rtcPeerConnection.remoteDescription != null) {
      try {
        setRtcPeerConnection(rtcPeerConnection);

        await rtcPeerConnection.addIceCandidate(iceCandidate);
      } catch (e) {
        console.error('Error adding received ice candidate', e);
      }
    }
  };
}

export function useAddOnSignalingChange() {
  const { rtcPeerConnection, setRtcPeerConnection } = useContext(PeerStoreContext);
  const sendSdp = useSendSdp();
  return async (peerMember: CallMember) => {
    if (rtcPeerConnection) {
      rtcPeerConnection.onicecandidate = async (event) => {
        if (event.candidate) {
          const a = async () => {
            await sendSdp(peerMember.memberId, RequestType.SENDING_ICE, JSON.stringify(event.candidate));
          };
          setTimeout(a, 1000);
        }
      };
      setRtcPeerConnection(rtcPeerConnection);
    }
  };
}

export function useOnNegotationNeeded() {
  const { rtcPeerConnection, setRtcPeerConnection } = useContext(PeerStoreContext);
  return async () => {
    if (rtcPeerConnection) {
      rtcPeerConnection.onnegotiationneeded = (event) => {
        try {
        } catch (err) {
          console.error('EROR BRATE');
        } finally {
        }
      };
      setRtcPeerConnection(rtcPeerConnection);
    }
  };
}

export function useAddDataChannel() {
  const { rtcPeerConnection, setRtcPeerConnection } = useContext(PeerStoreContext);

  return async (
    setDataChannel: (dataChannel: RTCDataChannel) => void,
    addMessage: (messageData: Message) => void,
    member: CallMember
  ) => {
    if (rtcPeerConnection) {
      setDataChannel(rtcPeerConnection.createDataChannel('labela'));

      rtcPeerConnection.ondatachannel = (event) => {
        const dataChannel = event.channel;
        dataChannel.onmessage = (e) => {
          toast.info(member.name + ' ' + member.surname + ': ' + e.data);
          addMessage({ member: member, message: e.data, time: getCurrentTime() });
        };
      };

      setRtcPeerConnection(rtcPeerConnection);
    }
  };
}

export function useReplaceTrack() {
  const { rtcPeerConnection, setRtcPeerConnection } = useContext(PeerStoreContext);

  return (mediaStream: MediaStream) => {
    if (rtcPeerConnection) {
      const videoTrack = mediaStream.getVideoTracks()[0];
      const senderVideo = rtcPeerConnection.getSenders().find((sender) => sender.track?.kind === videoTrack.kind);
      if (!senderVideo) {
        console.warn('failed to find sender');
        return;
      }
      senderVideo.replaceTrack(videoTrack);
      setRtcPeerConnection(rtcPeerConnection);
    }
  };
}

export function useRemoteStream() {
  return useContext(PeerStoreContext).remoteStream;
}

export function useSetRemoteStream() {
  const { setRemoteStream } = useContext(PeerStoreContext);
  return (remoteStream: MediaStream) => {
    setRemoteStream(remoteStream);
  };
}

// export function useCreateAndSendOffer() {
//   const { rtcPeerConnection, setRtcPeerConnection } = useContext(PeerStoreContext);
//   const sendSdp = useSendSdp();

//   return async (member: CallMember) => {
//     if (rtcPeerConnection) {
//       const offer = await rtcPeerConnection.createOffer();

//       await rtcPeerConnection.setLocalDescription(offer);
//       setRtcPeerConnection(rtcPeerConnection);

//       await sendSdp(member.memberId, RequestType.SENDING_OFFER, JSON.stringify(offer));
//     }
//   };
// }
