import { CallMember } from '.';
import { AppState } from '../store/store';

export const selectCallId = (state: AppState) => state.call.callId;
export const selectMyId = (state: AppState) => state.call.myId;
export const selectMembers = (state: AppState) => state.call.members;
export const selectMyName = (state: AppState) => state.call.name;
export const selectMySurname = (state: AppState) => state.call.surname;
export const selectMyEmail = (state: AppState) => state.call.email;
export const selectMembersPositions = (state: AppState) => state.call.membersPositions;

export const selectHiddenMembers = (state: AppState) => {
  let members: CallMember[] = [];
  Object.entries(state.call.membersPositions).forEach(([key, value]) => {
    if (value == 8) {
      const member = state.call.members.find((m) => m.memberId == key);
      if (member) members.push(member);
    }
  });
  return members;
};
