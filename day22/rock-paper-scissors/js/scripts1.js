var userInput = prompt('가위, 바위, 보!');

if (userInput !== '가위' && userInput !== '바위' && userInput !== '보') {
  alert('가위, 바위, 보 중 하나를 입력해야 합니다!');
  location.reload();
} else {
  var comInput;

  // Math.random()은 0부터 1 사이의 임의의 값을 리턴함
  var rnd = Math.random();
  // 1, 2, 3으로 하고 싶으면 rnd = Math.ceil(Math.random() * 3)으로 변경


  if (rnd < 0.33) {               // 0에서 0.33 사이의 값, 즉 1/3 확률
    comInput = '가위';
  } else if (rnd < 0.66) {        // 0.33에서 0.66 사이의 값, 즉 1/3 확률
    comInput = '바위';
  } else {                        // 0.66에서 1 사이의 값, 즉 1/3 확률
    comInput = '보';
  }

  // if (userInput === '가위') {
  //   if (comInput === '가위') {
  //     alert('컴퓨터: ' + comInput + ' - 컴퓨터와 비겼습니다.');
  //   } else if (comInput === '바위') {
  //     alert('컴퓨터: ' + comInput + ' - 컴퓨터에게 졌습니다...');
  //   } else {
  //     alert('컴퓨터: ' + comInput + ' - 컴퓨터를 이겼습니다!!');
  //   }
  // } else if (userInput === '바위') {
  //   if (comInput === '가위') {
  //     alert('컴퓨터: ' + comInput + ' - 컴퓨터를 이겼습니다!!');
  //   } else if (comInput === '바위') {
  //     alert('컴퓨터: ' + comInput + ' - 컴퓨터와 비겼습니다.');
  //   } else {
  //     alert('컴퓨터: ' + comInput + ' - 컴퓨터에게 졌습니다...');
  //   }
  // } else {
  //   if (comInput === '가위') {
  //     alert('컴퓨터: ' + comInput + ' - 컴퓨터에게 졌습니다...');
  //   } else if (comInput === '바위') {
  //     alert('컴퓨터: ' + comInput + ' - 컴퓨터를 이겼습니다!!');
  //   } else {
  //     alert('컴퓨터: ' + comInput + ' - 컴퓨터와 비겼습니다.');
  //   }
  // }

  // 간단히
  if(userInput == comInput){
    alert('컴퓨터: ' + comInput + ' - 컴퓨터와 비겼습니다.');
  } else if((userInput == "가위" && comInput =="바위") || (userInput == "바위" && comInput =="보") || (userInput == "보" && comInput =="가위")){
    alert('컴퓨터: ' + comInput + ' - 컴퓨터에게 졌습니다...');
  } else{
    alert('컴퓨터: ' + comInput + ' - 컴퓨터를 이겼습니다!!');
  }


  // // switch문으로
  // switch (userInput) {
  //   case '가위':
  //   switch (comInput) {
  //   case '가위':
  //   alert('컴퓨터: ' + comInput + ' - 컴퓨터와 비겼습니다.');
  //   break;
  //   case '바위':
  //   alert('컴퓨터: ' + comInput + ' - 컴퓨터에게 졌습니다...');
  //   break;
  //   default:
  //   alert('컴퓨터: ' + comInput + ' - 컴퓨터를 이겼습니다!!');
  //   break;
  //   }
  //   break;
  //   case '바위':
  //   switch (comInput) {
  //   case '가위':
  //   alert('컴퓨터: ' + comInput + ' - 컴퓨터를 이겼습니다!!');
  //   break;
  //   case '바위':
  //   alert('컴퓨터: ' + comInput + ' - 컴퓨터와 비겼습니다.');
  //   break;
  //   default:
  //   alert('컴퓨터: ' + comInput + ' - 컴퓨터에게 졌습니다...');
  //   break;
  //   }
  //   break;
  //   default:
  //   switch (comInput) {
  //   case '가위':
  //   alert('컴퓨터: ' + comInput + ' - 컴퓨터에게 졌습니다...');
  //   break;
  //   case '바위':
  //   alert('컴퓨터: ' + comInput + ' - 컴퓨터를 이겼습니다!!');
  //   break;
  //   default:
  //   alert('컴퓨터: ' + comInput + ' - 컴퓨터와 비겼습니다.');
  //   break;
  //   }
  //   break;
  // }
}