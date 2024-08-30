import { ReactNode, useContext, useEffect, useState } from 'react';
import { CallMember, useDeleteMember, useMyId, useSendSdp } from '../call';
import { RtcState, SdpPayload } from './types';
import {
  useAddDataChannel,
  useAddIdeCandidate,
  useAddOnSignalingChange,
  useCreateAndSendOffer,
  useOnNegotationNeeded,
  useReplaceTrack,
  useRtcPeerConnection,
  useSetAnswer,
  useSetOfferAndSendAnswer,
} from './peerStoreHooks';
import { useChangeMemberInStore } from '../call/useChangeMemberInStore';
import { RequestType } from '../call/dtos';
import { WsStoreContext } from '../ws-context/wsStoreContext';
import { useMediaStream, useVideoTrack } from '../media-access/mediaAccessStoreHooks';
import { ChatStoreContext } from '../chat-context/chatStoreContext';
import { useAddMessage } from '../chat-context/chatStoreHooks';
import { toast } from 'react-toastify';

interface PeerStoreLogicProps {
  peerMember: CallMember;
  children?: ReactNode;
}

export function PeerStoreLogic({ peerMember, children }: PeerStoreLogicProps) {
  const createAndSendOffer = useCreateAndSendOffer();
  const rtcPeerConnection = useRtcPeerConnection();
  const setOfferAndSendAnswer = useSetOfferAndSendAnswer();
  const negotiationNeeded = useOnNegotationNeeded();
  const setAnswer = useSetAnswer();
  const addIceCandidate = useAddIdeCandidate();
  const changeMember = useChangeMemberInStore();
  const sendSdp = useSendSdp();
  const addOnSignalingChange = useAddOnSignalingChange();
  const addDataChannel = useAddDataChannel();
  const replaceTrack = useReplaceTrack();
  const videoTrack = useVideoTrack();
  const deleteMember = useDeleteMember();

  const [dataChanel, setDataChannel] = useState<RTCDataChannel>();
  const { messageToAdd } = useContext(ChatStoreContext);
  const addMessage = useAddMessage();

  const myId = useMyId();
  const mediaStream = useMediaStream()[0];

  const { stomp } = useContext(WsStoreContext);
  const [isMediaStream, setIsMediaStream] = useState(false);

  function checkMessage(msg: SdpPayload, requestType: RequestType) {
    if (requestType == RequestType.END_CALL) {
      return msg.requestType.toString() == 'END_CALL' && msg.memberDto.memberId == peerMember.memberId;
    }
    return msg.requestType.toString() == requestType.toString() && msg.memberDto.memberId == peerMember.memberId;
  }

  useEffect(() => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((m) => rtcPeerConnection?.addTrack(m, mediaStream));
      setIsMediaStream(true);
    }
    addOnSignalingChange(peerMember);
    negotiationNeeded();
    addDataChannel(setDataChannel, addMessage, peerMember);
  }, []);

  useEffect(() => {
    if (isMediaStream) {
      const process = async () => {
        if (peerMember.rtcState == RtcState.CREATED) {
          changeMember(peerMember, RtcState.SDP_OFFER_WAITING);
          await sendSdp(peerMember.memberId, RequestType.JOIN_NOTIFICATION, '');
        } else if (peerMember.rtcState == RtcState.NEED_TO_CREATE_OFFER) {
          await createAndSendOffer(peerMember);
        }
      };
      process();
    }
  }, [peerMember, isMediaStream]);

  useEffect(() => {
    if (stomp && myId) {
      stomp.subscribe(`/user/${myId}/queue/private`, async function (message) {
        const msg = JSON.parse(message.body) as SdpPayload;
        if (checkMessage(msg, RequestType.SENDING_OFFER)) {
          await setOfferAndSendAnswer(peerMember, JSON.parse(msg.sdp) as RTCSessionDescriptionInit);
        } else if (checkMessage(msg, RequestType.SENDING_ANSWER)) {
          await setAnswer(peerMember, JSON.parse(msg.sdp) as RTCSessionDescriptionInit);
        } else if (checkMessage(msg, RequestType.SENDING_ICE)) {
          const candidate = JSON.parse(msg.sdp) as RTCIceCandidate;
          addIceCandidate(candidate);
        } else if (checkMessage(msg, RequestType.END_CALL)) {
          deleteMember(peerMember);
        }
      });
    }
  }, [myId]);

  useEffect(() => {
    dataChanel?.send(messageToAdd);
  }, [messageToAdd]);

  useEffect(() => {
    if (mediaStream) replaceTrack(mediaStream);
  }, [videoTrack]);

  useEffect(() => {
    console.log(rtcPeerConnection);
  }, [rtcPeerConnection]);

  return <>{children}</>;
}
