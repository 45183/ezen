// http 메서드 대신 express 호출
const express = require("express");
// 익스프레스 객체 소환 & app 변수 할당
const app = express();

const port = 3000;  // 포트 3000 할당

app.get("/", (req, res) => {    // 요청이 오는 경우 실행
    // 문서 해석종류 및 다국어 지원여부 결정
    res.set({"Content-Type" : "text/html; charset=utf-8"})
    res.end("express test");
})

app.listen(port, () => {    // 서버를 켜서 클라이언트 요청 기다림
    console.log(`서버 구동 : use ${port}`)
})