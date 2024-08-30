import { useMyEmail, useMyId, useMyName, useMySurname } from ".";
import { sendSdp } from "./callStoreService";
import { RequestType, SdpDto } from "./dtos";

export function useSendSdp() {
  const myId = useMyId();
  const myEmail = useMyEmail();
  const myName = useMyName();
  const mySurname = useMySurname();
  return async (destination: string, type: RequestType, data: string) => {
    await sendSdp({
      memberDto: {
        email: myEmail,
        name: myName,
        surname: mySurname,
        memberId: myId,
      },
      destination: destination,
      requestType: type,
      sdp: data,
    });
  };
}
