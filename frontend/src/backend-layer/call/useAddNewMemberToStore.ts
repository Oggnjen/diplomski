import { useAppDispatch } from "../store/store";
import { CallMember } from "./CallStoreState";
import { addNewMember } from "./callStoreSlice";

export function useAddNewMemberToStore() {
  const dispatch = useAppDispatch();

  return (callMember: CallMember) => {
    dispatch(addNewMember(callMember));
  };
}
