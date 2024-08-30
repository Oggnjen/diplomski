import { getAxios } from '@/app/utils/axiosWrapper';
import { CreatedCallDto, JoinedCallDto, SdpDto } from './dtos';

export const createCall = () => {
  return getAxios().post<CreatedCallDto>(`/call`, {
    data: {},
  });
};

export const joinCall = (callId: string) => {
  return getAxios().post<JoinedCallDto>(`/call/${callId}`);
};

export const sendSdp = (sdpDto: SdpDto) => {
  return getAxios().post(`/sdp`, sdpDto);
};

export const exitCall = (callId: string) => {
  return getAxios().post(`/call/${callId}/exit`);
};
