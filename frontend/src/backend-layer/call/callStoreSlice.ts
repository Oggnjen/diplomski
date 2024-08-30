import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CallMember, CallStoreState } from './CallStoreState';
import { applyCreateCallAsyncExtraReducers } from './createCallAsync';
import { applyJoinCallAsyncExtraReducers } from './joinCallAsync';
import { RtcState } from '../peer-context/types';

export interface GridPostionsMap {
  [key: string]: number;
}

const initialState: CallStoreState = {
  callId: '',
  myId: '',
  name: '',
  surname: '',
  email: '',
  members: [],
  membersPositions: {},
};

export interface CallMemberChange {
  callMember: CallMember;
  newState: RtcState;
}

export const callStoreSlice = createSlice({
  name: 'callStore',
  initialState: initialState,
  reducers: {
    addNewMember: (state, action: PayloadAction<CallMember>) => {
      let gridIndex: number;
      const positions = Object.values(state.membersPositions);
      if (!positions.find((m) => m == 2)) {
        gridIndex = 2;
      } else if (!positions.find((m) => m == 6)) {
        gridIndex = 6;
      } else if (!positions.find((m) => m == 5)) {
        gridIndex = 5;
      } else if (!positions.find((m) => m == 7)) {
        gridIndex = 7;
      } else {
        gridIndex = 8;
      }
      state.membersPositions[action.payload.memberId] = gridIndex;
      state.members = [
        ...state.members,
        {
          email: action.payload.email,
          name: action.payload.name,
          surname: action.payload.surname,
          memberId: action.payload.memberId,
          rtcState: action.payload.rtcState,
        },
      ];
    },
    changeMember: (state, action: PayloadAction<CallMemberChange>) => {
      const memberIndex = state.members.findIndex((m) => m.memberId === action.payload.callMember.memberId);

      if (memberIndex !== -1) {
        const changedMember: CallMember = {
          ...state.members[memberIndex],
          rtcState: action.payload.newState,
        };

        state.members[memberIndex] = changedMember;
      }
    },
    showMemberAsBig: (state, action: PayloadAction<CallMember>) => {
      const memberPosition = state.membersPositions[action.payload.memberId];
      let memberIdToReplace = '';
      Object.entries(state.membersPositions).forEach(([key, value]) => {
        if (value == 2) {
          memberIdToReplace = key;
        }
      });
      state.membersPositions[action.payload.memberId] = 2;
      state.membersPositions[memberIdToReplace] = memberPosition;
    },
    showMemberAsSmall: (state, action: PayloadAction<CallMember>) => {
      const memberPosition = state.membersPositions[action.payload.memberId];
      let memberIdToReplace = '';
      Object.entries(state.membersPositions).forEach(([key, value]) => {
        if (value == 6) {
          memberIdToReplace = key;
        }
      });
      state.membersPositions[action.payload.memberId] = 6;
      state.membersPositions[memberIdToReplace] = memberPosition;
    },
    deleteMember: (state, action: PayloadAction<CallMember>) => {
      state.members = state.members.filter((m) => m.memberId != action.payload.memberId);
      delete state.membersPositions[action.payload.memberId];
    },
  },
  extraReducers: (builder) => {
    applyCreateCallAsyncExtraReducers(builder);
    applyJoinCallAsyncExtraReducers(builder);
  },
});

export const { addNewMember, changeMember, showMemberAsBig, showMemberAsSmall, deleteMember } = callStoreSlice.actions;

export default callStoreSlice.reducer;
