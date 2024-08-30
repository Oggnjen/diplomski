import { RtcState } from '../peer-context/types';
import { useAppDispatch } from '../store/store';
import { CallMember } from './CallStoreState';
import { changeMember } from './callStoreSlice';

export function useChangeMemberInStore() {
  const dispatch = useAppDispatch();

  return (callMember: CallMember, newState: RtcState) => {
    dispatch(changeMember({ callMember, newState }));
  };
}
