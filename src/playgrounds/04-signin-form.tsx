function SignInForm() {
  return (
    <section style={{ marginInline: 48 }}>
      <h2>로그인 폼 (POST 메서드)</h2>
      <form action="http://localhost:4000/api/signin" method="POST">
        <div style={{ marginBlockEnd: 8 }}>
          <label htmlFor="userEmailSignIn">이메일</label>
          <input type="email" name="useremail" id="userEmailSignIn" />
        </div>
        <div style={{ marginBlockEnd: 8 }}>
          <label htmlFor="userPasswordSignIn">패스워드</label>
          <input type="password" name="userpassword" id="userPasswordSignIn" />
        </div>
        <button type="submit">로그인</button>
      </form>
    </section>
  );
}

export default SignInForm;
