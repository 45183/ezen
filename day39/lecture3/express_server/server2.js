//  express 기반의 서버는 코드가 어떻게 얼마나 바뀌는지

const express = require("express");
const url = require("url");
const app = express();
const port = 3000;


app.listen(port, () => {            // 서버를 켜서 클라이언트 요청을 기다림
    console.log('익스프레스 기반의 코드 리팩토링 테스트')
})

// get 메서드의 라우팅 설정 (get함수를 통한 페이지 주소 별 결과출력 방식 설정)

app.get("/", notFound);
app.get("/user", user);     // user라는 하위주소 따서 user 함수 실행
app.get("/feed", feed);     // feed라는 하위주소 따서 feed 함수 실행

function user(req, res){
    res.end("[user] name : andy, age: 30");
};

function feed(req, res){
    res.end(`<ul>
    <li>picture1</li>
    <li>picture2</li>
    <li>picture3</li>
    </ul>`
    );
};

function notFound(req, res){
    res.statusCode = 404;
    res.end("404 page not found"); 
};


// node.js 기본 문법과의 차이점
// 1. urlMap 함수로 관리하던 부분은 없어지고 app.get() 함수에 원하는 주소를 등록하여 쓰도록 변경, urlMap 함수와 같은 처리방식을 고안해야하는 불편한 점이 사라짐
// 2. res.json() 함수를 사용하면 응답을 json 형식으로 나타낼 수 있고 charset=utf-8 자동지원
// 3. 호이스팅 기능을 허용할 수 있어서 function 기반의 일반함수 형식으로 호이스팅 기능 사용 가능



// API (application programming interface)
// 프로그램에서 다른 프로그램의 기능을 사용할 수 있게 해주는 규약