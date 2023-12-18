// 서버는 기본적으로 프론트엔드 서비스 이용자의 요청과 서버측의 응답으로
// 프론트엔드 서비스의 데이터 흐름을 처리한다.
// 프론트엔드 서비스가 적절한 인터넷 주소를 받아서 온라인으로 올라가면 서버는 크게
// 1. http 모듈로 서버를 설정한다. - require("http")
// 2. http.createServer((req, res)) - 즉, 요청과 응닫 파트를 설정하고 
// 응답의 형태를 설정한다. res.setHeader("Content-Type", "text/html")
// html문서의 형태일지 문자열 데이터 자체일지 res.setHeader("Content-Type", "text/plain")
// 잘 처리되었다면 '성공' 메세지를 전달 (200번대)


// node.js 첫 예시
const http = require('http');
const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.end('OK');
});

server.listen(3000, () => console.log('서버 시작'));



// 프론트엔드 서비스는 여러 세부 페이지로 나누어져 있다.
// 즉, 우리의 서비스는 복수의 세부 페이지에 해당하는 세부 주소들이 필요하다.
// 우리 서비스의 세부주소에 해당하는 경로 (route - 라우트)를 설정하는데
// url 모듈을 사용한다.
// url 경로에 따라서 준비된 다른 웹페이지를 보이는데
// url 경로에 따른 각기 다른 응답을 주는 기능을 라우팅이라고 한다.
// url 경로를 읽기 위한 모듈이 url 모듈이다.


// http://www.park5430.dothome.co.kr:8000/users
//          도메인명               포트번호 세부주소


const http = require('http');
const url = require('url');
http.createServer((req, res) => {
    // url 기능을 써서 세부주소를 활용할 수 있게 path 변수 선언
    const path = url.parse(req.url, true).pathname;
    // 다국어 지원 옵션 추가
    res.setHeader("Content-Type", "text/html; charset=utf-8");

    // 세부주소를 설정해서 세부주소에 맞는 컨턴츠 준비
    if(path === "/user"){
        res.end("[user] name: andy, age: 30");
    } else if(path === "/feed"){
        res.end(`<meta charset="UTF-8"
        <ul>
        <li>picture1</li>
        <li>picture2</li>
        <li>picture3</li>
        </ul>
        `);
    } else {
        res.statusCode = 404;
        res.end("404 page not found");
    };
})
.listen(3000, () => console.log('라우터 만들기'));



// 코드 리팩토링 소개 - 함수로 나누어서
// 코드 재사용 + 가독성 확보
// 결과를 변경시키지 않으면서 구조를 재조정하는 것

const user = (req, res) => {
    res.end("[user] name: andy, age: 30");
};

const feed = (req, res) => {
    res.end(`<meta charset="UTF-8"
    <ul>
    <li>picture1</li>
    <li>picture2</li>
    <li>picture3</li>
    </ul>
    `);
};

const notFound = (req, res) => {
    res.statusCode = 404;
    res.end("404 page not found");
}


const http = require('http');
const url = require('url');
http.createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;
    res.setHeader("Content-Type", "text/html; charset=utf-8");

    if(path === "/user"){
        user(req, res);
    } else if(path === "/feed"){
        feed(req, res);
    } else {
        notFound(req, res);
    };
})
.listen(3000, () => console.log('라우터 만들기'));