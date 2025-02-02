import S from './form-input.module.css';

import { type ComponentProps, useId, useState } from 'react';
import { IconEyeOff, IconEyeOn } from './icon-eye';

type FormInputProps = ComponentProps<'input'> & {
  label: string;
  hasToggleButton?: boolean;
};

function FormInput({
  label,
  hasToggleButton = false,
  type = 'text',
  ...inputProps
}: FormInputProps) {
  const id = useId();

  const [isOff, setIsOff] = useState(true);

  const handleToggle = () => {
    setIsOff((isOff) => !isOff);
  };

  if (type === 'password' && !isOff) {
    type = 'text';
  }

  const buttonLabel = isOff ? '표시' : '감춤';

  return (
    <div className={S.formInput}>
      <label htmlFor={id}>{label}</label>
      <div className={S.group}>
        <input type={type} id={id} {...inputProps} />
        {hasToggleButton && (
          <button
            type="button"
            title={`패스워드 ${buttonLabel}`}
            onClick={handleToggle}
          >
            {isOff ? <IconEyeOff /> : <IconEyeOn />}
            <span className="sr-only">패스워드 {buttonLabel}</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default FormInput;
