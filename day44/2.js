const express = require('express');
const url = require('url');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.end('home'));
app.get('/user', user);
app.get('/feed', feed);

function user(req, res){
    const user = url.parse(req.url, true).query;
    res.end("[user] name : andy, age : 30");
};

function feed(_, res){
    res.end(`<ul>
    <li>picture1</li>
    <li>picture2</li>
    <li>picture3</li>
    </ul>`)
};

app.listen(port, () => {
    console.log(`${port}번 포트에서 서버 대기중`);
});

