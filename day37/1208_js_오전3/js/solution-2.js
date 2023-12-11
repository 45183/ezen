const seed = document.querySelector("#seed");
const total = document.querySelector("#total");
const raffle = document.querySelector("#raffle");
const clear = document.querySelector("#clear");
const result_raffle = document.querySelector("#result");

raffle.addEventListener("click", (e) => {
    e.preventDefault();
    // 배열로 할 경우
    // var b = [];
    // while(b.length < total.value){
    //     var a = Math.floor(Math.random() * seed.value + 1);

    //     if(b.length > 0){
    //         if(!b.includes(a)){
    //             b.push(a);
    //         }
    //     } else{
    //         b.push(a)
    //     }
    // }

    
    // for(var i=0; i < b.length; i++){
    //     result_raffle.innerHTML += b[b.length-i-1] + '번,';
    // }



    // Set 사용 -> 중복 없음 -> 추첨하고 배열로 변환 출력
    const b = new Set();
    while(b.size < total.value){
        b.add(Math.floor(Math.random() * seed.value) + 1);
    }

    const a =[...b];

    for(var i=0; i < a.length; i++){
        result_raffle.innerHTML += a[a.length-i-1] + '번,';
    }

});

clear.addEventListener("click", () => {
    seed.value = "";
    total.value = "";
});