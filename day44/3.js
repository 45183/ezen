const express = require('express');
const app = express();
const port = 3000;

// 게시글 리스트에 사용할 빈 데이터베이스를 할당
let posts = [];

// express의 json미들웨어 사용
// 게시글 -> 작성자 : hyun 처럼 key와 value로 데이터가 구성
app.use(express.json());

// key=value의 형태의 데이터를 해석해준단 의미
// application/x-www-form-urlencoded
// key=value 이런식의 데이터 -> json
// json 형식의 데이터가 오면 데이터를 해석해달라는 명령
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.json(posts);
});


// 입력된 데이터의 저장
app.post('/posts', (req, res) => {
    const {title, name, text} = req.body;
});

// 새로운 post 데이터 추가
posts.push({id: posts.length + 1, title, name, text, createDT: Date()});
res.json({title, name, text});

// : -> 동적 데이터 처리
app.delete('/posts/:id', (req, res) => {
    const id = req.params.id;
    // 해당 post.id를 제외 저장
    const filteredPosts = posts.filter((post) => post.id !== +id);
    // 글 데이터 삭제 여부의 확인 (true면 데이터가 삭제됨, false면 삭제되지 않음)
    const isLengthChanged = posts.length !== filteredPosts.length;
    // 글 삭제 이후 남은 글을 posts 변수에 저장
    posts = filteredPosts;
    // 게시글 삭제되면 ok로 응답
    if(isLengthChanged){
        res.json('ok');
        return;
    }
    res.json('not changed')
});


app.listen(port, () => {
    console.log(`${port}번 포트에서 대기중`)
})