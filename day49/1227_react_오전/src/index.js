import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// 방금 아래 날린 파일은 리액트 웹의 성능측정 도구입니다.
// 저는 아래 코드에 대해 설명을 드리고자 코멘트 처리하고 남겼습니다만
// 여러분들은 삭제하셔도 좋습니다.
// import reportWebVitals from './reportWebVitals';

// ReactDOM.createRoot : 인풋으로 전달한 요소를 
// 리액트 앱의 루트로 결과를 보이다(리턴하다)
// 자바스크립트로 작성된 요소들의 루트를 가리킴
// id가 root인 요소를 루트개념으로 만들어서 root라는 변수에 저장
const root = ReactDOM.createRoot(document.getElementById('root'));
// 리액트의 루트요소 아래에 App 컴포넌트를 배치해 렌더링 합니다.
root.render(
  // 리액트 앱 내부의 잠재적인 문제를 검사하는 도구입니다.
  // 지금 앱의 구현과는 무관하니 삭제하세요
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);

// 아래도 날리세요. 성능측정 스크립트를 날렸죠?
// reportWebVitals();
