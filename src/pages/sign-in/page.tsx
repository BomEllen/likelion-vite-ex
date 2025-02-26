import ActionButton from '@/components/action-button';
import FormInput from '@/components/form-input';
import { isEmail, isPassword } from '@/lib/validator';
import { useState } from 'react';
import S from './style.module.scss';
import Title from '@/components/title';
import { Link } from 'react-router';

interface SignInFormData {
  useremail: string;
  userpassword: string;
}

type SignInError = Record<keyof SignInFormData, Error | null>;

interface EventData {
  name: keyof SignInFormData;
  value: string;
}

function SignInPage() {
  const [formData, setFormData] = useState<SignInFormData>({
    useremail: '',
    userpassword: '',
  });

  const [error, setError] = useState<SignInError>({
    useremail: null,
    userpassword: null,
  });

  const isAllInputted =
    formData.useremail.length > 0 && formData.userpassword.length > 0;
  const isAllValid = Object.values(error).every((e) => e === null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget as EventData;

    switch (name) {
      case 'useremail': {
        setError((error) => ({
          ...error,
          useremail: !isEmail(value)
            ? new Error('올바른 이메일 형식을 입력하세요.')
            : null,
        }));
        break;
      }
      case 'userpassword': {
        setError((error) => ({
          ...error,
          userpassword: !isPassword(value, { min: 6 })
            ? new Error('숫자, 영문 조합 6자리 이상 입력하세요.')
            : null,
        }));
        break;
      }
    }

    const nextFormData = {
      ...formData,
      [name]: value,
    };

    setFormData(nextFormData);
  };

  const handleSignIn = async (formData: FormData) => {
    if (!isAllInputted) return;
    if (!isAllValid) {
      return alert('입력 내용 중에 오류가 있습니다.');
    }

    const response = await fetch('http://localhost:4000/api/signin', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <>
      <Title>사용자 로그인 폼</Title>
      <div className="flex flex-col gap-10">
        <section>
          <h3 className="sr-only">로그인 폼</h3>
          <form className={S.signInForm} action={handleSignIn}>
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
              hasToggleButton
              value={formData.userpassword}
              onChange={handleChange}
              hasError={error.userpassword}
            />
            <ActionButton aria-disabled={!isAllInputted}>로그인</ActionButton>
          </form>
        </section>
        <p className="text-white text-center">
          아직 가입하지 않았나요?{' '}
          <Link to="/dashboard/signup" className="text-sky-400">
            회원가입
          </Link>
          하세요!
        </p>
      </div>
    </>
  );
}

export default SignInPage;
