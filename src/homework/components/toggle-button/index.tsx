import { tm } from '@/utils/tw-merge';

type ToggleButtonProps = React.ComponentProps<'button'> & {
  label: string;
  isOff?: boolean;
  onRender?: React.ReactElement;
  offRender?: React.ReactElement;
};

function ToggleButton({
  label,
  isOff = true,
  onRender,
  offRender,
  className = '',
  ...buttonProps
}: ToggleButtonProps) {
  const buttonStyles = tm(
    `flex justify-center items-center`,
    `size-8 rounded-md border-0 px-0 py-0 bg-transparent`,
    `leading-none`,
    `hover:not-[:disabled,[aria-disabled=true]]:bg-black/10`,
    // { 'bg-sky-300': !isOff },
    className
  );

  return (
    <button className={buttonStyles} {...buttonProps}>
      {isOff ? offRender : onRender}
      <span className="sr-only">{label}</span>
    </button>
  );
}

export default ToggleButton;
