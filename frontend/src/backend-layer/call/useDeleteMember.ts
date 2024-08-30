import { CallMember } from '.';
import { useAppDispatch } from '../store/store';
import { deleteMember } from './callStoreSlice';

export function useDeleteMember() {
  const dispatch = useAppDispatch();

  return (callMember: CallMember) => {
    dispatch(deleteMember(callMember));
  };
}
