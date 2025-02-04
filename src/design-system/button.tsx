import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  // 기본 클래스 이름 ( string | string[] | clsx 값 )
  'font-semibold border-1 rounded',
  // 구성 옵션
  {
    // 변형 스키마 (기본)
    variants: {
      // 컴포넌트 속성
      intent: {
        // 속성 값 (스타일)
        primary: 'bg-blue-500 text-white border-transparent rounded-md',
        secondary: 'bg-white text-gray-800 border-slate-200 rounded-md',
      },
      // 컴포넌트 속성
      size: {
        // 속성 값 (스타일)
        small: 'text-sm py-1 px-2',
        medium: 'text-base py-2 px-4',
      },
      // 컴포넌트 속성
      disabled: {
        // 속성 값 (스타일)
        true: 'opacity-50 cursor-not-allowed',
        false: null,
      },
    },
    // 복합 변형 (변형 스키마를 기반으로 복합 변형 구성)
    compoundVariants: [
      // primary 버튼 컴포넌트 호버 스타일링
      {
        intent: 'primary',
        disabled: false,
        className: 'hover:bg-blue-600',
      },
      // secondary 버튼 컴포넌트 호버 스타일링
      {
        intent: 'secondary',
        disabled: false,
        className: 'hover:bg-gray-100',
      },
      // medium 크기 primary 버튼 컴포넌트 텍스트 대문자 스타일링
      {
        intent: 'primary',
        size: 'medium',
        className: 'uppercase',
      },
    ],
    // 기본 변형 값 구성
    defaultVariants: {
      intent: 'primary',
      size: 'medium',
      disabled: false,
    },
  }
);

type DS_ButtonProps = Omit<React.ComponentProps<'button'>, 'disabled'> &
  VariantProps<typeof buttonVariants>;

function DS_Button({
  intent,
  size,
  disabled,
  className,
  ...restProps
}: DS_ButtonProps) {
  return (
    <button
      type="button"
      className={buttonVariants({ intent, size, disabled, className })}
      {...restProps}
    />
  );
}

export default DS_Button;
