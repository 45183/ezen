// API 규칙에 맞게 서버 구현하기

const express = require("express");
const app = express();
const port = 3000; // 포트는 3000 할당
// 게시글 리스트로 사용할 글 저장 등을 위한 데이터 공간할당
let posts = []; 

// 게시판 데이터를 다룰 때는 json 형식을 사용해야 합니다. 주의하세요
app.use(express.json()); // json 미들웨어 활성화
// urlencoded 타입인 경우 데이터 해석
// urlencoded = application/x-www-form-urlencoded 
// 뭔말이냐면, body에 키=값&키=값 조합형태의 데이터를 의미함
app.use(express.urlencoded({ extended: true}));

app.get("/", (req,res) => { // 기본주소로 요청이 오면 실행
   res.json(posts); //게시글 리스트를 json형식으로 보여준다.
});

app.post("/posts", (req,res) => { // post로 요청이 오면 실행
    const {title, name, text} = req.body; //http 요청의 body데이터를 변수에 할당

    // 게시글 리스트에 새로운 게시글 정보 추가
    posts.push({ id: posts.length + 1, title, name, text, createDt: Date() });
    res.json({title, name, text});
 });

 // 게시글 아이디가 id인 글을 삭제
 app.delete("/posts/:id", (req,res) => {
    // 설정한 세부주소 정보에서 id 값을 가져온다.
const id = req.params.id; 
// 게시판의 글에서 id 아닌 친구들의 글만 뽑아서 filteredPosts에 다시 할당 합니다.
const filteredPosts = posts.filter((post) => post.id !== +id)
// 기존 게시판의 글의 길이와 필터링된 게시판 글의 길이를 비교
// 뭔가 삭제되었다면 아래 데이터의 길이가 달라지면서 조건이 참이 될 것이다.
// 그래서 삭제된게 있는지 여부를 판단
const isLengthChanged = posts.length !== filteredPosts.length;

posts = filteredPosts;
if (isLengthChanged) {
    // 삭제성공 메세지 출력 - ok
    res.json("ok"); 
    return;
}
res.json("달라진거 없음");
 })

 app.listen(port, () => { //서버를 켜서 클라이언트 요청을 기다림
    console.log(`API 기능을 써보자 ^^ ${port}`);
});