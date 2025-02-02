import cors from 'cors';
import express from 'express';
import { resolve } from 'node:path';
import fileUpload from 'express-fileupload';
import { createUser, isRegisteredUser, findUserByEmail } from './lib/user.js';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.static(resolve('./public')));
app.use(fileUpload());
app.use(cors());

app.post('/api/signin', async (request, response) => {
  const { useremail, userpassword } = request.body;

  if (!useremail || !userpassword) {
    return response
      .status(400)
      .send('로그인을 시도하려면 이메일, 패스워드 입력이 필요합니다.');
  }

  const result = await isRegisteredUser(useremail, userpassword); // null or true or false

  // null인 경우, 가입한 적이 없는 사용자 실패!
  if (result === null) {
    return response.status(400).send(`
      <p>${useremail} 이메일 계정으로 가입된 적이 없습니다.</p>
    `);
  }

  if (result) {
    // true인 경우, 패스워드가 유효한 사용자 (인증) 성공!
    // return response.status(200).send(`
    //   <p>${useremail} 계정으로 로그인 되었습니다.</p>
    // `);

    const user = await findUserByEmail(useremail);
    return response.status(200).json(user);
  } else {
    // false인 경우, 패스워드가 유효하지 않은 사용자 실패!
    return response.status(400).send(`
      <p>${useremail} 계정 패스워드가 잘못되었습니다.</p>
    `);
  }
});

app.post('/api/signup', async (request, response) => {
  const { username, useremail, userpassword } = request.body;

  if (!username || !useremail || !userpassword) {
    return response.status(400).send(`
      <p style="color: red">회원가입에 필요한 이름, 이메일, 패스워드 모두 입력이 필요합니다.</p>
    `);
  }

  // 파일(files) 정보 접근
  const profileImage = request.files?.userprofile;
  let profileImagePath = '';

  if (profileImage) {
    await profileImage.mv(resolve('public/files', profileImage.name));
    profileImagePath = `/files/${profileImage.name}`;
  } else {
    console.log('이미지 없음');
  }

  try {
    // 새 사용자 생성 (백엔드 스토리지)
    const newUser = await createUser({
      name: username,
      email: useremail,
      password: userpassword,
      profileImage: profileImagePath,
    });

    if (newUser) {
      // response
      //   .status(201)
      //   .send(`${newUser.name}님! 회원가입에 성공했습니다. 😊`);
      const { password, ...user } = newUser;
      response.status(201).json(user);
    } else {
      response.status(400).json({
        message: `${username}님은 ${useremail} 이메일 주소로 회원 가입을 이미 하셨습니다. 😥`,
      });
    }
  } catch (error) {
    response.status(500).json(error);
  }
});

app.get('/api/hello', (request, response) => {
  const { username, useremail } = request.query;
  if (username && useremail) {
    response.status(200).send(`
      <h1>hello ${username}!</h1>
      <p>your email address is ${useremail}</p>
    `);
  } else {
    response
      .status(400)
      .send('<p>사용자 이름과 이메일이 전송되지 않았습니다. 😥</p>');
  }
});

app.listen(4000, () => {
  console.log('백엔드 프로그램 서버 구동 http://localhost:4000/api/hello');
});
