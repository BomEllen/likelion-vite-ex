import ActionButton from '../components/action-button';
import FormInput from '../components/form-input';
import S from './sign-in.module.scss';
import { useState } from 'react';

interface SignInForm {
  useremail: string;
  userpassword: string;
}

function HomeworkSignIn() {
  const [formData, setFormData] = useState<SignInForm>({
    useremail: '',
    userpassword: '',
  });

  const isAllInputted = formData.useremail.length > 0 && formData.userpassword.length > 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    const nextFormData = {
      ...formData,
      [name]: value,
    };

    setFormData(nextFormData);
  };

  const handleSignIn = async (formData: FormData) => {
    if (!isAllInputted) return;

    const response = await fetch('http://localhost:4000/api/signin', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    console.log(data);
  };

  return (
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
        />
        <FormInput
          type="password"
          label="패스워드"
          name="userpassword"
          placeholder="숫자, 영문 조합 6자리 이상 입력"
          hasToggleButton
          value={formData.userpassword}
          onChange={handleChange}
        />
        <ActionButton aria-disabled={!isAllInputted}>로그인</ActionButton>
      </form>
    </section>
  );
}

export default HomeworkSignIn;
