import ActionButton from '@/components/action-button';
import FormInput from '@/components/form-input';
import Title from '@/components/title';
import { isEmail, isPassword } from '@/lib/validator';
import { useState } from 'react';
import { Link } from 'react-router';
import S from './style.module.css';

interface SignUpFormData {
  username: string;
  useremail: string;
  userpassword: string;
  userpasswordConfirm: string;
}

type SignUpError = Record<keyof SignUpFormData, Error | null>;

interface EventData {
  name: keyof SignUpFormData;
  value: string;
}

function SignUpPage() {
  const [formData, setFormData] = useState<SignUpFormData>({
    username: '',
    useremail: '',
    userpassword: '',
    userpasswordConfirm: '',
  });

  const [error, setError] = useState<SignUpError>({
    username: null,
    useremail: null,
    userpassword: null,
    userpasswordConfirm: null,
  });

  const isAllInputed = Object.values(formData).every(Boolean);
  const isAllValid = Object.values(error).every((e) => e === null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget as EventData;

    switch (name) {
      case 'username': {
        const valueLength = value.trim().length;
        setError((error) => ({
          ...error,
          username:
            valueLength < 2
              ? new Error('이름은 2글자 이상입력해야 합니다.')
              : null,
        }));
        break;
      }
      case 'useremail': {
        setError((error) => ({
          ...error,
          useremail: !isEmail(value.trim())
            ? new Error('올바른 이메일 형식을 입력하세요.')
            : null,
        }));
        break;
      }
      case 'userpassword': {
        setError((error) => ({
          ...error,
          userpassword: !isPassword(value.trim(), { min: 6 })
            ? new Error('숫자, 영문 조합 6자리 이상 입력하세요.')
            : null,
        }));
        break;
      }
      case 'userpasswordConfirm': {
        setError((error) => ({
          ...error,
          userpasswordConfirm:
            formData.userpassword !== value.trim()
              ? new Error('입력한 패스워드와 동일하게 입력해야 합니다.')
              : null,
        }));
      }
    }

    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSignUp = (formData: FormData) => {
    if (isAllValid) {
      console.log(Object.fromEntries(formData));
    } else {
      alert('입력 내용 중에 오류가 있습니다.');
    }
  };

  return (
    <>
      <Title>사용자 가입 폼</Title>
      <div className="flex flex-col gap-10">
        <section>
          <h3 className="sr-only">회원가입 폼</h3>
          <form className={S.signUpForm} action={handleSignUp}>
            <FormInput
              label="이름"
              name="username"
              placeholder="2글자 이상"
              value={formData.username}
              onChange={handleChange}
              hasError={error.username}
            />
            <FormInput
              type="email"
              label="이메일"
              name="useremail"
              placeholder="user@company.io"
              value={formData.useremail}
              onChange={handleChange}
              hasError={error.useremail}
            />
            <FormInput
              type="password"
              label="패스워드"
              name="userpassword"
              placeholder="숫자, 영문 조합 6자리 이상 입력"
              value={formData.userpassword}
              onChange={handleChange}
              hasError={error.userpassword}
              hasToggleButton
            />
            <FormInput
              type="password"
              label="패스워드 확인"
              name="userpasswordConfirm"
              placeholder="입력한 패스워드 다시 입력"
              value={formData.userpasswordConfirm}
              onChange={handleChange}
              hasError={error.userpasswordConfirm}
              hasToggleButton
            />
            <ActionButton aria-disabled={!isAllInputed}>회원가입</ActionButton>
          </form>
        </section>
        <p className="text-white text-center">
          이미 가입했나요?{' '}
          <Link to="/dashboard/signin" className="text-sky-400">
            로그인
          </Link>
          하세요!
        </p>
      </div>
    </>
  );
}

export default SignUpPage;
