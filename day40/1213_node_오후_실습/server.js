const http = require('http');
const fs = require('fs').promises; 
const users = {};

http
  .createServer(async (req, res) => {
    try {
      if(req.method === 'GET'){
        if (req.url === "/") {
          const data = await fs.readFile("./restFront.html");
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          return res.end(data);
        } else if (req.url === "/about") {
          const data = await fs.readFile("./about.html");
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          return res.end(data);
        } else if (req.url === "/users") {
          res.writeHead(200, {'Content-Type':'application/json; charset=utf-8'});
          return res.end(JSON.stringify(users));
        } else {
          try {
            const data = await fs.readFile(`.${req.url}`);
            return res.end(data);
          } catch (err) {
            res.writeHead(404);
            return res.end("NOT FOUND");
          }
        }
      } else if (req.method === "POST") {
        if (req.url === "/user") {
          let body = "";
          req.on("data", (data) => {
            body += data;
          });
          return req.on("end", () => {
            console.log("post 본문:", body);
            const { name } = JSON.parse(body);
            const id = Date.now(); 
            users[id] = name;
            console.log(users)
            res.writeHead(201, { "Content-Type": "text/plain; charset=utf-8" });
            res.end("ok");
          });
        }
      } else if (req.method === "PUT") {
        if (req.url.startsWith("/user/")) {
          const key = req.url.split("/")[2]; 
          console.log(key);
          let body = "";
          req.on("data", (data) => {
            body += data;
          });
          return req.on("end", () => {
            console.log("put 본문:", body);
            users[key] = JSON.parse(body).name;
            res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
            return res.end("ok");
          });
        } 
      }else if (req.method === "DELETE") {
        if (req.url.startsWith('/user/')) {
          const key = req.url.split("/")[2];
          delete users[key]; 
          res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
          return res.end('ok');
        }
      }
      //method 4가지의 경로 요청이 아닌경우
      res.writeHead(404);
      return res.end("NOT FOUND");
    } catch (err) {
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(err.message);
    }
  })
  .listen(8082, () => {
    console.log("8082 서버 돌아감 ");
  });