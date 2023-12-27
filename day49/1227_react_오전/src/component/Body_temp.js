// JSX 문법이라고 부릅니다. (JS와 HTML의 혼종이죠...)
// 당연히 수치연산 & 문자열 표현식도 됩니다.
// 간단한 조건문 boolean 표현식도 보시죠
// 근데 안되는 데이터 형식이 있습니다. 데이터 객체 형식은 안되요.

// html은 태그 표기에 약간 실수가 있어도 브라우저에서 알아서 해석해 주죠?
// 리액트는 그러면 에러 납니다. (여는태그와 닫는태그 반드시 필요)
// JSX가 반환하는 모든 태그는 반드시 최상위 태그로 감싸야 한다
// 페이지 컨텐츠 적으로 정말 최상위 태그가 필요없는 경우,
// <React.Fragment></React.Fragment> 로 감싸면 된다.
// JSX안의 css는 {{스타일 규칙들}} 이런 식으로 작성 합니다.

// props와 state
// body의 state를 props로 전달할 수 있다는 이야기입니다
// 버튼을 통해서 버튼에 지정된 함수를 실행시킵니다 (이벤트발생)
// +1, -1 데이터를 useState를 통해서 데이터를 업데이트 합니다 (함수실행)
// 자식 컴포넌트도 데이터가 state를 통해서 업데이트 되면 자신도 리렌더링 됩니다

// 포커스란 마우스로 입력 폼을 클릭한 상태같이
// 사용자가 데이터를 입력하도록 커서가 깜빡이며 대기하는 상태를 의미

// state변수 text로 관리하는 텍스트 입력 폼 하나와 버튼 하나를 만들었어요
// 1. 내가 입력창에 뭔가 입력하면 입력창 데이터의 변화를 감지하여 handleOnChange이 실행
// 2. handleOnChange이 실행되면 setText(상태변화 업데이트)가 업데이트 된다.
// 3. 변화된 상태가 text변수에 저장 (state의 메커니즘에 의해)
// 4. 마우스 클릭 시 handleOnClick함수가 실행되고 그 handleOnClick함수가 text출력
// 5. 텍스트 출력 후에 textRef.current.value = "" 를 통해서 입력폼 초기화
// 6. useRef를 사용해서 html의 input태그에 접근하여 alert출력 후 데이터 초기화
// 7. 5글자 미만으로 데이터 입력 시 포커스 기능을 켜서 사용자의 데이터 입력을 유도

// Ref 참조의 줄임말인데 DOM요소의 조작을 위해 사용됩니다
// 웹서비스 로그인 페이지를 생각해보시죠
// 로그인 서비스는 입력폼을 초기화 해야 하는데
// useRef를 통해서 텍스트 입력폼을 초기화 합니다

// useRef, useState 와 같이 리액트에서 불러오는 use로 시작하는 친구들은
// 리액트 훅의 일종이다. 리액트 훅이란 함수로 만든 리액트 컴포넌트에서 
// 클래스로 만든 리액트 컴포넌트의 사용을 가능하도록 도와주는 함수이다
// 원래 리액트 컴포넌트는 함수로 간단하게 사용할 수 없었고 
// 반드시 클래스로 만들어야 했다. (클래스로 전부 만들려고 하면 코딩난이도 올라가죠?)
// 2018년도에 리액트 훅이 처음 소개되었다 react hook
// 클래스로 만든 기능을 고리가지고 낚아채서 쓴다는 의미이다




import "./Body.css";
import { useRef, useState } from "react";

function Body() {
  const [text, setText] = useState("");
  // useRef() 함수의 선언이 필요
  const textRef = useRef();
  // state상태변화 업데이트 함수
  const handleOnChange = (e) => {
    setText(e.target.value);
  };
  // 버튼 태그 클릭 시 실행되는 함수인데
  // textRef.current.value = "" 로 html의 input태그에 접근하여 데이터 초기화시킴
  const handleOnClick = () => {
    if (text.length < 5) {
      textRef.current.focus();
    } else {
      alert(text);
      setText("");
    }
  };

  return (
    <div>
      <input ref={textRef} value={text} onChange={handleOnChange} />
      <button onClick={handleOnClick}>작성완료</button>
    </div>
  );
}

export default Body;
