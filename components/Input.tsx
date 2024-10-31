import React from 'react';

interface InputProps extends Omit<React.HTMLProps<HTMLInputElement>, 'type'> {
  type?: 'text' | 'password' | 'email' | 'number';
  error?: string;
}

export const Input = (props: InputProps) => {
  const { type = 'text', error, ...rest } = props;

  return (
    <div className="w-full">
      <input
        className={`${error && 'border border-error'} ${type === 'number' ? 'no-arrows' : ''} bg-input text-text text-body-small pt-2.5 pb-2.5 pl-4 pr-4 outline-0 w-full rounded-[10px]`}
        type={type}
        {...rest}
      />
      {error && <p className="text-error">{error}</p>}
    </div>
  );
};
