import Button from '@/app/common-components/Button';
import TextInput from '@/app/common-components/TextInput';
import { useRedirectIfUserLogged } from '@/app/utils/auth';
import { useLogin } from '@/backend-layer/login';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const login = () => {
  useEffect(() => {
    useRedirectIfUserLogged();
  }, []);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useLogin();
  const router = useRouter();
  return (
    <div className='flex justify-center items-center h-screen bg-[#93d4f5]'>
      <div className='p-4 border border-blue-600 w-[500px] mb-[200px] bg-slate-50 shadow-2xl rounded-xl font-thin'>
        <TextInput value={email} setValue={setEmail} label='Email' />
        <TextInput value={password} setValue={setPassword} password label='Password' className='mt-[20px]' />
        <div className='flex w-full justify-around mt-[30px]'>
          <Button text='Register' onClick={() => router.push('/registration')} className='mt-2' />
          <Button text='Login' onClick={() => login(email, password)} className='mt-2' />
        </div>
      </div>
    </div>
  );
};

export default login;
