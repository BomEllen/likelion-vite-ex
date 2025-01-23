import './form-input.css';
import { useId, type ComponentProps } from 'react';
import FormRadioOrCheckbox from './form-radio-or-checkbox';

type FormInputProps = ComponentProps<'input'> & {
  label: string;
};

function FormInput({ label, type, ...restProps }: FormInputProps) {
  const inputId = useId();

  if (type === 'radio' || type === 'checkbox') {
    return <FormRadioOrCheckbox label={label} type={type} {...restProps} />;
  }

  return (
    <div className="FormInput">
      <label htmlFor={inputId}>{label}</label>
      <input type={type} id={inputId} {...restProps} />
    </div>
  );
}

export default FormInput;
