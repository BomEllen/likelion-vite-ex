import { useId, type ComponentProps } from 'react';

type FormRadioProps = ComponentProps<'input'> & {
  label: string;
};

function FormRadio({ label, ...restProps }: FormRadioProps) {
  const inputId = useId();

  return (
    <div className="formRadioControl">
      <input type="radio" id={inputId} {...restProps} />
      <label htmlFor={inputId}>{label}</label>
    </div>
  );
}

export default FormRadio;
