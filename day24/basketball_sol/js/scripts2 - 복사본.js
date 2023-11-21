// 컴퓨터 오브젝트
var computer = {
  score: 0,
  percent2: 0.5,
  percent3: 0.33
};

// 사용자 오브젝트
var user = {
  score: 0,
  percent2: 0.5,
  percent3: 0.33
};

// 게임 오브젝트
var game = {
  isComputerTurn: true,
  shotsLeft: 15
};

// '슛하기' 버튼 클릭 핸들러
function onComputerShoot() {
  // 게임오버 상태라면 리턴
  if (game.shotsLeft === 0)
    return;

  // 컴퓨터 턴이 아니라면 리턴
  if (!game.isComputerTurn)
    return;

  updateAI();

  // 1/2 확률로 2점슛, 3점슛 선택
  var shootType = Math.???() < 0.5 ? 2 : 3;

  if (Math.random() < computer['percent' + shootType]) {
    showText('컴퓨터가 ' + shootType + '점슛을 성공시켰습니다!');
    updateComputerScore(shootType);
  } else {
    showText('컴퓨터가 ' + shootType + '점슛을 실패했습니다.');
  }

  // 컴퓨터 턴 종료
  game.isComputerTurn = false;

  // 컴퓨터 버튼 비활성화 및 유저 버튼 활성화
  disableComputerButtons(true);
  disableUserButtons(false);
}

// '2점슛', '3점슛' 버튼 클릭 핸들러
function onUserShoot(shootType) {
  // // 게임오버 상태라면 리턴
  if (game.shotsLeft === 0)
    return;
  //
  // 컴퓨터 턴이라면 리턴
  if (game.isComputerTurn)
    return;

  if (Math.random() < user['percent' + shootType]) {
    showText(shootType + '점슛이 성공했습니다!');
    updateUserScore(shootType);
  } else {
    showText(shootType + '점슛이 실패했습니다.');
  }

  // 유저 턴 종료
  game.isComputerTurn = true;

  disableComputerButtons(false);
  disableUserButtons(true);

  // 남은 슛 횟수 감소
  game.shotsLeft--;

  // 남은 슛 횟수 UI 업데이트
  var $shotsLeftElem = $('#shots-left');
  $shotsLeftElem.html(game.shotsLeft);

  // 만약 남은 슛 횟수가 0이라면, 즉 게임 종료라면
  if (game.shotsLeft === 0) {
    // 승리 조건 비교
    if (user.score > computer.score)
      showText('승리했습니다!');
    else if (user.score < computer.score)
      showText('아쉽게도 졌습니다...');
    else
      showText('비겼습니다.');

    // 모든 버튼 비활성화
    disableComputerButtons(true);
    disableUserButtons(true);
  }
}

function showText(s) {
  var $textElem = $('#text');

  $textElem.fadeOut(300, function() {
    $textElem.html(s);
    $textElem.fadeIn(100);
  });
}

function updateComputerScore(score) {
  computer.score += score;

  var $comScoreElem = $('#computer-score');

  $comScoreElem.animateNumber({
    number: computer.score
  });
}

function updateUserScore(score) {
  user.score += score;

  var $userScoreElem = $('#user-score');

  $userScoreElem.animateNumber({
    number: user.score
  });
}

function disableComputerButtons(flag) {
  $('.btn-computer').prop('disabled', flag);
}

function disableUserButtons(flag) {
  $('.btn-user').prop('disabled', flag);
}
// 밸런스 패치 함수
// 유저가 이기고 있으면 (diff=양수) 컴퓨터 슛 확률 높여주고
// 유저가 지고 있으면 (diff=음수) 컴퓨터 슛 확률 낮춰준다.
function updateAI() {
  var diff = user.score - computer.score;

  if (diff > 10) {
    computer.percent2 = 0.7;
    computer.percent3 = 0.43;
  } else if (diff > 6) {
    computer.percent2 = 0.6;
    computer.percent3 = 0.38;
  } else if (diff < -10) {
    computer.percent2 = 0.3;
    computer.percent3 = 0.23;
  } else if (diff < -6) {
    computer.percent2 = 0.4;
    computer.percent3 = 0.28;
  }
}
// 카운트 다운 기능
$(function() {
  showText(3);

  setTimeout(function() {
    showText(2);

    setTimeout(function() {
      showText(1);

      setTimeout(function() {
        showText('컴퓨터부터 시작합니다!');
        disableComputerButtons(false);
      }, 1000);
    }, 1000);
  }, 1000);
});



