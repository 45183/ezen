const http = require('http');

http.createServer((req, res) => {
    console.log(req.url, req.headers.cookie);
    res.writeHead(200, {'Set-Cookie':'mycookie-test', "Content-Type":"text/plain; charset=utf-8"})
    res.end('안녕 쿠키');
})
.listen(8083, () => {
    console.log('8083 포트에서 서버 대기중');
});