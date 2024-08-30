import { RtcState } from '../peer-context/types';
import { GridPostionsMap } from './callStoreSlice';

export interface CallStoreState {
  callId: string;
  myId: string;
  name: string;
  surname: string;
  email: string;
  members: CallMember[];
  membersPositions: GridPostionsMap;
}

export interface CallMember {
  name: string;
  surname: string;
  email: string;
  memberId: string;
  rtcState: RtcState;
}
