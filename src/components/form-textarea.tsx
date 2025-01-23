import './form-textarea.css';
import { useId, type ComponentProps } from 'react';

type FormTextAreaProps = ComponentProps<'textarea'> & {
  label: string;
  resize?: 'both' | 'vertical' | 'horizontal' | 'none';
};

function FormTextArea({
  label,
  resize = 'both',
  ...restProps
}: FormTextAreaProps) {
  const id = useId();

  return (
    <div className="FormTextArea">
      <label htmlFor={id}>{label}</label>
      <textarea id={id} cols={60} rows={4} style={{ resize }} {...restProps} />
    </div>
  );
}

export default FormTextArea;
