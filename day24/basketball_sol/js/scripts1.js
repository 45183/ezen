var comScore = 0;
var userScore = 0;
var isComputerTurn = true;
var shotsLeft = 15;

// '슛하기' 버튼 클릭 핸들러
function onComputerShoot() {
  // 게임오버 상태라면 리턴
  if (shotsLeft === 0)
    return;

  // 컴퓨터 턴이 아니라면 리턴
  if (!isComputerTurn)
    return;

  var textElem = document.getElementById('text');
  var comScoreElem = document.getElementById('computer-score');

  // 1/2 확률로 2점슛, 3점슛 선택
  var shootType = Math.random() < 0.5 ? 2 : 3;
// 컼퓨터가 2점슛일 쏜 경우
  if (shootType === 2) {              // 2점슛이라면
    if (Math.random() < 0.5) {      // 1/2 확률로 성공
      // 이게 들어가면 성공메세지와 점수추가가 이루어짐
      textElem.innerHTML = '컴퓨터가 2점슛을 성공시켰습니다!';

      comScore += 2;
      //현재까지의 점수 합산을 출력하는 구문
      comScoreElem.innerHTML = comScore; 
    } else {                        // 실패 시
      textElem.innerHTML = '컴퓨터가 2점슛을 실패했습니다.';
    }
  } else {                            // 3점슛이라면
    if (Math.random() < 0.33) {     // 1/3 확률로 성공
      textElem.innerHTML = '컴퓨터가 3점슛을 성공시켰습니다!';

      comScore += 3;
      comScoreElem.innerHTML = comScore;
    } else {                        // 실패 시
      textElem.innerHTML = '컴퓨터가 3점슛을 실패했습니다.';
    }
  }

  // 컴퓨터 턴 종료
  isComputerTurn = false;
  //
  // // 컴퓨터 버튼 비활성화 및 유저 버튼 활성화
  // 컴퓨터 버튼을 누르고 나면 버튼 비활성화 하고나서 
  // 유저 버튼이 눌린뒤엔 다시 비활성화를 풀어준다.
  var computerButtons = document.getElementsByClassName('btn-computer');

  for (var i = 0; i < computerButtons.length; i++) {
    computerButtons[i].disabled = true;
  }

  var userButtons = document.getElementsByClassName('btn-user');

  for (var i = 0; i < userButtons.length; i++) {
    userButtons[i].disabled = false;
  }
}

// '2점슛', '3점슛' 버튼 클릭 핸들러
function onUserShoot(shootType) {
  // // 게임오버 상태라면 리턴
  if (shotsLeft === 0)
    return;
  //
  // 컴퓨터 턴이라면 리턴
  if (isComputerTurn)
    return;

  var textElem = document.getElementById('text');
  var userScoreElem = document.getElementById('user-score');

  if (shootType === 2) {              // 2점슛이라면
    if (Math.random() < 0.5) {      // 1/2 확률로 성공
      textElem.innerHTML = '2점슛이 성공했습니다!';

      userScore += 2;
      userScoreElem.innerHTML = userScore;
    } else {                        // 실패 시
      textElem.innerHTML = '2점슛이 실패했습니다.';
    }
  } else {                            // 3점슛이라면
    if (Math.random() < 0.33) {     // 1/3 확률로 성공
      textElem.innerHTML = '3점슛이 성공했습니다!';

      userScore += 3;
      userScoreElem.innerHTML = userScore;
    } else {                        // 실패 시
      textElem.innerHTML = '3점슛이 실패했습니다.';
    }
  }

  // 유저 턴 종료
  isComputerTurn = true;

  var computerButtons = document.getElementsByClassName('btn-computer');

  for (var i = 0; i < computerButtons.length; i++) {
    computerButtons[i].disabled = false;
  }

  var userButtons = document.getElementsByClassName('btn-user');

  for (var i = 0; i < userButtons.length; i++) {
    userButtons[i].disabled = true;
  }

  // 남은 슛 횟수 감소
  shotsLeft--;

  // 남은 슛 횟수 UI 업데이트
  var shotsLeftElem = document.getElementById('shots-left');
  shotsLeftElem.innerHTML = shotsLeft;

  // 만약 남은 슛 횟수가 0이라면, 즉 게임 종료라면
  if (shotsLeft === 0) {
    // 승리 조건 비교
    if (userScore > comScore)
      textElem.innerHTML = '승리했습니다!';
    else if (userScore < comScore)
      textElem.innerHTML = '아쉽게도 졌습니다...';
    else
      textElem.innerHTML = '비겼습니다.';

    // 모든 버튼 비활성화
    //컴퓨터 버튼 비활성화
    var computerButtons = document.getElementsByClassName('btn-computer');

    for (var i = 0; i < computerButtons.length; i++) {
      computerButtons[i].disabled = true;
    }
    //유저 버튼 비활성화
    var userButtons = document.getElementsByClassName('btn-user');

    for (var i = 0; i < userButtons.length; i++) {
      userButtons[i].disabled = true;
      location.reload();
    }
    
  }
}

// 리셋 버튼 클릭 핸들러
function resetGame() {
  // 초기 변수값 복붙
  comScore = 0;
  userScore = 0;
  isComputerTurn = true;
  shotsLeft = 15;

  // 초기 UI 복붙
  var comScoreElem = document.getElementById('computer-score');
  var userScoreElem = document.getElementById('user-score');
  var shotsLeftElem = document.getElementById('shots-left');
  var textElem = document.getElementById('text');

  comScoreElem.innerHTML = comScore;
  userScoreElem.innerHTML = userScore;
  shotsLeftElem.innerHTML = shotsLeft;
  textElem.innerHTML = '게임을 시작하세요!';

  // 버튼 초기화
  var computerButtons = document.getElementsByClassName('btn-computer');
  var userButtons = document.getElementsByClassName('btn-user');

  // 컴퓨터가 먼저 플레이할 수 있게 사용자 버튼 비활성화 (초기조건 만족)
  for (var i = 0; i < computerButtons.length; i++) {
    computerButtons[i].disabled = false;
  }

  for (var i = 0; i < userButtons.length; i++) {
    userButtons[i].disabled = true;
  }
}