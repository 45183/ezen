// 그렇다면 express 기반의 서버는 코드가 어떻게 
// 그리고 얼마나 달라지는가?

const express = require("express");
const url = require("url"); //url 모듈의 로딩
const app = express();
const port = 3000; // 포트는 3000 할당

app.listen(port, () => { //서버를 켜서 클라이언트 요청을 기다림
    console.log(`익스프레스 기반의 코드 리팩토링 테스트`);
});

// get 메서드의 라우팅 설정 (get함수를 통한 페이지 주소 별 결과출력 방식 설정)
app.get("/", notFound);
app.get("/user", user); // /user 이라는 하위주소 따서 user 함수실행
app.get("/feed", feed); // /feed 라는 하위주소 따서 feed 함수실행

function user(req, res) {
  res.json("[user] name : andy, age: 30");
};

function feed(_, res) {
  res.end(`<ul>
    <li>picture1</li>
    <li>picture2</li>
    <li>picture3</li>
    </ul>`);
};

function notFound(req, res) {
  res.statusCode = 404;
  res.end("404 page not found");
};
