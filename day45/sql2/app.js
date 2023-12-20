const express = require('express');
const path = require('path');

// sql 관련 자바스크립트 로딩
const blogRoutes = require('./routes/blog');

const app = express();

// ejs는 express 산하 라이브러리이므로 express를 통해 ejs 소환
app.set('view engine', 'ejs');
// ejs 파일은 views 폴더 안으로 경로 지정
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended:true}));
// css 파일의 위치 지정
app.use(express.static('public'));

app.use(blogRoutes);

// 기본 미들웨어 설정 (error handling function)
app.use(function(error, req, res, next){
    console.log(error);
    res.status(500).render('500');
});

app.listen(3000, () => {
    console.log('3000번 포트에서 대기중')
});