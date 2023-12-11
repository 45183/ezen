// const set = new Set();
// const lottoLength = 6;
// const lottoNumber = 45;
const btn = document.querySelector('button');
// const result = document.querySelector('#result');

// while(set.size < lottoLength){
//     set.add(Math.ceil(Math.random() * lottoNumber));
// }

// const lotto = [...set];

// btn.addEventListener('click', () => {

//     for(var i=0; i < lotto.length; i++){
//         result.innerHTML += lotto[lotto.length - i -1] + ',';
//     }
// });


// btn.addEventListener('click', (e) => {
    
//     e.preventDefault();
//     var b = [];
//     while(b.length < lottoLength){
//         var a = Math.ceil(Math.random() * lottoNumber);

//         if(b.length > 0){
//             if(!b.includes(a)){
//                 b.push(a);
//             }
//         } else{
//             b.push(a)
//         }
//     }
//     for(var i=0; i < b.length; i++){
//         result.innerHTML += b[b.length-i-1] + ', ';
//     }
// });



// 숫자 여섯개 생성
function displayNumbers(lotto){
    // 원래 보이던 숫자는 제거
    $("#result").empty();
    for(let i =0; i < 6; i++){
        const div = $("<div></div>") // 제이쿼리판 createElement
        $(div).text(`${lotto[i]}`)
        $(div).hide(); // 안 보이는 상태에서 추가하기
        $("#result").append(div)
    }
    $("#result > div").fadeIn(1000); // 1초 동안 등장
}
// 1부터 45 사이의 숫자 중 무작위 6개
function createNumbers(){
    const lottoNumbers = []
    // 6개가 될때까지
    while(lottoNumbers.length < 6){
        const randomNumber = Math.floor(Math.random() *45) + 1
       // 배열.indexOf(x) : x가 배열의 몇번 인덱스에 있는지 알려준다! 단, 없다면 -1을 반환
        if(lottoNumbers.indexOf(randomNumber) === -1){ 
           lottoNumbers.push(randomNumber)
       }
    }
    displayNumbers(lottoNumbers)
}


$(document).ready(function(){
    // 버튼을 눌렀을 때 번호가 추첨되도록 이벤트 등록
    $("button").click(function(){
       createNumbers()
    })
})




// const lottoLen = 6;
// const lottoNum = 45;
// const rst = document.querySelector('#result');


// function display(number){
//     rst.empty();
//     for(var i = 0; i < lottoLen; i++){
//         const a = document.createElement('div');
//         a.text(`${number}`);
//         a.hide();
//         rst.append(a);
//     }
//     document.querySelector('#result > div').fadeIn(1000);
// }

// function createNum(){
//     const lottoNums = [];
//     while(lottoNums.length < 6){
//         const randNum = Math.ceil(Math.random() * lottoNum);
//         if(lottoNums.indexOf(randNum) === -1){
//             lottoNums.push(randNum);
//         }
//     }
//     display(lottoNums);
// }

// const btn = document.querySelector('button');
// btn.addEventListener('click', createNum());