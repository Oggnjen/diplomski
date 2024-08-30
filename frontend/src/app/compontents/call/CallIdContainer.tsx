import Button from '@/app/common-components/Button';
import { useCallId } from '@/backend-layer/call';
import { toast } from 'react-toastify';

export function CallIdContainer() {
  const callId = useCallId();

  return (
    <div className='flex justify-between my-4 gap-2 p-2'>
      <div className='self-center'>{callId}</div>
      <Button
        text='Copy'
        onClick={() => {
          navigator.clipboard.writeText(callId);
          toast.success('Successfully copied');
        }}
      />
    </div>
  );
}
