const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');

const {sequelize} = require('./models');

// 미들웨어
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const commentsRouter = require('./routes/comments');

const app = express();

// 포트번호를 지정하는데 특별한 환경 변수가 없으면 3001
app.set('port', process.env.PORT || 3001);
// express 템플릿 엔진 -> html 파일을 읽어서 처리하는 기능
// nunjucks 가 선언되었으므로 지금 html 파일은 express 산하 nunjucks 프레임워크에서 처리될 것
app.set('view engine', 'html');

// nunjucks 설정 진행
// views 디렉토리에서 nunjucks 파일을 찾음
// express: app -> express를 nunjucks에 연결하는 부분
// watch: true -> 템플릿 파일의 변경점을 감지하면 자동으로 새로고침해주는 옵션
nunjucks.configure('views', {
    express: app, 
    watch: true,
});

sequelize.sync({force:false})
.then(() => {
    console.log('데이터베이스 연결 성공');
})
.catch((err) => {
    console.error(err);
});

// 개발환경에서 http 요청을 logging
app.use(morgan('dev'));
// public 폴더 인식
app.use(express.static(path.join(__dirname, 'public')));
// json 파일 처리
app.use(express.json());
// json 파일 메세지 해석
app.use(express.urlencoded({extended:false}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/comments', commentsRouter);


// 서버에러를 다루는 함수
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);          // err.status -> 400번대 : 클라이언트 사이드, 500번대 : 서버 사이드
    res.render('error');    // 에러페이지 렌더링
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중')
});