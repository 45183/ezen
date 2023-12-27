// JSX 문법이라고 부릅니다. (JS와 HTML의 혼종이죠...)
// 당연히 수치연산 & 문자열 표현식도 됩니다.
// 간단한 조건문 boolean 표현식도 보시죠
// 근데 안되는 데이터 형식이 있습니다. 데이터 객체 형식은 안되요 objA이건 안됨.
// 단, key값을 명시하여 원시 자료형으로 바꾸면 가능하다

// html은 태그 표기에 약간 실수가 있어도 브라우저에서 알아서 해석해 주죠?
// 리액트는 그러면 에러 납니다. (여는태그와 닫는태그 반드시 필요)
// JSX가 반환하는 모든 태그는 반드시 최상위 태그로 감싸야 한다
// 페이지 컨텐츠 적으로 정말 최상위 태그가 필요없는 경우,
// <> </>  빈 태그로 라도 감싸야 한다
// <React.Fragment></React.Fragment> 로 감싸면 된다.
// 단, <React.Fragment> 쓰려면 import React from "react"; 기능을 불러와야 함
// html내부 조건문 사용 가능함
import "./Body.css";
import React from "react";
function Body(props) {
  const{name,location} = props;
  const number = 1;
  const number_777 = 88;
  const strA = "리액트, ";
  const strB = "또 시작이군";
  const boolA = true;
  const boolB = false;
  const objA = {
    a: 1,
    b: 3,
  };


return (
  <div className='body7777'>
    <h3>{name}은 {location}에 살아요</h3>

    </div>
)


}

export default Body;
