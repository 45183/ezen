// 프라미스의 개념은 크게 3가지. 이행, 대기, 거절
// 1. 명령어를 보내고 나서 반응을 기다림 (대기)
// 2. 정상적인 수행이 되면 다음 액션을 실행 (이행) - resolve 함수
// 3. 수행에 실패하면 에러 시 행동을 진행 (거절) - reject 함수
// promise는 객체이므로 new 연산자로 인스턴스 생성이 가능
// .then을 사용하려면 Promise 객체여야 함.


const DB = [];

function saveDB(user){
    const oldDBSize = DB.length;
    DB.push(user);
    console.log(`save ${user.name} to DB`);
    // 콜백 대신 프라미스 객체를 반환
    return new Promise((resolve, reject) => {
        // 새로운 글이 유입되어 현재의 db길이가 이전의 db길이보다 긴 경우
        if(DB.length > oldDBSize){
            // 성공시 유저정보 반환을 "이행"
            resolve(user);
        } else {
            // 실패시 거절 에러를 발생 시킴
            reject(new Error("Save DB Error!"));
        };
    });
};


function sendEmail(user){
    console.log(`email to ${user.email}`);
    // promise 객체를 반환할 때 실패처리는 없다.
    return new Promise((resolve) => {
        resolve(user);
    });
};


function getResult(user){
    return new Promise((resolve, reject) => {
        resolve(`success register ${user.name}`);
    });
};


function registerByPromiser(user){
    // 순서를 지켜서 실행될 수 있게 처리함
    const result = saveDB(user).then(sendEmail).then(getResult);
    // 다 돌리고 나서 result 변수에 저장된 결과 출력 후 반환
    console.log(result);
    return result;
}


const myUser = {email: "abcde@naver.com", password: "123456", name: "abcde"};
// const result = registerByPromiser(myUser);

// result.then(console.log);







// 그러면 동시에 여러 promise 객체를 호출하려면?
allResult = Promise.all([saveDB(myUser), sendEmail(myUser), getResult(myUser)]);
allResult.then(console.log);