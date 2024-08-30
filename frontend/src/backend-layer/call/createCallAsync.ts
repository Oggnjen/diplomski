import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { createCall } from './callStoreService';
import { CreatedCallDto } from './dtos';
import { AppState } from '../store/store';
import { CallStoreState } from './CallStoreState';

export const createCallAsync = createAsyncThunk<CreatedCallDto, undefined, { state: AppState }>(
  'callStore/createCallAsync',
  async (_, thunkApi) => {
    const response = await createCall();

    if (response.status !== 200) {
      throw Error('Server returned non 200 code');
    }
    return response.data;
  }
);

export function applyCreateCallAsyncExtraReducers(builder: ActionReducerMapBuilder<CallStoreState>) {
  builder.addCase(createCallAsync.pending, (state) => {});

  builder.addCase(createCallAsync.fulfilled, (state, action) => {
    const payload = action.payload;
    state.callId = payload.callId;
    state.myId = payload.callerId;
    state.name = payload.callerName;
    state.surname = payload.callerSurname;
    state.email = payload.callerEmail;
  });

  builder.addCase(createCallAsync.rejected, (state) => {});
}
