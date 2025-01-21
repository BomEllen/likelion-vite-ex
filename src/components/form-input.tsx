import { useId } from 'react';

interface FormInputProps {
  type?:
    | 'text'
    | 'range'
    | 'password'
    | 'number'
    | 'search'
    | 'color'
    | 'email';
  label: string;
  placeholder?: string;
  value?: string | number;
  defaultValue?: string | number;
  readOnly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  [property: string | number]: unknown;
}

function FormInput({
  type = 'text',
  label,
  placeholder,
  value,
  defaultValue,
  readOnly,
  onChange,
  ...restProps
}: FormInputProps) {
  const inputId = useId();

  return (
    <div className="formControl">
      <label htmlFor={inputId}>{label}</label>
      <input
        type={type}
        id={inputId}
        placeholder={placeholder}
        readOnly={readOnly}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        {...restProps}
      />
    </div>
  );
}

export default FormInput;
