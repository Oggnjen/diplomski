import { useRouter } from 'next/router';
import { useCallId } from '.';
import { exitCall } from './callStoreService';
import { toast } from 'react-toastify';

export function useExitCall() {
  const callId = useCallId();
  const router = useRouter();
  return async () => {
    exitCall(callId).then((r) => {
      if (r.status == 200) {
        toast.info('Ended call');
        router.reload();
      } else {
        toast.warn('Error');
      }
    });
  };
}
