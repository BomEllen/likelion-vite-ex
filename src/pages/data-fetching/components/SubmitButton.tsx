import { Spinner } from '@mynaui/icons-react';
import { useFormStatus } from 'react-dom';

function SubmitButton({
  size = 24,
  label = '보내기',
  children,
  ...restProps
}: {
  size?: number;
  label?: string;
  children: React.ReactNode;
}) {
  const { pending } = useFormStatus();

  const buttonLabel = pending ? '대기...' : label;

  return (
    <button
      type="submit"
      className="p-1 bg-react text-white my-1 cursor-pointer"
      aria-label={buttonLabel}
      title={buttonLabel}
      {...restProps}
    >
      {pending ? (
        <Spinner size={size} className="animate-spin opacity-50" />
      ) : (
        children
      )}
    </button>
  );
}

export default SubmitButton;
