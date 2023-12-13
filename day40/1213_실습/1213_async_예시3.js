// async, await, setTimeout()을 가지고 1부터 10까지 세기

function waitOneSecond(msg) {
    return new Promise((resolve, _) => {
setTimeout(() => resolve(`${msg}`), 1000);
    });
}

async function countOneToTen() {
    // Array(10) 0에서9까지 배열을 형성하여 key값을 추출합니다.
    // 그 담에 ...으로 각 원소를 뜯어내서 0에서 9까지의 개별 원소를 하나씩 for문으로 호출합니다.
for (let x of [...Array(10).keys()]) {
let result = await waitOneSecond(`${x+1}초 대기중..`);
console.log(result);
}
console.log("완료");
}

countOneToTen();