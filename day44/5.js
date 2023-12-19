// promise 예시
// 일부러 콜백함수와의 비교를 위해 메인 프라미스 함수를 앞으로 가져옴
// 그냥 돌릴 경우 에러 (함수가 사전에 정의되지 않았기 때문)

const DB = [];

function registerBypromise(user){
    const result = saveDB(user).then(sendEmail).then(getResult);
    console.log(result);
    return result;
};

function saveDB(user){
    const oldDBsize = DB.length;
    DB.push(user);
    console.log(`${user.name} 데이터가 DB에 잘 저장되었습니다.`);
    // 콜백대신 promise 객체를 반환
    return new Promise((resolve, reject) => {
        if(DB.length > oldDBsize){
            resolve(user);
        } else{
            reject (new Error("DB저장오류!"));
        };
    });
};

function sendEmail(user){
    console.log(`${user.email} 데이터가 전송되었습니다.`);
    return new Promise((resolve) => {
        resolve(user);
    });
};

function getResult(user){
    return new Promise((resolve, reject) => {
        `성공! ${user.name}`;
    });
};

const result = registerBypromise({email: "andy@test.com", password: "1234", name: "andy"});

// 결과값이 promise 객체이므로 .then에 함수를 넣어서 결과를 볼 수 있다.
result.then(console.log);