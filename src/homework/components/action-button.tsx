import S from './action-button.module.css';
import type { ComponentProps } from 'react';

function ActionButton({
  type = 'submit',
  className = '',
  ...buttonProps
}: ComponentProps<'button'>) {
  const classNames = `${S.actionButton} ${className}`.trim();

  return <button type={type} className={classNames} {...buttonProps} />;
}

export default ActionButton;
