// 회원가입 DB 만들어 보기
// 회원가입 API를 호출하면
// 1.데이터베이스 저장 2.이메일 보내기 3.성공메세지 전송
// 이 API를 콜백방식으로 만들어 볼게요

const DB = [];

// 회원 가입 API함수
// register 함수의 설명: saveDB, sendEmail, getResult함수를 차례로 호출하는 콜백함수
function register(user) {
    return saveDB(user, function(user){
        return sendEmail(user, function(user){
            return getResult(user);
        });
    });
}

function saveDB(user, callback) {
    DB.push(user);
    console.log(`save ${user.name} to DB`);
    return callback(user);
}

function sendEmail(user, callback) {
    console.log(`email to ${user.email}`);
    return callback(user);
}

function getResult(user) {
    return `success register ${user.name}`;
}

const result = register({email: "sangjpar@gmail.com", password: "1234", name: "sang"});
console.log(result);