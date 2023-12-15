//  API 요청이 들어오면 해당 작업을 진행하는 파트

const express = require('express');
const User = require('../models/user');

const router = express.Router();

// http get 요청에 대한 라우터 정의 (어떻게 요청을 처리할 것인가)
router.get('/', async (req, res, next) => {
    try{
        // sequelize를 사용해서 모든 사용자 정보를 검색
        const users = await User.findAll();
        // 검색된 정보를 'sequelize' 뷰 템플릿을 화면에 띄우며 전달 (views/sequelize.html)
        res.render('sequelize', {users});
    } catch(err){
        // 오류발생 시, 오류를 출력하고 다음 미들웨어로 전달
        console.error(err);
        next(err);
    }
});

module.exports = router;