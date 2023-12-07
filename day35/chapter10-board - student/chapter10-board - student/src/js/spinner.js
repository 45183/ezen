// 자바스크립트의 전반적 특징
// 변수 선언을 통해서 객체화 시킨다.

// 목적을 생각하면 구성요소를 떠올릴 수 있다.
// 로딩화면시 스피너는 재사용 용이 --> 함수
// 1. 어디에 사용할 지
// 2. 뭐를 띄울건지
// 3. 이미지가 망했을때 대안은 뭔지
export function createSpinner(parent) {
  const spinnerAreaEl = parent.querySelector('.spinner-area');
  // class : spinner-area 로 위치 지정
  const imageEl = document.createElement('img');
  // 스피너 그림처리하는 변수를 만들어서 객체화
  imageEl.alt = 'spinner';
  imageEl.src = './src/image/spinner.gif';

  spinnerAreaEl.append(imageEl);
  // spinner-area 클래스 안에 방금 지정한 (스피너 그림과 설명이 있는) imageEl 객체를 넣음
}
