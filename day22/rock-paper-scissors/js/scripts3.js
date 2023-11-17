var SCISSORS = '가위';
var ROCK = '바위';
var PAPER = '보';

// // 퀴즈 - cominput을 밖으로 빼서 글로벌 처리하면 바뀌는 점
// // comInput이 누를때마다 변하지 않음 (처음 정해진 값이 그대로 유지됨)
// // 함수안에 랜덤함수가 있으면 버튼을 누를때마다 랜덤으로 값이 바뀜
// // 랜덤을 바깥으로 빼는 경우 단점은 페이지를 실행하면 버튼을 누르지 않아도 랜덤값이 정해지면서 컴퓨팅 자원을 소비
// var comInput;
// var rnd = Math.random();
// if (rnd < 0.33) {
//   comInput = SCISSORS;
// } else if (rnd < 0.66) {
//   comInput = ROCK;
// } else {
//   comInput = PAPER;
// }


// var rnd = Math.ceil(Math.random() * 3)

// switch(rnd){
//   case 1:
//     comInput = SCISSORS;
//     break;
//   case 2:
//     comInput = ROCK;
//     break;
//   case 3:
//     comInput = PAPER;
//     break;
// }





// // '가위' 버튼 클릭 핸들러
// function onScissorsClick() {
//   var comInput;
//   var rnd = Math.random();

//   if (rnd < 0.33) {
//     comInput = SCISSORS;
//   } else if (rnd < 0.66) {
//     comInput = ROCK;
//   } else {
//     comInput = PAPER;
//   }

//   if (comInput === SCISSORS) {
//     alert('컴퓨터: ' + comInput + ' - 컴퓨터와 비겼습니다.');
//   } else if (comInput === ROCK) {
//     alert('컴퓨터: ' + comInput + ' - 컴퓨터에게 졌습니다...');
//   } else {
//     alert('컴퓨터: ' + comInput + ' - 컴퓨터를 이겼습니다!!');
//   }
// }

// // '바위' 버튼 클릭 핸들러
// function onRockClick() {
//   var comInput;
//   var rnd = Math.random();
  
//   if (rnd < 0.33) {
//     comInput = SCISSORS;
//   } else if (rnd < 0.66) {
//     comInput = ROCK;
//   } else {
//     comInput = PAPER;
//   }
  
//   if (comInput === SCISSORS) {
//     alert('컴퓨터: ' + comInput + ' - 컴퓨터를 이겼습니다!!');
//   } else if (comInput === ROCK) {
//     alert('컴퓨터: ' + comInput + ' - 컴퓨터와 비겼습니다.');
//   } else {
//     alert('컴퓨터: ' + comInput + ' - 컴퓨터에게 졌습니다...');
//   }
// }

// // '보' 버튼 클릭 핸들러
// function onPaperClick() {
//   var comInput;
//   var rnd = Math.random();

//   if (rnd < 0.33) {
//     comInput = SCISSORS;
//   } else if (rnd < 0.66) {
//     comInput = ROCK;
//   } else {
//     comInput = PAPER;
//   }
  
//   if (comInput === SCISSORS) {
//     alert('컴퓨터: ' + comInput + ' - 컴퓨터에게 졌습니다...');
//   } else if (comInput === ROCK) {
//     alert('컴퓨터: ' + comInput + ' - 컴퓨터를 이겼습니다!!');
//   } else {
//     alert('컴퓨터: ' + comInput + ' - 컴퓨터와 비겼습니다.');
//   }
// }

// '가위' 버튼 클릭 핸들러 - switch 버전
function onScissorsClick() {
  var comInput;
  var rnd = Math.ceil(Math.random() * 3);

  switch(rnd){
    case 1:
      comInput = SCISSORS;
      break;
    case 2:
      comInput = ROCK;
      break;
    case 3:
      comInput = PAPER;
      break;
  }
  
  
  if (comInput === SCISSORS) {
    alert('컴퓨터: ' + comInput + ' - 컴퓨터와 비겼습니다.');
  } else if (comInput === ROCK) {
    alert('컴퓨터: ' + comInput + ' - 컴퓨터에게 졌습니다...');
  } else {
    alert('컴퓨터: ' + comInput + ' - 컴퓨터를 이겼습니다!!');
  }
}
// '바위' 버튼 클릭 핸들러 - switch 버전
function onRockClick() {
  var comInput;
  var rnd = Math.ceil(Math.random() * 3);

  switch(rnd){
    case 1:
      comInput = SCISSORS;
      break;
    case 2:
      comInput = ROCK;
      break;
    case 3:
      comInput = PAPER;
      break;
  }
  
  if (comInput === SCISSORS) {
    alert('컴퓨터: ' + comInput + ' - 컴퓨터를 이겼습니다!!');
  } else if (comInput === ROCK) {
    alert('컴퓨터: ' + comInput + ' - 컴퓨터와 비겼습니다.');
  } else {
    alert('컴퓨터: ' + comInput + ' - 컴퓨터에게 졌습니다...');
  }
}

// '보' 버튼 클릭 핸들러 - switch 버전
function onPaperClick() {
  var comInput;
  var rnd = Math.ceil(Math.random() * 3);

  switch(rnd){
    case 1:
      comInput = SCISSORS;
      break;
    case 2:
      comInput = ROCK;
      break;
    case 3:
      comInput = PAPER;
      break;
  }
  
  if (comInput === SCISSORS) {
    alert('컴퓨터: ' + comInput + ' - 컴퓨터에게 졌습니다...');
  } else if (comInput === ROCK) {
    alert('컴퓨터: ' + comInput + ' - 컴퓨터를 이겼습니다!!');
  } else {
    alert('컴퓨터: ' + comInput + ' - 컴퓨터와 비겼습니다.');
  }
}
