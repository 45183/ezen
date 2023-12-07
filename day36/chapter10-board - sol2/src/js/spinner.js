// 자바스크립트의 전반적 특징: 
// 변수 선언을 통해서 객체화 시킵니다.
// **목적을 생각하시면 **구성요소를 떠올리실 수 있습니다
// 로딩화면 시 스피너는 재사용 용이 --> 함수
// 1. 함수를 어디에 쓸건데?
// 2. 뭐 띄울건데?
// 3. 니 이미지 망하면 대안은?
export function createSpinner(parent) {
  const spinnerAreaEl = parent.querySelector('.spinner-area'); 
  // 여기 .spinner-area로 위치지정
  const imageEl = document.createElement('img'); 
  //스피너 그림처리하는 변수를 만들어서 객체화
  imageEl.alt = 'ㅌㅌㅌㅌㅌ'; 
  imageEl.src = './src/image/spinner.gif';

  spinnerAreaEl.append(imageEl); 
  // 이제 .spinner-area 클래스 안에 방금 지정한 
  // (스피너그림과 설명이 있는) imageEl 객체를 넣어
}
