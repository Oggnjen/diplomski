import { useAppSelector } from '../store/store';
import {
  selectCallId,
  selectHiddenMembers,
  selectMembers,
  selectMembersPositions,
  selectMyEmail,
  selectMyId,
  selectMyName,
  selectMySurname,
} from './callStoreSelectors';
import { ShowingState } from './dtos';

export const useCallId = () => useAppSelector(selectCallId);

export const useMyId = () => useAppSelector(selectMyId);

export const useMyName = () => useAppSelector(selectMyName);

export const useMySurname = () => useAppSelector(selectMySurname);

export const useMyEmail = () => useAppSelector(selectMyEmail);

export const useMembers = () => useAppSelector(selectMembers);

export const useMemberById = (memberId: string) => useAppSelector(selectMembers).find((m) => memberId == memberId);

export const useMemberPostion = (memberId: string) => useAppSelector(selectMembersPositions)[memberId];

export const useHiddenMembers = () => useAppSelector(selectHiddenMembers);

export const useMembersLength = () => useAppSelector(selectMembers).length;
