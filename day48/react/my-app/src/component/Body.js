// JSX 문법 (JS와 HTML)
// 수치연산, 문자열 표현식도 가능
// 간단한 조건문 boolean 표현식도 가능

// 데이터 객체 형식은 불가능


// html은 태그 표기에 약간 실수가 있어도 브라우저에서 알아서 해석해주지만
// 리액트는 에러 발생 (여는 태그와 닫는 태그 반드시 필요 <> </>)
// JSX가 반환하는 모든 태그는 반드시 최상위 태그로 감싸야 한다.
// 페이지 컨텐츠적으로 정말 최상위 태그가 필요없는 경우, <React.Fragment></React.Fragment>로 감싸면 된다.
// 단, import React from 'react' 먼저 선언



// JSX 안의 css는 {{스타일 규칙}} 이런 식으로 작성 - 중괄호 두개

import React from "react";

// css 호출
import './Body.css';

function Body(){
    const number = 1;
    const number2 = 8;
    const strA = '리액트, ';
    const strB = '테스트';
    const boolA = true;
    const boolB = false;
    const objA = {
        a: 1,
        b: 3
    }
    return (
        // <React.Fragment>
        // <div style={{backgroundColor: 'red', color: 'white'}}>
        <div className="body">
            <h2>본문</h2>
            {/* 아래는 전달하려믄 props는 단일객체인 케이스 */}
            <h3>{number}</h3>
            <h3>{number + number2}</h3>
            <h3>{strA + strB}</h3>
            <h3>{String(boolA)}</h3>
            <h3>{String(boolA || boolB)}</h3>
            <h3>{String(boolA && boolB)}</h3>
            {/* 프로퍼티 접근 표기법 (객체내부의 값 명시함으로써) 원시자료형으로 변환 */}
            {/* <h3>{objA}</h3> */}
            <h3>a : {objA.a}</h3>
            <h4>
                {number}은(는) {number % 2 === 0 ? '짝수' : '홀수'}다.
            </h4>
        </div>
        // </React.Fragment>

    );
};

export default Body;