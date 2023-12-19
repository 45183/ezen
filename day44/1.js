// express 부른 후에 express()를 실행
// 포트번호를 변수처리
const express = require('express');
const app = express();
const port = 3000;

// express는 경로처리 장점이 있음
// 어제의 경우 url 모듈을 따로 불러와서 추가적인 경로설정이 필요했음
app.get('/', (req, res) => {
    res.set({"Content-Type":"text/html; charset=utf-8"});
    res.end('express 테스트');
});

app.listen(port, () => {
    console.log(`${port}번 포트에서 서버 대기중`);
});

