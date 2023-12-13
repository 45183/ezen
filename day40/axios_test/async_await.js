// async, await 구문 사용법

// async function myName(){
//     return "Andy";
// }

// console.log(myName());          // Promise { 'Andy' } -> 프라미스 객체처리 됨



async function myName(){
    return "Andy"
}

async function showName(){
    const name = await myName();
    console.log(name);              // Promise { <pending> }    // 요청 대기
}

console.log(showName());            // Andy