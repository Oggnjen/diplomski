import Button from '@/app/common-components/Button';
import TextInput from '@/app/common-components/TextInput';
import { useRedirectIfUserLogged } from '@/app/utils/auth';
import { useRegistration } from '@/backend-layer/registration';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const registration = () => {
  useEffect(() => {
    useRedirectIfUserLogged();
  }, []);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const register = useRegistration();
  const router = useRouter();
  return (
    <div className='flex justify-center items-center h-screen bg-[#93d4f5]'>
      <div className='p-4 border border-blue-600 w-[500px] mb-[200px] bg-slate-50 shadow-2xl rounded-xl font-thin'>
        <TextInput value={email} setValue={setEmail} label='Email' />
        <TextInput value={password} setValue={setPassword} password label='Password' />
        <TextInput value={name} setValue={setName} label='Name' />
        <TextInput value={surname} setValue={setSurname} label='Surname' />
        <div className='flex justify-around mt-4'>
          <Button text='Login' onClick={() => router.push('/login')} />
          <Button text='Register' onClick={() => register(email, password, name, surname)} />
        </div>
      </div>
    </div>
  );
};

export default registration;
