import { CallMember } from '.';
import { useAppDispatch } from '../store/store';
import { showMemberAsBig } from './callStoreSlice';

export function useShowMemberAsBig() {
  const dispatch = useAppDispatch();

  return (callMember: CallMember) => {
    dispatch(showMemberAsBig(callMember));
  };
}
