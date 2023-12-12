// http 메서드? 대신 express 호출
const express = require("express");
// 익스프레스 객체소환 & app 변수 할당
const app = express();

const port = 3000; // 포트는 3000 할당

app.get("/", (req,res) => { //요청이 오는 경우 실행
    // 문서 해석종류 및 다국어 지원여부 설정
res.set({"Content-Type": "text/html; charset=utf-8"});
res.end("안녕 express, 반가워"); 
});

app.listen(port, () => { //서버를 켜서 클라이언트 요청을 기다림
    console.log(`서버를 구동하라: use ${port}`);
});