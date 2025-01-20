import express from 'express';

// Express {}
const app = express();

// 라우팅(Routing)
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
