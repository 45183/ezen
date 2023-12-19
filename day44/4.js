// 콜백함수의 예시 (3단계 콜백함수)

// 회원가입 api호출 후
// 1. DB에 저장  2. 이메일 송부  3. 성공메세지 송부

const DB = [];

function register(user){
    return saveDB(user, function(user){
        return sendEmail(user, function(user){
            return getResult(user);
        });
    });
};

function saveDB(user, callback){
    DB.push(user);
    console.log(`save ${user.name} to DB`);
    console.log(`${user.name} 데이터가 DB에 잘 저장되었습니다.`);
    return callback(user);
};

function sendEmail(user, callback){
    console.log(`${user.name} 데이터가 전송되었습니다.`);
};


function getResult(user){
    return `성공! ${user.name}`;
};



// 이 코드를 테스하기 위한 샘플데이터를 정의하고 함수를 실행하는 명령어

const result = register({email: "andy@test.com", password: "1234", name: "andy"});
console.log(result);