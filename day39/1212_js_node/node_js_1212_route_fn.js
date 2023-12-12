// if절은 중간에 조건이 추가되면 실수할 수 있으므로 
// 라우팅 함수 추가 리팩토링

const http = require("http");
const url = require("url"); //url 모듈의 로딩
http
  .createServer((req, res) => {
    // req, res를 인수로 받는 콜백함수의 설정에 유의
    const path = url.parse(req.url, true).pathname;
    res.setHeader("Content-Type", "text/html; charset=utf-8");

    if (path in urlMap) { // urlMap에 path가 있는지 확인
        urlMap[path](req,res); //매핑된 path값에 해당하는 함수 실행
    } else {
        notFound(req,res);
    }
  })

  .listen("3000", () => console.log("라우터를 만들어 보자!"));

const user = (req, res) => {
    res.end("[user] name : andy, age: 30");
};

const user1 = (req, res) => {
    res.end("[user] name : sam, age: 21");
};

const user2 = (req, res) => {
    res.end("[user] name : dan, age: 28");
};

const user3 = (req, res) => {
    res.end("[user] name : ally, age: 20");
};

const user4 = (req, res) => {
    res.end("[user] name : mandy, age: 26");
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

const urlMap = {
    "/" : (req, res) => res.end("home"),
    "/user" : user,
    "/user1" : user1,
    "/user2" : user2,
    "/user3" : user3,
    "/user4" : user4,

    "/feed" : feed,
}