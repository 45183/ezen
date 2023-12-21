const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => {
    passport.use(new LocalStrategy({
        // 사용자 이름 필드를 'email'로 설정
        usernameField: 'email',
        // 비밀번호 필드를 'password'로 설정
        passwordField: 'password',

    }, async(email, passowrd, done) => {
        try{
            const exUser = await User.findOne({where: {email}});
            if(exUser){
                // bcrypt 라이브러리의 비교 기능을 사용하여, 유저가 입력한 암호와 exUser 데이터 상의 암호
                // (즉, 회원가입 시점의 암호)가 매치하는지 비교작업함
                const result = await bcrypt.compare(passowrd, exUser.passowrd);
                if(result){
                    // 비밀번호가 일치하면 사용자 정보와 함께 완료처리
                    done(null, exUser);
                } else{
                    // 비밀번호가 일치하지 않으면
                    done(null, false, {message: '비밀번호가 일치하지 않습니다.'})
                };
            } else {
                // 사용자가 존재하지 않는 경우
                // 카카오 로그인과 다른 부분 - 사전 등록된 데이터 없이 로그인 인증 불가능
                done(null, false, {message: '가입도지 않은 회원입니다.'});
            };
        } catch(error){
            console.error(error);
            done(error);
        };
    }));
};