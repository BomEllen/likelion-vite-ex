import { useState } from 'react';

interface ResponseDataType {
  id: string;
  name: string;
  email: string;
  profileImage: string;
}

function SignUpForm() {
  const [responseData, setResponseData] = useState<null | ResponseDataType>(
    null
  );

  const [error, setError] = useState<null | Error>(null);

  const handleSubmitAction = async (formData: FormData) => {
    try {
      const response = await fetch('http://localhost:4000/api/signup', {
        method: 'POST',
        body: formData,
      });

      const jsonData = await response.json();

      if (response.status >= 400) {
        throw new Error((jsonData as { message: string }).message);
      }

      setResponseData(jsonData as ResponseDataType);
    } catch (error) {
      setError(error as Error);
    }
  };

  // 조건부 렌더링
  // 오류가 발생한 경우 오류 메시지 출력 (UI 화면)
  if (error) {
    return (
      <div
        role="alert"
        style={{
          color: '#dc362f',
          display: 'flex',
          flexFlow: 'column',
          gap: 0,
          marginBlock: 20,
        }}
      >
        <h2 style={{ margin: 0 }}>{error.name}</h2>
        <p style={{ margin: 0 }}>{error.message}</p>
      </div>
    );
  }

  // 회원가입 이후 가입 사용자 정보 (UI 화면)
  if (responseData) {
    return (
      <article className="UserProfile" id={responseData.id}>
        <h2 className="UserProfile--name">{responseData.name}</h2>
        <img
          src={`http://localhost:4000${responseData.profileImage}`}
          alt=""
          width={64}
          height={64}
        />
        <p>{responseData.email}</p>
      </article>
    );
  }

  // 회원가입 폼 (UI 화면)
  return (
    <section style={{ marginInline: 48 }}>
      <h2>회원가입 폼</h2>
      <form
        // onSubmit={handleSubmitPromise}
        action={handleSubmitAction}
      >
        <div style={{ marginBlockEnd: 8 }}>
          <label htmlFor="usernameSignUp">이름</label>
          <input type="text" name="username" id="usernameSignUp" />
        </div>
        <div style={{ marginBlockEnd: 8 }}>
          <label htmlFor="userEmailSignUp">이메일</label>
          <input type="email" name="useremail" id="userEmailSignUp" />
        </div>
        <div style={{ marginBlockEnd: 8 }}>
          <label htmlFor="userPasswordSignUp">패스워드</label>
          <input type="password" name="userpassword" id="userPasswordSignUp" />
        </div>
        <div style={{ marginBlockEnd: 8 }}>
          <label htmlFor="userProfileSignUp">프로필 이미지</label>
          <input
            type="file"
            name="userprofile"
            id="userProfileSignUp"
            accept=".jpg,.jpeg,.png,.svg,.webp"
          />
        </div>
        <button type="submit">회원가입</button>
      </form>
    </section>
  );
}

export default SignUpForm;
