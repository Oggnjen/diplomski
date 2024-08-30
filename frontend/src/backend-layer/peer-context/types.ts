import { CallMemberDto, RequestType } from '../call/dtos';

export interface PeerMember {
  connection: RTCPeerConnection;
  memberId: string;
  state: RtcState;
}

export interface SdpPayload {
  memberDto: CallMemberDto;
  sdp: string;
  requestType: RequestType;
}

export enum RtcState {
  CREATED,
  NEED_TO_CREATE_OFFER,
  NEED_TO_CREATE_ANSWER,
  SDP_OFFER_CREATED,
  SDP_OFFER_WAITING,
  SDP_ANSWER_WAITING,
  SDP_FULLFILED,
  COLLECTING_ICE_CANDIDATES,
  FULLFILED,
  DISCONECTED,
  MY_STATE,
}
