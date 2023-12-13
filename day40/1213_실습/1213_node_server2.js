// html 파일을 읽어들여서 화면을 표시하는 서버 구축

const http = require('http'); // http 모듈을 가져옵니다
const fs = require('fs').promises; // fs 모듈 파일시스템 모듈

// HTTP 서버를 생성합니다.
http.createServer(async (req, res) => {
    try {
        
        const data = await fs.readFile(`./server2.html`);
        // 응답 헤더를 설정해서 사용자(클라이언트)에 html형식의 데이터를 제공. (한글지원 되게)
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8' });
        // 읽어온 html 데이터를 클라이언트에 응답으로 전송합니다.
        res.end(data)

    }
    catch (err) {
        // 오류가 나면 오류 메세지를 출력한다는 말입니다.
        console.error(err);
        // 서버상태가 500번대인 경우는 서버오류에 해당합니다.
        res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8' });
        res.end(err.message)
    }
})
.listen(8081, () => { // 서버 포트설정
    console.log('8081번 포트에서 서버 대기중 ^^')
})

