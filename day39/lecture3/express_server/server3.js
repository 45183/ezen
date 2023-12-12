// API 규칙에 맞게 서버 구현하기

const express = require("express");
const app = express();
const port = 3000;
let posts = [];      // 게시글 리스트로 사용할 글 저장 등을 위한 공간 할당

// 주의) 게시판 데이터를 다룰 때는 json 형식을 사용해야 한다.
app.use(express.json());    // json 미들웨어 활성화

// urlencoded 타입인 경우 데이터 해석
// urlencoded = application/x-www-form-urlencoded
// 무슨 말이냐면, body에 키=값&키=값 조합 형태의 데이터를 의미
app.use(express.urlencoded({extended : true}));


app.get("/", (req, res) => {    // 기본주소로 요청이 오면 실행
    res.json(posts)             // 게시글 리스트를 json형식으로 보여줌
});

app.post("/posts", (req, res) => {    // post로 요청이 오면 실행
    const {title, name, text} = req.body;   // http 요청의 body 데이터를 변수에 할당

    // 게시글 리스트에 새로운 게시글 정보 추가
    posts.push({id : posts.length+1, title, name, text, createDt : Date()});
    res.json({title, name, text})
});

// 게시글 아이디가 id인 글을 삭제
app.delete("/posts/:id", (req, res) => {
    // 설정한 세부주소 정보에서 id값을 가져온다.
    const id = req.params.id;
    // 게시판의 글에서 id 아닌 친구들의 글만 뽑아서 filterPosts에 다시 할당
    const filteredPosts = posts.filter((post) => post.id !== +id)
    // 기존 게시판의 글의 길이와 필터링된 게시판 글의 길이를 비교 (글의 삭제 여부 체크)
    // 뭔가 삭제되었다면 아래 데이터의 길이가 달라지면서 조건이 참이 될 것
    // 그래서 삭제된게 있는지 여부 판단
    const isLengthChanged = posts.length !== filteredPosts.length;
    posts = filteredPosts;
    if(isLengthChanged){
        // 삭제 성공 메세지 출력
        res.json("ok");
        return; // 함수 종료
    }
    res.json("삭제되지 않음");
});

app.listen(port, () => {
    console.log(`API 기능 테스트`)
})