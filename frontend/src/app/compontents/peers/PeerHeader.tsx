import { CallMember, useMemberPostion, useShowMemberAsBig, useShowMemberAsSmall } from '@/backend-layer/call';
import React, { useState } from 'react';

interface PeerProps {
  member: CallMember;
}

export function PeerHeader({ member }: PeerProps) {
  const showMemberAsBig = useShowMemberAsBig();
  const showMemberAsSmall = useShowMemberAsSmall();
  const memoizedMember = React.useMemo(() => member, [member]);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const position = useMemberPostion(member.memberId);
  const changeVisibility = () => {
    if (position == 2) {
      showMemberAsSmall(memoizedMember);
    } else if (position == 6 || position == 5 || position == 7) {
      showMemberAsBig(memoizedMember);
    }
  };
  return (
    <div className='relative '>
      <div className='absolute z-[1000] w-full'>
        <div>
          <div className='flex justify-between'>
            <div></div>
            <div className='text-center'>
              {memoizedMember.name} {memoizedMember.surname}
            </div>
            <div>
              <button
                className=' text-white px-3 py-2 rounded-full self-center'
                onClick={() => {
                  setSettingsVisible(!settingsVisible);
                }}
              >
                <img src='/icons/dots.svg' width={20} />
              </button>
              {settingsVisible && (
                <div
                  className='absolute  bg-white w-[150px] cursor-pointer p-2 hover:bg-blue-300 rounded-lg hover:text-white transition-all'
                  onClick={() => {
                    changeVisibility();
                    setSettingsVisible(false);
                  }}
                >
                  <div className='flex justify-center'>
                    <div className=''>{position == 2 ? 'Show smaller' : 'Show bigger'}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
