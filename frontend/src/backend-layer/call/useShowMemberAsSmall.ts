import { CallMember } from '.';
import { useAppDispatch } from '../store/store';
import { showMemberAsSmall } from './callStoreSlice';

export function useShowMemberAsSmall() {
  const dispatch = useAppDispatch();

  return (callMember: CallMember) => {
    dispatch(showMemberAsSmall(callMember));
  };
}
