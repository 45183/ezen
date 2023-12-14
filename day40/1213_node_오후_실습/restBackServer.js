const http = require("http");
const fs = require("fs").promises; // .promises를 꼭 붙여야 fs.readFile 사용시 에러 안남

const users = {}; // 프론트에서로부터 요청 받은 데이터 저장

http
  .createServer(async (req, res) => {
    try {
      if (req.method === "GET") {
        //get 요청이 들어 올때
        // 대문자 GET으로 해야하는이유 프론트에서 요청 method가 GET으로 오기 때문

        //경로 요청 처리
        if (req.url === "/") {
          const data = await fs.readFile("./restFront.html");
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          return res.end(data);
        } else if (req.url === "/about") {
          const data = await fs.readFile("./about.html");
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          return res.end(data);
        } else if (req.url === "/users") {
          res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
          return res.end(JSON.stringify(users));
        } else {
          // 위 외의 기타 경로로 요청들어오면 처리하기
          try {
            const data = await fs.readFile(`.${req.url}`);
            return res.end(data);
          } catch (err) {
            // 주소에 해당하는 라우트를 찾지 못했을 경우 404 not found 에러 발생
            // res.writeHead(404);
            // return res.end("NOT FOUND"); 이부분이 문제여서 삭제가 되지 않았음
          }
        }
      } else if (req.method === "POST") {
        //
        //post 요청이 들어올 때 프론트엔드로부터 name 값을 전송 받음
        if (req.url === "/user") {
          let body = "";
          req.on("data", (data) => {
            body += data;
            // console.log("화면에서 post 전송시 받는 데이터", data); // <Buffer 7b 22 6e 61 6d 65 22 3a 22 eb 82 98 ec 97 b4 ec 8b ac 22 7d>
          });
          //'end'  모든 데이터를 다 받았을 경우
          return req.on("end", () => {
            console.log("post 본문:", body);
            const { name } = JSON.parse(body);
            const id = Date.now(); // 언제 등록했는지 log 기록을 남긴다
            users[id] = name; //users 데이터 변수 객체에 id를 부여하고 부여된 user의 값에 받아온 name을 부여한다
            console.log(users)
            res.writeHead(201, { "Content-Type": "text/html; charset=utf-8" });
            res.end("ok");
          });
        }
      } else if (req.method === "PUT") {
        if (req.url.startsWith("/user/")) {
          const key = req.url.split("/")[2]; // 경로에서 사용자 key 값 추출
          console.log(key);
          let body = "";
          req.on("data", (data) => {
            body += data;
          });
          return req.on("end", () => {
            console.log("put 본문:", body); // {'name': 사용자 인풋값}
            users[key] = JSON.parse(body).name;
            res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
            return res.end("ok");
          });
        } 
      }else if (req.method === "DELETE") {
        if (req.url.startsWith('/user/')) {
          const deleteUrl = req.url
          const key = req.url.split("/")[2];     //  슬래쉬를 기준으로 나눔 -> http://localhost:8082/user/1702483708421 일때 http:가 0번째 요소, localhost:8082가 1번째 요소, user가 2번째 요소, 마지막 1702483708421가 3번째 요소
          console.log('삭제시 url:',deleteUrl)
          console.log('삭제시 key:',key)
          delete users[key]; // delete 연산자는 객체의 속성(property)이나 배열의 요소를 제거하는 데 사용 -> delete 삭제할대상

          // 사용자에게 보낼 응답
          res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
          return res.end('ok');
        }
      }
      //method 4가지의 경로 요청이 아닌경우
      res.writeHead(404);
      return res.end("NOT FOUND");
    } catch (err) {
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end('Internal Server Error');
    }
  })
  .listen(8082, () => {
    console.log("8082 서버 돌아감 ");
  });
