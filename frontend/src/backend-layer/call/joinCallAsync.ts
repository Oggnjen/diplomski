import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { JoinedCallDto, ShowingState } from './dtos';
import { AppState } from '../store/store';
import { joinCall } from './callStoreService';
import { CallStoreState } from './CallStoreState';
import { RtcState } from '../peer-context/types';

export const joinCallAsync = createAsyncThunk<JoinedCallDto, { callId: string }, { state: AppState }>(
  'callStore/joinCallAsync',
  async ({ callId }, thunkApi) => {
    const response = await joinCall(callId);

    if (response.status !== 200) {
      throw Error('Server returned non 200 code');
    }
    return response.data;
  }
);

export function applyJoinCallAsyncExtraReducers(builder: ActionReducerMapBuilder<CallStoreState>) {
  builder.addCase(joinCallAsync.pending, (state) => {});

  builder.addCase(joinCallAsync.fulfilled, (state, action) => {
    const payload = action.payload;
    state.callId = payload.callId;
    state.myId = payload.myId;
    state.name = payload.myName;
    state.surname = payload.mySurname;
    state.email = payload.myEmail;

    const membersLength = state.members.length;

    state.members = payload.members.map((m, i) => {
      if (membersLength + i + 1 == 1) {
        state.membersPositions[m.memberId] = 2;
        return {
          email: m.email,
          name: m.name,
          surname: m.surname,
          memberId: m.memberId,
          rtcState: RtcState.CREATED,
        };
      } else if (membersLength + i + 1 == 2) {
        state.membersPositions[m.memberId] = 6;
        return {
          email: m.email,
          name: m.name,
          surname: m.surname,
          memberId: m.memberId,
          rtcState: RtcState.CREATED,
        };
      } else if (membersLength + i + 1 == 3) {
        state.membersPositions[m.memberId] = 5;
        return {
          email: m.email,
          name: m.name,
          surname: m.surname,
          memberId: m.memberId,
          rtcState: RtcState.CREATED,
        };
      } else if (membersLength + i + 1 == 4) {
        state.membersPositions[m.memberId] = 7;
        return {
          email: m.email,
          name: m.name,
          surname: m.surname,
          memberId: m.memberId,
          rtcState: RtcState.CREATED,
        };
      } else {
        state.membersPositions[m.memberId] = 8;
        return {
          email: m.email,
          name: m.name,
          surname: m.surname,
          memberId: m.memberId,
          rtcState: RtcState.CREATED,
        };
      }
    });
  });
  builder.addCase(joinCallAsync.rejected, (state) => {});
}
