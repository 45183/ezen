const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const User = require('../models/user');
const { route } = require('../models/user');

const router = express.Router();

// 회원가입 진행 세부경로 설정
router.post('/join', isNotLoggedIn, async (req, res, next) => {
    const {email, nick, password} = req.body;
    try{
        const exUser = await User.findOne({where: {email}});
        if(exUser){
            // 사용자가 존재하는 경우 원복
            return res.redirect('/join?error=exist');
        };
        // 비밀번호 해시 생성 후 데이터 저장
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            email,
            nick,
            password: hash,
        });
        // 회원가입 완료 -> 메인페이지로 이동
        return res.redirect('/');
    } catch(error){
        console.error(error);
        return next(error);
    };
});

// 로그인
router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if(authError){
            // 인증과정 중 오류발생 처리
            console.error(authError);
            return next(authError);
        };
        if(!user){
            // 사용자 정보가 없을 경우, 로그인 페이지로 돌아감
            return res.redirect(`/?loginError=${info.message}`)
        };

        // 세션에 사용자 정보 저장
        return req.login(user, (loginError) => {
            if(loginError){
                console.error(loginError);
                return next(loginError);
            };
            
            // 메인 페이지로 원복
            return res.redirect('/');
        });
    });

    // 미들웨어 내부에서 다른 미들웨어 호출
    (req, res, next);
});


// 로그아웃
router.get('/logout', isLoggedIn, (req, res) => {
    // 로그아웃 처리
    req.logout();
    // 세션 파괴
    req.session.destroy();
    // 메인 페이지로 이동
    res.redirect('/');
});

// 카카오 로그인 세부주소 배정
router.get('/kakao', passport.authenticate('kakao', {}));
// 카카오 로그인 성공 후 사용자를 서비스로 원복시킬 위치
router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/',
}), (req, res) => {
    // 로그인 성공 시 홈페이지로 이동
    res.redirect('/');
});

module.exports = router;