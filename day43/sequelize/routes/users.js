// SQL 테이블 생성, 키 값의 설정 등이 담긴 USER, COMMENT 자바스크립트를 불러온다.
const express = require('express');
const User = require('../models/user');
const Comment = require('../models/comment');

// express 라우터를 생성
const router = express.Router();

// 서비스 주소(경로)에 따른 get & post 요청을 처리
// 미들웨어의 사용 (next)
router.route('/')
    .get(async(req, res, next) => {
        try{
            // 모든 사용자 정보를 조회
            const users = await User.findAll();
            // 조회된 사용자 정브를 JSON 형식으로 응답
            res.json(users);
        } catch(err){
            console.error(err);
            next(err);
        };
    })
    .post(async(req, res, next) => {
        try{
            // 요청해서 받은 정보로 새로운 사용자를 생성
            // user라는 sql 테이블 자체가 사용자 데이터 관련
            const user = await User.create({
                name: req.body.name,
                age: req.body.age,
                married: req.body.married,
            });
            // 생성된 사용자 정보를 로그에 출력하고, 201(정상) 상태로 응답
            console.log(user);
            res.status(201).json(user);
        } catch(err){
            console.error(err);
            next(err);
        };
    });

// 특정 사용자의 댓글을 조회하는 경로(라우트)를 정의
// 특정 사용자가 몇명이 될지 모르므로 동적 컨텐츠가 됨 -> : 사용
// :id -> user의 pk
router.get('/:id/comments', async(req, res, next) => {
    try{
        // 해당 사용자의 ID를 사용하여 댓글을 조회
        const comments = await Comment.findAll({
            include: {
                model: User,
                where: {id: req.params.id},
            },
        });
        // 조회된 댓글을 JSON 형식으로 응답
        console.log(comments);
        res.json(comments);
    } catch(err){
        console.error(err);
        next(err);
    };
});


// 지정된 경로(라우트)를 외부에서 쓸 수 있게 내보냄
module.exports = router;