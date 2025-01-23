import { useId, type ComponentProps } from 'react';

type FormRadioOrCheckboxProps = ComponentProps<'input'> & {
  label: string;
};

function FormRadioOrCheckbox({
  label,
  type,
  ...restProps
}: FormRadioOrCheckboxProps) {
  const inputId = useId();

  switch (type) {
    case 'radio':
    case 'checkbox':
      return (
        <div className="formControl">
          <input type={type} id={inputId} {...restProps} />{' '}
          <label htmlFor={inputId}>{label}</label>
        </div>
      );
    default:
      return null;
  }
}

export default FormRadioOrCheckbox;
