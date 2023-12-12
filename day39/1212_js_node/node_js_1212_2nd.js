// 동적 응답: 사용자의 응답에 따라 페이지가 표시하는 컨텐츠가 달라진다.

const http = require("http");
const url = require("url"); //url 모듈의 로딩
http
  .createServer((req, res) => {
    // req, res를 인수로 받는 콜백함수의 설정에 유의
    const path = url.parse(req.url, true).pathname;
    res.setHeader("Content-Type", "text/html; charset=utf-8");

    if (path === "/user") {
      user(req, res); // user 함수를 설정 후 실행
    } else if (path === "/feed") {
      feed(req, res);
    } else {
      notFound(req, res);
    }
  })

  .listen("3000", () => console.log("라우터를 만들어 보자!"));

const user = (req, res) => {
    //쿼리스트링 데이터를 userInfo 변수에 할당
  const userInfo = url.parse(req.url, true).query; 
  // 결과값으로 이름과 나이 설정
  res.end(`[user] name: ${userInfo.name}, age: ${userInfo.age}`);
};

const feed = (req, res) => {
  res.end(`<ul>
    <li>picture1</li>
    <li>picture2</li>
    <li>picture3</li>
    </ul>`);
};

const notFound = (req, res) => {
  res.statusCode = 404;
  res.end("404 page not found");
};
