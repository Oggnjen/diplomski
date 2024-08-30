import { useHiddenMembers, useMembers, useShowMemberAsBig } from '@/backend-layer/call';
import { useState } from 'react';

export function HiddenMembers() {
  const members = useHiddenMembers();
  const showMemberAsBig = useShowMemberAsBig();
  const [isShowing, setIsShowing] = useState(false);
  if (members.length == 0) {
    return <></>;
  } else {
    return (
      <>
        <div>
          <button
            className={`absolute right-0 top-0 m-4 bg-blue-500 text-white px-3 py-2 rounded-full ${
              isShowing ? 'hidden' : 'block'
            }`}
            onClick={() => setIsShowing(true)}
          >
            <img src='/icons/members.svg' width={20} />
            <div className='absolute left-1 bg-red-600 rounded-full w-5 z-[1001]'>{members.length}</div>
          </button>
          <div className={`transition-all duration-500 ${isShowing ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className=' bg-white right-0 top-0 absolute w-[400px] h-full mb-[60px] z-[1001]'>
              <button className='bg-blue-500 text-white px-3 py-2 rounded-full m-4' onClick={() => setIsShowing(false)}>
                <img src='/icons/close.svg' width={20} />
              </button>
              <div className='p-4'>
                {members.map((m) => (
                  <div className='border border-blue-500 rounded-lg p-2 flex justify-between mt-2'>
                    <div>
                      {m.name} {m.surname}
                    </div>
                    <button onClick={() => showMemberAsBig(m)}>
                      <img src='/icons/show.svg' width={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
