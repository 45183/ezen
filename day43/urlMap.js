// urlMap 함수 연습

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
};

const urlMap = {
    '/' : (req, res) => res.end('home'),
    '/user' : user,
    '/feed' : feed,
}


const http = require('http');
const url = require('url');
http.createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;
    res.setHeader("Content-Type", "text/html; charset=utf-8");

    // // 아래를 살짝 고쳐서 
    // if(path === "/user"){
    //     user(req, res);
    // } else if(path === "/feed"){
    //     feed(req, res);
    // } else {
    //     notFound(req, res);
    // };

    if(path in urlMap){
        urlMap[path](req, res);
    } else {
        notFound(req, res);
    };
})
.listen(3000, () => console.log('라우터 만들기'));





// 호이스팅
hoisting();
// 일반 함수로 쓰면 호이스팅이 걸림
function hoisting(){
    console.log('호이스팅');
};
// 호이스팅이 되어서 출력됨


// 함수표현식으로 다시 쓰면 호이스팅을 막을 수 있다.
hoisting2();
const hoisting2 = () => console.log('호이스팅 막힘')