const passport = require('passport');
const kakaoStrategy = require('passport-kakao').Strategy;

const User = require('../models/user');

module.exports = () => {
    // 카카오 로그인 전략 설정
    passport.use(new kakaoStrategy({
        clientID: process.env.KAKAO_ID,
        callbackURL: '/auth/kakao/callback'
    }, async(accessToken, refreshToken, profile, done) => {
        // 카카오 프로필 로그 출력
        console.log('kakao profile', profile);
        try{
            // 카카오 id로 사용자 조회
            const exUser = await User.findOne({
                where: {snsId: profile.if, provider: 'kakao'},
            });
            if(exUser){
                // 기존 사용자가 존재할 경우, 사용자 정보와 함께 완료 처리
                done(null, exUser);
            } else {
                // 새 사용자 설정
                const newUser = await User.create({
                    // 카카오 계정 이메일
                    email: profile._json.kakao_account_email,
                    // 카카오 닉네임
                    nick: profile.displayName,
                    // 카카오 id
                    snsId: profile.id,
                    // 로그인 정보 제공자 - 카카오
                    provider: 'kakao'
                });
                // 생성된 사용자 정보와 함께 완료처리
                done(null, newUser);
            };
        } catch(error){
            console.error(error);
            done(error);
        };
    }))
}