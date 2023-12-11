function onclock(){
    const today = new Date();
    const year = today.getFullYear(); // 연도
    const month = today.getMonth(); // 월(0~11)
    const date = today.getDate(); // 날짜
    const day1 = today.getDay(); // 요일(0~6)

    let day2;
    switch(day1){
        case 0:
            day2 = "일요일";
            break;
        case 1:
            day2 = "월요일";
            break;
        case 2:
            day2 = "화요일";
            break;
        case 3:
            day2 = "수요일";
            break;
        case 4:
            day2 = "목요일";
            break;
        case 5:
            day2 = "금요일";
            break;
        case 6:
            day2 = "토요일";
            break;
    }

    const today1 = document.querySelector('#today');
    today1.innerHTML = `${year}년 ${month+1}월 ${date}일 ${day2}`; 
    today1.innerHTML = today.toLocaleDateString() + ` ${day2}`;  // 연 월 일 까지만 출력
    
    const clock1 = document.querySelector('#clock');
    const time = today.toLocaleTimeString();
    clock1.innerHTML = time;
}
onclock();
setInterval("onclock()", 1000); // 그냥 사용하면 1초 차이나므로 위에 onclock() 한번 사용해서 오차 줄이기
