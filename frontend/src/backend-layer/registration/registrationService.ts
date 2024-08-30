import { RegisterUserDto } from './dtos';
import { getAxios } from '@/app/utils/axiosWrapper';

export async function register(dto: RegisterUserDto) {
  return getAxios().post(`/registration`, dto);
}
