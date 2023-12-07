// 1. 버튼을 생성하고 알림을 표시할 박스를 정의 합니다.
// 2. 버튼을 누르면 함수가 실행되게 정의하고 해당 함수 안에 클릭할 때마다 알림요소를 생성합니다.
// 3. 알림을 생성하고 3초간 아무 동작이 없으면 알림들을 제거합니다.


// HTML 문서에서 id가 'bttn'인 요소를 선택하여 버튼으로 사용
const bttn = document.getElementById('bttn');

// HTML 문서에서 id가 'noti-box'인 요소를 선택하여 알림을 표시할 박스로 사용
const notiBox = document.getElementById('noti-box');

// 버튼에 클릭 이벤트 리스너 추가
bttn.addEventListener('click', () => {
  // 새로운 알림을 생성하는 <div> 요소 생성
  const noti = document.createElement('div');
  
  // 생성한 알림 요소에 'noti' 클래스 추가
  noti.className('noti');
  
  // 알림 내용 설정
  noti.innerText = "알림 내용이 표시됩니다.";
  
  // 알림을 알림 박스에 추가
  notiBox.append(noti);

  // 3초 후에 알림을 제거하는 타이머 설정
  setTimeout(() => {
    noti.remove(); // 알림 요소를 제거하여 사용자에게 표시하지 않음
  }, 3000); // 3000 밀리초 (3초) 후에 실행
});
