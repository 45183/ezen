// express 서버의 구동

const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// express 내부에 css 연결 기능이 있음
// public 폴더 안에 정적파일을 제공
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', function(req, res) {
    // html로 처리
    // const htmlFilePath = path.join(__dirname, 'views', 'index.html');
    // res.sendFile(htmlFilePath);
    res.render('index');    // ejs로 처리
});

app.get('/restaurants', function(req, res) {
    // const htmlFilePath = path.join(__dirname, 'views', 'restaurants.html');
    // res.sendFile(htmlFilePath);

    // 다이나믹 컨텐츠는 데이터를 적용할 json 파일을 불러온 후에
    // render 명령어를 통해서 페이지 로딩 시 데이터를 적용한다.
    const filePath = path.join(__dirname, 'data', 'restaurants.json');
    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);
    // 다이나믹 컨텐츠이니 컨텐츠 업로드 후 추가 조건 설정
    res.render('restaurants', {
        numberOfRestaurants:storedRestaurants.length,
        restaurants : storedRestaurants
    });
});

app.get('/recommend', function(req, res) {    
    // const htmlFilePath = path.join(__dirname, 'views', 'recommend.html');
    // res.sendFile(htmlFilePath);
    res.render('/recommend')
});


app.post('/recommend', function(req, res) {
    const restaurant = req.body;
    const filePath = path.join(__dirname, 'data', 'restaurants.json');
    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);
    storedRestaurants.push(restaurant);
    fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));
    res.redirect('/confirm');
});

app.get('/confirm', function(req, res) {
    // const htmlFilePath = path.join(__dirname, 'views', 'confirm.html');
    // res.sendFile(htmlFilePath);
    res.render('confirm');
  });

app.get('/about', function(req, res) {
    // const htmlFilePath = path.join(__dirname, 'views', 'about.html');
    // res.sendFile(htmlFilePath);
    res.render('about');
});

app.listen(3000);