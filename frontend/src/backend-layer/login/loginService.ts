import { AuthRequest } from './dtos';
import { getAxios } from '@/app/utils/axiosWrapper';

export function login(dto: AuthRequest) {
  return getAxios().post(`/auth`, dto);
}
