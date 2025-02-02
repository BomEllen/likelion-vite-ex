import S from './style.module.css';

function ActionButton({
  type = 'submit',
  className = '',
  ...buttonProps
}: React.ComponentProps<'button'>) {
  const buttonStyles = `${S.actionButton} ${className}`.trim();

  return <button type={type} className={buttonStyles} {...buttonProps} />;
}

export default ActionButton;