// computer: 컴퓨터의 스코어와 성공 확률(percent2와 percent3)을 저장하는 오브젝트입니다.
// user: 사용자의 스코어와 성공 확률을 저장하는 오브젝트입니다.
// game: 게임 상태 정보를 저장하는 오브젝트로, 현재 컴퓨터 턴인지 여부(isComputerTurn)와 남은 슛 횟수(shotsLeft)를 포함합니다.
// '슛하기' 버튼 클릭 핸들러 (onComputerShoot 함수):

// 게임이 종료되지 않았을 때만 동작하도록 검사합니다.
// 컴퓨터 턴인 경우, updateAI() 함수를 호출하여 컴퓨터의 슈팅 확률을 업데이트합니다.
// 랜덤으로 2점슛 또는 3점슛을 선택합니다.
// 확률에 따라 컴퓨터가 슈팅을 시도하고, 성공하면 컴퓨터의 스코어를 업데이트하고 결과를 표시합니다.
// 컴퓨터 턴을 종료하고 사용자 턴을 시작하도록 설정하며, 버튼 상태를 업데이트합니다.
// '2점슛' 및 '3점슛' 버튼 클릭 핸들러 (onUserShoot 함수):

// 게임이 종료되지 않았을 때만 동작하도록 검사합니다.
// 사용자 턴인 경우, 사용자가 선택한 점수에 따라 슈팅을 시도하고 결과를 표시합니다.
// 사용자 턴을 종료하고 컴퓨터 턴을 시작하도록 설정하며, 버튼 상태를 업데이트합니다.
// 남은 슛 횟수를 감소시키고 UI에 업데이트합니다.
// 게임이 종료되면 승패 여부를 판단하고 모든 버튼을 비활성화합니다.
// showText 함수:

// 화면에 텍스트를 표시하는 함수로, 부드러운 애니메이션 효과가 포함되어 있습니다.

// showText 함수는 HTML 페이지에서 텍스트를 부드럽게 변경하고 페이드 인/아웃 효과를 적용하는 JavaScript 함수입니다. 아래에서 함수의 작동 방식을 자세히 설명하겠습니다.

// 함수 정의:

// showText 함수는 하나의 매개변수 s를 받습니다. 이 s 매개변수는 표시할 텍스트 내용입니다.
// 요소 선택:

// 함수가 실행될 때, $('#text') 선택자를 사용하여 HTML 문서에서 id가 "text"인 요소를 선택합니다. 이 요소는 텍스트를 표시할 대상이 됩니다.
// $textElem 변수에 선택된 요소를 저장합니다.
// 텍스트 페이드 아웃:

// $textElem.fadeOut(300, function() { ... }); 코드는 선택한 요소를 부드럽게 페이드 아웃(투명해지는 효과)시킵니다.
// 300은 페이드 아웃에 걸리는 시간(밀리초)을 나타냅니다. 즉, 300밀리초 동안 요소가 투명해집니다.
// function() { ... } 부분은 페이드 아웃 애니메이션 완료 후 실행할 콜백 함수를 정의합니다.
// 콜백 함수:

// 페이드 아웃 애니메이션이 완료되면 콜백 함수가 실행됩니다.
// 콜백 함수 내부에서는 다음 두 가지 작업을 수행합니다:
// $textElem.html(s);: 선택한 요소의 HTML 내용을 함수로 전달된 s로 업데이트합니다. 이로써 새로운 텍스트가 설정됩니다.
// $textElem.fadeIn(100);: 텍스트가 새로 업데이트된 요소를 부드럽게 페이드 인(투명에서 불투명으로 효과)시킵니다. 100은 페이드 인에 걸리는 시간(밀리초)을 나타냅니다.

// updateComputerScore 및 updateUserScore 함수:

// 컴퓨터와 사용자의 스코어를 업데이트하고 UI에서 애니메이션으로 표시합니다.
// disableComputerButtons 및 disableUserButtons 함수:

// 컴퓨터와 사용자 버튼을 활성화 또는 비활성화하는 함수입니다.
// updateAI 함수:

// 컴퓨터의 슈팅 확률을 업데이트하는 함수로, 사용자와 컴퓨터의 스코어 차이에 따라 확률을 조절합니다.
// 페이지 로드 후 실행되는 코드:

// 페이지가 로드되면 '3', '2', '1' 메시지를 차례로 표시하고, 컴퓨터가 먼저 시작하도록 설정합니다.