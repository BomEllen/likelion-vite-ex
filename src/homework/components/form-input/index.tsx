import { useId, useState } from 'react';
import { IconEyeOff, IconEyeOn } from '../icon-eye';
import ToggleButton from '../toggle-button';
import S from './style.module.css';

type FormInputProps = React.ComponentProps<'input'> & {
  label: string;
  hasToggleButton?: boolean;
  hasError?: Error | null;
};

function FormInput({
  label,
  hasToggleButton = false,
  hasError,
  type = 'text',
  ...inputProps
}: FormInputProps) {
  const id = useId();
  const descId = useId();

  const [isOff, setIsOff] = useState(true);

  const handleToggle = () => {
    setIsOff((isOff) => !isOff);
  };

  const inputType = type === 'password' && !isOff ? 'text' : type;

  const buttonLabel = `패스워드 ${isOff ? '표시' : '감춤'}`;

  return (
    <>
      <div className={S.formInput}>
        <label htmlFor={id}>{label}</label>
        <div className={S.group}>
          <input
            id={id}
            type={inputType}
            aria-describedby={descId}
            {...inputProps}
          />
          {hasToggleButton && (
            <ToggleButton
              type="button"
              label={buttonLabel}
              title={buttonLabel}
              offRender={<IconEyeOff />}
              onRender={<IconEyeOn />}
              isOff={isOff}
              onClick={handleToggle}
            />
          )}
        </div>
      </div>
      {hasError && (
        <p
          id={descId}
          role="alert"
          aria-live="assertive"
          className="text-red-700 font-medium text-[13px] pl-4"
        >
          {hasError.message}
        </p>
      )}
    </>
  );
}

export default FormInput;
