import classNames from 'classnames';
import React from 'react';

interface ButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
}

const Button = ({ text, onClick, className = '' }: ButtonProps) => {
  return (
    <div
      className={classNames(
        'border border-blue-300 p-2 rounded-xl text-center cursor-pointer hover:bg-blue-300 hover:text-white transition-all',
        className
      )}
      onClick={() => onClick()}
    >
      {text}
    </div>
  );
};

export default Button;
