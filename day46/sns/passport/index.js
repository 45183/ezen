// passport는 로그인 할 때 동작을 '전략(strategy)'이라고 표현
// 로컬 서버에서 회원가입 후 정보를 가지고 로그인 하는 방식과
// 카카오 api를 따서 카카오 사용자 검증 프로세스를 이용하는 방식을 
// 각각 로컬 로그인 전략 & 카카오 로그인 전략이라고 부름

const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () => {
    // 사용자 정보를 세션에 저장하는 함수
    passport.serializeUser((user, done) => {
        // 사용자의 id만 세션에 저장
        done(null, user.id);
    });

    // 세션에 저장된 사용자 정보를 기반으로 사용자 정보를 불러오는 함수
    passport.deserializeUser((id, done) => {
        User.findOne({
            where: {id}, // 저장된 id를 사용해서 사용자를 조회
            include: [{
                // User 모델을 참조
                model: User,
                // id와 nick 속성만 포함하기
                attributes: ['id', 'nick'],
                // User 모델과의 관계에서 '팔로워'로 명시하기
                as: 'Followers',
            }, {
                // User 모델을 참조
                model: User,
                // id와 nick 속성만 포함하기
                attributes: ['id', 'nick'],
                // User 모델과의 관계에서 '팔로잉'으로 명시하기
                as: 'Followings',
            }],
        })
        // 조회된 사용자 정보를 반환
        .then(user => done(null, user))
        // 오류 발생 시 처리
        .catch(err => done(err));   
    });

    // 로컬 로그인 전략
    local();
    // 카카오 로그인 전략
    kakao();
};