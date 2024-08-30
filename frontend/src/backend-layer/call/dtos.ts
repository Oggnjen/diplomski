export interface CallMemberDto {
  email: string;
  name: string;
  surname: string;
  memberId: string;
}

export interface JoinedCallDto {
  callId: string;
  myId: string;
  myName: string;
  mySurname: string;
  myEmail: string;
  members: CallMemberDto[];
}

export interface CreatedCallDto {
  callId: string;
  callerId: string;
  callerName: string;
  callerSurname: string;
  callerEmail: string;
}

export interface SdpDto {
  memberDto: CallMemberDto;
  sdp: string;
  destination: string;
  requestType: RequestType;
}

export enum RequestType {
  JOIN_NOTIFICATION,
  SENDING_OFFER,
  SENDING_ANSWER,
  SDP_FULLFILED,
  SENDING_ICE,
  END_CALL,
}

export enum ShowingState {
  SHOW_SMALL,
  SHOW_BIG,
  HIDDEN,
}
