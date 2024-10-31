interface ButtonProps extends Omit<React.HTMLProps<HTMLButtonElement>, 'type'> {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  variant: 'submit' | 'cancel';
}

export const Button = (props: ButtonProps) => {
  const { text, type = 'button', variant, ...rest } = props;

  return (
    <button
      className={`flex items-center justify-center ${variant === 'submit' ? 'bg-primary' : 'bg-transparent border border-text'} text-heading-6 text-text rounded-[10px] pl-7 pr-7 pb-[15px] pt-[15px] min-w-[180px] w-full`}
      type={type}
      {...rest}
    >
      {text}
    </button>
  );
};
