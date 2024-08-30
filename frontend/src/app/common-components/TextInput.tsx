import React from 'react';

interface TextInputProps {
  value: string;
  setValue: (value: string) => void;
  label?: string;
  password?: boolean;
  className?: string;
}

const TextInput = ({ value, setValue, label, password = false, className = '' }: TextInputProps) => {
  return (
    <div className={'flex gap-2 justify-between ' + className}>
      {label && <label className='self-center'>{label}</label>}

      <input
        className='mt-2 border border-blue-400 max-w-[400px] h-[40px] p-2 rounded-lg'
        type={password ? 'password' : 'text'}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default TextInput;
