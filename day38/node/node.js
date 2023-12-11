// http 객체 생성 
// require 함수란 모듈을 읽어오는 함수
// http 모듈을 불러와서 http 변수에 저장
const http = require("http");
let count = 0;  // 초기 count라는 변수를 0으로 설정
const server = http.createServer((req, res) => {    
    // createServer는 서버 인스턴스를 만드는 함수
    // 인수로 콜백 함수를 받는데 이 콜백함수는 요청과 응답 개체를 인수로 받는다.
    log(count)  // 카운트 1증가 - 요청에 대한 로그(기록)을 간단히 남김
    res.statusCode = 200;   // 상태코드를 의미하는데 200이란 뜻은 정상작동을 의미
    res.setHeader("Content-Type", "text/plain");    // 요청, 응답에 대한 부가정보  
    // 컨텐츠 타입을 언급하고 뒤에 컨텐츠의 종류를 기록, 지금 예시에서는 텍스트를 평문으로 해석하겠다는 의미
    // "text/html"이라 한다면 텍스트를 html 문서로 해석하겠다는 의미
    res.write("hello\n");   // 응답으로 hello\n을 출력
    setTimeout(() => {
        res.end("Node.js"); // 2초 후에 Node.js 출력
    }, 2000);
});

function log(count){
    console.log((count += 1));
};


// 8000번 포트를 사용하여 서버실행, 서버 실행되면 "hello Node.js" 메세지 출력
server.listen(3000, () => {
    console.log("hello Node.js");
});