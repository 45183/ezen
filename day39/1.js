// 코드 리팩토링
// 결과를 변경하지 않으면서 코드의 구조를 재조정하는 것
// 가독성과 유지보수 측면에서 진행함
// 가독성과 유지보수란 -> 함수처리를 통하여 자주 사용하는 기능을 따로 만들어줌


const http = require("http");
const url = require("url");
http
    .createServer((req, res) => {   // req, res를 인수로 받는 콜백함수의 설정에 유의
        const path = url.parse(req.url, true).pathname;
        res.setHeader("Content-Type", "text/html; charset=utf-8");

        if(path ==="/user"){
            user(req, res);     // user 함수를 설정 후 실행
        } else if (path ==="/feed") { 
            feed(req, res);     // feed 함수를 설정 후 실행
        } else {
            notFound(req, res)  // notFound 함수를 설정 후 실행
        }
    })
    .listen("3000", () => console.log("라우터를 만들어 보자!"));


const user = (req, res) => {
    res.end("[user] name : andy, age: 30");
};

const feed = (req, res) => {
    res.end(`<ul>
    <li>picture1</li>
    <li>picture2</li>
    <li>picture3</li>
    </ul>`
    );
};

const notFound = (req, res) => {
    res.statusCode = 404;
    res.end("404 page not found"); 
};




