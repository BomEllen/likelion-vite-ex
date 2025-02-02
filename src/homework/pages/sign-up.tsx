import S from './sign-up.module.css';
import FormInput from '../components/form-input';
import ActionButton from '../components/action-button';

function HomeworkSignUpForm() {
  return (
    <section>
      <h3 className="sr-only">회원가입 폼</h3>
      <form className={S.signUpForm}>
        <FormInput label="이름" name="username" placeholder="2글자 이상" />
        <FormInput
          type="email"
          label="이메일"
          name="usermail"
          placeholder="user@company.io"
        />
        <FormInput
          type="password"
          label="패스워드"
          name="userpassword"
          placeholder="숫자, 영문 조합 6자리 이상 입력"
          hasToggleButton
        />
        <FormInput
          type="password"
          label="패스워드 확인"
          name="userpasswordConfirm"
          placeholder="입력한 패스워드 다시 입력"
          hasToggleButton
        />
        <ActionButton>회원가입</ActionButton>
      </form>
    </section>
  );
}

export default HomeworkSignUpForm;
