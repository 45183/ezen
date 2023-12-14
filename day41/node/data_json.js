const fs = require('fs');   // html을 읽을 때 쓰이는데, JSON 읽을 때도 사용
const path = require('path');   // 파일의 경로를 지정할 라이브러리

const express = require('express');

const app = express();
app.use(express.urlencoded({extended: false}))

// 현재 시간을 표시하는 세부주소를 설정하고 API GET메서드를 사용하여 데이터를 가져온다.
app.get('/currenttime', function(req, res){
    res.send('<h1>' + new Date().toISOString() + '</h1>');   // 제목 태그를 만들어서 현재 시간을 표시
});

// 이름을 입력받는 폼 페이지
app.get('/', function(req, res){
    res.send('<form action="/store-user" method="POST"><label>이름</label><input type="text" name="username"><button>제출</button></form>');
});

app.post('/store-user', function(req, res){
    const userName = req.body.username;     // post 요청을 통해서 사용자 이름을 가져온다.
    const filePath = path.join(__dirname, 'data', 'users.json');    // 사용자 정보를 저장할 json 파일 경로와 파일을 지정
    const fileData = fs.readFileSync(filePath);
    const existingUsers = JSON.parse(fileData); // JSON 데이터는 데이터 해석(데이터 처리)가 필요 (일반 문자열 데이터화 시켜야 작업이 됨)
    existingUsers.push(userName);
    fs.writeFileSync(filePath, JSON.stringify(existingUsers));
    res.writeHead(201, {"Content-Type": "text/html; charset=utf-8"});
    res.end('<h1>이름이 저장되었습니다</h1>');
});

app.get('/users', function(req, res){
    const filePath = path.join(__dirname, 'data', 'users.json');
    const fileData = fs.readFileSync(filePath);
    const existingUsers = JSON.parse(fileData);
    // 입력 정보를 나열하기 위한 ul 리스트를 시작
    let responseData = '<ul>'

    for(const user of existingUsers){
        responseData += '<li>' + user + '</li>'
    }

    // ul 리스트를 닫음
    responseData += '</ul>';
    // 준비한 ul 태그 리스트를 표시 (JSON에 입력받는 정보들)
    res.send(responseData); 
});

app.listen(3000, () => {
    console.log('3000번 포트에서 서버 대기중')
});