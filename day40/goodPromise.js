// 이상적인 프라미스 코드의 예시
// .then(함수).then(함수) --> 체이닝 기법


// goodPromise 함수를 실행하면 Promise 객체를 생성 후 반환해 줌
function goodPromise(val){
    return new Promise((resolve, reject) => {
        resolve(val);
    });
};


// 그래서 goodPromise 함수에 "대박"이라고 입력 시
// "대박"을 출력한 후 뒤에 함수가 차례로 실행
// 혹시라도 then() 체이닝 처리 중 에러가 발생하는 경우
// err 메세지를 출력하여 에러라는 사실을 알림
goodPromise("대박").then((val) => {
    return val + "이런";
})
.then((val) => {
    return val + "코드는";
})
.then((val) => {
    return val + "없습니다.";
})
.then((val) => {
    console.log(val);
})
.catch((err) => {
    console.log(err);
});