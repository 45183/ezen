const http = require('http');
const fs = require('fs').promises;  // 파일시스템 모듈의 promises 기능 사용
const url = require('url')

// 쿠키를 처리할 때
const qs = require('querystring');  // 쿼리 문자열 파싱 모듈 불러오기


// 쿠키 파일을 해석해서 객체로 변환 (로그인 정보 해석)
// 쿠키파일 내부에 데이터가 없는 경우를 감안하여 기본설정을 빈값으로 설정
const parseCookies = (cookie = '') => 
// 쿠키데이터 내부를 ;를 기준으로 나누고 다시 = 기준으로 나눔   // name=hyun;id=hsb9743; -> ; 잘라서 이름과 아이디 분리, =로 잘라서 name 분리
// 여기서 reduce함수는 배열을 객체로 변환하는 것
cookie.split(';').map(v => v.split('=')).reduce((acc, [k,v]) => { 
    // trim 함수를 통해서 데이터의 여백을 제거, 그리고 최종적으로 decodeURIcomponent
    // 쿠키 데이터가 서버에서 해석할 수 있는 데이터로 변환   
    acc[k.trim()] = decodeURIComponent(v);
    return acc;
}, {});


// http 서버 생성
http.createServer(async(req, res) => {
    const cookies = parseCookies(req.headers.cookie)    // 쿠키를 해석하여 객체로 변환

    if(req.url.startsWith('/login')){
        const {query} = url.parse(req.url); // 주소에 대한 내용
        const {name} = qs.parse(query);   // 쿼리 문자열에 대한 내용
        const expires = new Date();     
        // 쿠키 유효시간을 현재시간 +15분으로 설정
        expires.setMinutes(expires.getMinutes()+15);
        res.writeHead(302, {
            location: '/',  // 원래 주소
            'Set-Cookie':`name=${decodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        res.end();
    } else if(cookies.name){    // name 이라는 쿠키가 있는 경우
        res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
        res.end(`${cookies.name}님 안녕하세요.`)
    } else {
        try{
            const data = await fs.readFile('./cookie2.html');   // 준비한 html 파일을 읽어서 data 변수에 저장
            res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
            res.end(data);  // html 파일을 응답으로 보냄
        } catch(err){
            res.writeHead(500, {'Content-Type':'text/plain; charset=utf-8'});
            res.end(err.message);
        }
    }
})
.listen(8084, () => {
    console.log('8084번 포트에서 서버 대기중')
});


// 실행 후 로그인 시 f12로 application 확인해보면 name 의 value로 로그인 아이디 나오고 expires에 만료시간 나옴