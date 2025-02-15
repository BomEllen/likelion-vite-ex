import { useId } from 'react';

type AnimationControlProps = React.ComponentProps<'input'> & {
  label: string;
  onUpdate?: (value: number | string) => void;
};

function AnimationControl({
  label,
  children,
  ...inputProps
}: AnimationControlProps) {
  const id = useId();

  return (
    <div className="grid grid-cols-[60px_1fr_30px]">
      <label htmlFor={id} className="font-medium">
        {label}
      </label>
      <input id={id} type="range" {...inputProps} />
      <output className="place-self-end">{children}</output>
    </div>
  );
}

export default AnimationControl;
