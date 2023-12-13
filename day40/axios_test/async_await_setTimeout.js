// async, await, setTimeout()을 가지고 1부터 10까지 세기

function watiOneSecound(msg){
    return new Promise((resolve, _) => {            // _ -> 사용하지 않아서 무시하는 값 (함수 형식 때문에 필요) -> Promise(resolve, reject)
        setTimeout(() => resolve(`${msg}`), 1000);
    });
};

async function countOneToTen(){
    // Array(10) -> 0에서 9까지 배열을 형성하여 key값을 추출
    // ...으로 배열의 각 원소만 추출 0에서 9까지의 개별 원소를 하나씩 for무능로 호출
    // a = [1, 2, 3]    b = [4, 5, 6]     c =[a,b] = [[1, 2, 3], [4, 5, 6]]    d = [...a, ...b] = [1, 2, 3, 4, 5, 6]
    for(let x of [...Array(10).keys()]){        // [...Array] -> [] 제거한 원소만  ex> a = [1, 2]  -> [...a] = 1, 2
        let result = await watiOneSecound(`${x+1}초 대기중...`);    // 0부터 9까지니까 +1 -> 1 ~ 10 초
        console.log(result);
    };
    console.log("완료");
};

countOneToTen();