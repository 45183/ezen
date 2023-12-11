const http = require("http");
const url = require("url");     // url 모듈의 로딩
http
.createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;
    // url 모듈을 사용하여 요청으로 받은 url의 pathname을 얻어냄
    // pathname이란 예를 들어, localhost:3000/user라면 pathname은 /user 가 됨
    // pathname을 할당한다는 말
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    // 한글 사용을 위해 utf-8

    if(path === "/user"){   // /user로 요청이 온 경우
        res.end("[user] name : andy, age : 30");    // /user 이름 접근 시 이 결과값을 보여줌
    } else if(path === "/feed"){    // /feed로 요청이 온 경우
        res.end(`
        <ul>
        <li>picture1</li>
        <li>picture2</li>
        <li>picture3</li>
        </ul>
        `);
    } else {
        res.statusCode = 404;   // 지정된 pathname이 아닌 경우 에러 표시
        res.end("404 page not found");  // 페이지를 찾을 수 없습니다. (404 page not found)
    };
})      // 여기 ; 추가할 경우 에러 발생
// 포트 설정
.listen(3000, () => {
    console.log("라우터를 만들어 봅시다.")
});
