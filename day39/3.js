// if 절은 중간에 조건이 추가되면 실수할 수 있으므로
// 라우팅 함수 추가 리팩도링


const http = require("http");
const url = require("url");
http
    .createServer((req, res) => {
        const path = url.parse(req.url, true).pathname;
        res.setHeader("Content-Type", "text/html; charset=utf-8");

        if(path in urlMap){         // urlMap에 path가 있는지 확인
            urlMap[path](req, res); // 매핑된 path값에 해당하는 함수 실행
        } else {
            notFound(req, res);
        }
    })
    .listen("3000", () => console.log("라우터를 만들어 보자!"));


const user = (req, res) => {
    res.end("[user] name : andy, age: 30");
};
const user1 = (req, res) => {
    res.end("[user] name : asdf, age: 22");
};
const user2 = (req, res) => {
    res.end("[user] name : dasd, age: 24");
};
const user3 = (req, res) => {
    res.end("[user] name : bzxc, age: 26");
};
const user4 = (req, res) => {
    res.end("[user] name : czxdas, age: 28");
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


// 가장 아래에 있어야 함 -> user, user1 ~ user4, feed 가 정의된 다음 나와야 함
const urlMap = {
    "/" : (req, res) => res.end("home"),
    "/user" : user,
    "/user1" : user1,
    "/user2" : user2,
    "/user3" : user3,
    "/user4" : user4,
    "/feed" : feed,
}

