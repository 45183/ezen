import './Body.css';
// 리액트에서 이벤트 함수 처리방법은
// 이벤트 처리 자바스크립트 함수를 사전 정의 후
// 메인 함수 내 html에서 정의된 함수 사용

// 주의사항
// 1. html에서는 onclick인데 리액트에선 onClick 캐멀표기법으로 반드시 사용
// 2. html에선 'handleOnClick()'인데 리액트에선 {handleOnClick}
// html은 함수 호출의 결과를 제공 리액트에선 함수 그 자체를 전달

// function Body(){
//     function handleOnClick(){
//         alert('버튼이 눌렸습니다.');
//     }
//     return (
//         <div className='body'>
//             <button onClick={handleOnClick}>click</button>
//         </div>
//     );
// };



// // 이벤트 객체 사용하기
// // 이벤트 객체란 이벤트가 어떤 요소에서 발생했는지 관련된 정보를 아는 것
// function Body(){
//     function handleOnClick(e){
//         alert(e.target.name);
//     }
//     return (
//         <div className='body'>
//             <button name='button a' onClick={handleOnClick}>button a</button>
//             <button name='button b' onClick={handleOnClick}>button b</button>
//         </div>
//     );
// };


// useState로 State 생성하기
// [useState의 용법]
// const [light, setLight] = useSate('off');
// light는 현재 상태의 값을 지정하는 변수, 이 변수를 state 변수라고 부름
// setLight는 State 변수의 값을 업데이트하는 함수 
// useState를 호출할 때 인수로 값을 전달하면 이 값이 State의 초기값이 된다.
// 위 예시에서 off를 전달했으므로 STate변수 light의 초기값은 off가 된다.



// 컴포턴트에 버튼을 하나 만들고 버튼 클릭시, State(count) 1씩 증가

// 이렇게 set함수를 호출해서 State 값을 변경하면, 이 값을 페이지에 반영하기 위해 컴포넌트를 다시 렌더링함.
// 이를 '컴포넌트의 업데이트'라고 한다.
// 컴포넌트를 렌더링한다 = 컴포넌트함수를 다시 호출한다
// state값이 변해서 컴포넌트를 다시 렌더링하는 것을 '리렌더링'이라고 한다.

// state 사용의 대표적 예시 = 사용자 입력관리 <input>, <select></select>, <textarea></textarea>

// import {useState} from "react";

// function Body(){
//     // 컴포넌트를 렌더링할때마다 콘솔에 메세지 출력
//     console.log('update')
//     // 함수 useState는 초기값으로 0을 전달, 받은 결과값을 State변수 count로 반환
//     const [count, setCount]  = useState(0);

//     const onIncrease = () => {
//         setCount(count+1);
//     }
//     return (
//         <div>
//             <h2>{count}</h2>
//             <button onClick={onIncrease}>click</button>
//         </div>
//         )
// }




// // state를 하나 만들고 사용자가 폼에 데이터 입력할 때마다 결과 텍스트 데이터를 state 값으로 저장하는 작업

// import {useState} from "react";

// function Body(){

//     // 초기상태, 업데이트 상태를 가진 useState를 선언
//     const [text, setText] = useState("");

//     const handleOnClick = (e) => {
//         // 폼에 입력된 텍스트를 변경할 때마다 set함수를 호출해서 text값을 바꿈
//         setText(e.target.value);
//     };

//     return (
//         <div>
//             <input value={text} onChange={handleOnClick} />
//             <div>{text}</div>
//         </div>
//     );
// };





// // 날짜 데이터

// import {useState} from "react";

// function Body(){

//     // 초기상태, 업데이트 상태를 가진 useState를 선언
//     const [date, setDate] = useState("");

//     const handleOnClick = (e) => {
//         // 폼에 입력된 텍스트를 변경할 때마다 set함수를 호출해서 text값을 바꿈
//         setDate(e.target.value);
//     };

//     return (
//         <div>
//             <input type='date' value={date} onChange={handleOnClick} />
//             <div>{date}</div>
//         </div>
//     );
// };

// export default Body;






// // 드랍다운 상자로 옵션 선택하기
// // 드랍다운 입력 폼에서 사용자가 옵션을 바꾸면 onChange 이벤트 발생

// import {useState} from "react";

// function Body(){

//     // 초기상태, 업데이트 상태를 가진 useState를 선언
//     const [option, setOption] = useState("");

//     const handleOnClick = (e) => {
//         console.log("변경된 값 ", e.target.value);
//         setOption(e.target.value);
//     };

//     return (
//         <div>
//             <select value={option} onChange={handleOnClick}>
//                 <option key={'1번'}>1번</option>
//                 <option key={'2번'}>2번</option>
//                 <option key={'3번'}>3번</option>
//                 <option key={'4번'}>4번</option>
//             </select>
//         </div>
//     );
// };








// 여러개의 사용자 입력 데이터 관리(state로 어떻게 관리하는지)

// import {useState} from "react";

// function Body(){

//     // 1. useState의 초기 변수를 원하는 데이터셋의 종류만큼 선언
//     const [name, setName] = useState("");
//     const [gender, setGender] = useState("");
//     const [birth, setBirth] = useState("");
//     const [bio, setBio] = useState("");

//     // 2. 선언된 데이터 셋만큼 이벤트 처리함수를 만들어준다
//     const OnChangeName = (e) => {
//         setName(e.target.value);
//     };
//     const OnChangeGender = (e) => {
//         setGender(e.target.value);
//     };
//     const OnChangeBirth = (e) => {
//         setBirth(e.target.value);
//     };
//     const OnChangeBio = (e) => {
//         setBio(e.target.value);
//     };
    
//     //3. html 컨텐츠를 만들어서 데이터 입력을 받음
//     // 데이터 입력시 onChange 조건이 트리거되어 각 지정된 함수가 실행되고
//     // 그 지정함수는 위에 사전정의되어 있다.
//     return (
//         <div>
//             <div>
//                 <input value={name} onChange={OnChangeName} placeholder='이름' />
//             </div>
//             <div>
//                 <select value={gender} onChange={OnChangeGender}>
//                     <option key={''}></option>
//                     <option key={'남성'}>남성</option>
//                     <option key={'여성'}>여성</option>
//                 </select>
//             </div>
//             <div>
//                 <input type='date' value={birth} onChange={OnChangeBirth} />
//             </div>
//             <div>
//                 <textarea value={bio} onChange={OnChangeBio} />
//             </div>
//         </div>
//     );
// };









// props 와 state
// body의 state를 props로 전달할 수 있다는 말

// 버튼을 통해서 버튼에 지정된 함수를 실행 (이벤트 발생)
// +1, -1 데이터를 useState를 통해서 데이터를 업데이트 (함수실행)
// 자식 컴포넌트(Viewer)도 데이터가 state를 통해서 업데이트 되면 자신도 리렌더링 된다.
// import {useState} from "react";

// function Viewer({number}){
//     return <div>{number % 2 === 0 ? <h3>짝수</h3> : <h3>홀수</h3>}</div>;
// };

// function Body(){
//     const [number, setNumber] = useState(0);
//     const onIncrease = () => {
//         setNumber(number + 1);
//     };
//     const onDecrease = () => {
//         setNumber(number - 1);
//     };


//     return (
//         <div>
//             <h2>{number}</h2>
//             <Viewer number={number} />
//             <div>
//                 <button onClick={onDecrease}>-1</button>
//                 <button onClick={onIncrease}>+1</button>
//             </div>
//         </div>
//     );
// };

// export default Body;






// import {useState} from "react";


// function Body(){
//     // state 변수 text로 관리하는 텍스트 입력 폼 하나와 버튼 하나 생성
//     // 1. 입력창에 입력시 입력된 데이터의 변화를 감지하여 handleOnChange가 실행
//     // 2. handelOncChange가 실행되면 setText(상태변화 업데이트)가 업데이트
//     // 3. 변화된 상태가 text 변수에 저장 (state의 메커니즘에 의해)
//     // 4. 마우스 클릭시 handleOnClick 함수가 실행되고 text 출력
//     const [text, setText] = useState("");

//     const handleOnChange = (e) => {
//         setText(e.target.value);
//     };

//     const handleOnClick = () => {
//         alert(text);
//     }

//     return (
//         <div>
//             <input value={text} onChange={handleOnChange} />
//             <button onClick={handleOnClick}>작성완료</button>
//         </div>
//     );
// };

// export default Body;







// Ref  참조의 줄임말인데 DOM 요소의 조작을 위해 사용
// 웹 서비스 로그인 페이지를 생각해보면 
// 로그인 서비스는 입력폼을 초기화해야하는데 useRef를 통해서 텍스트 입력폼을 초기화


// import {useRef, useState} from "react";


// function Body(){
//     // state 변수 text로 관리하는 텍스트 입력 폼 하나와 버튼 하나 생성
//     // 1. 입력창에 입력시 입력된 데이터의 변화를 감지하여 handleOnChange가 실행
//     // 2. handelOncChange가 실행되면 setText(상태변화 업데이트)가 업데이트
//     // 3. 변화된 상태가 text 변수에 저장 (state의 메커니즘에 의해)
//     // 4. 마우스 클릭시 handleOnClick 함수가 실행되고 text 출력
//     // 5. 텍스트 출력 후에 textRef.current.value = ""를 통해 입력폼 초기화
//     // 6. useRef를 사용해서 html의 input 태그에 접근하여 alert 출력 후 데이터 초기화 
//     const [text, setText] = useState("");
//     // useRef의 선언이 필요
//     const textRef = useRef();

//     const handleOnChange = (e) => {
//         setText(e.target.value);
//     };

//     // 버튼 태그 클릭시 실행되는 함수
//     // textRef.current.value = "";로 html의 input 태그에 접근하여 데이터 초기화
//     const handleOnClick = () => {
//         alert(text);
//         textRef.current.value = "";
//     }

//     return (
//         <div>
//             <input ref={textRef} value={text} onChange={handleOnChange} />
//             <button onClick={handleOnClick}>작성완료</button>
//         </div>
//     );
// };

// export default Body;




// state란 웹서비스의 상태와 업데이트 상태를 반영하는 기법
// 웹 서비스 상태변화에 따른 달라진 업데이트된 컨텐츠
// 즉, 달라진 상태를 표기하는 방법

// 일반화된 state함수 표기법
// const [light, setLight] = useState('off);
// light는 state변수(상태변수)이며, setLight는 state변수의 상태변화(업데이트)를 나타내는 변수
// useState() 안의 소괄호에는 초기값을 지정하면 된다.





// useRef, useState와 같이 리액트에서 불러오는 use로 시작하는 친구들은
// 리액트 훅의 일종
// 리액트 훅(React hook)이란 함수로 만든 리액트 컴포넌트에서 
// 클래스로 만든 리액트 컴포넌트의 사용을 가능하도록 도와주는 함수
// 원래 리액트 컴포넌트는 함수로 간단하게 사용할 수 없었고
// 반드시 클래스로 만들어야 했다 (클래스로 전부 만들려고하면 어려워짐)
// 클래스로 만든 기능을 고리가지고 낚아채서 사용한다는 의미

// 포커스란 마우스로 입력 폼을 클릭한 상태같이 
// 사용자가 데이터를 입력하도록 커서가 깜빡이며 대기하는 상태를 의미

import {useRef, useState} from "react";


function Body(){
    // state 변수 text로 관리하는 텍스트 입력 폼 하나와 버튼 하나 생성
    // 1. 입력창에 입력시 입력된 데이터의 변화를 감지하여 handleOnChange가 실행
    // 2. handelOncChange가 실행되면 setText(상태변화 업데이트)가 업데이트
    // 3. 변화된 상태가 text 변수에 저장 (state의 메커니즘에 의해)
    // 4. 마우스 클릭시 handleOnClick 함수가 실행되고 text 출력
    // 5. 텍스트 출력 후에 textRef.current.value = ""를 통해 입력폼 초기화
    // 6. useRef를 사용해서 html의 input 태그에 접근하여 alert 출력 후 데이터 초기화 
    // 7. 5글자 미만으로 데이터 입력시 포커스 기능을 켜서 사용자의 데이터 입력을 유도
    const [text, setText] = useState("");
    // useRef의 선언이 필요
    const textRef = useRef();

    const handleOnChange = (e) => {
        setText(e.target.value);
    };

    // 버튼 태그 클릭시 실행되는 함수
    // textRef.current.value = "";로 html의 input 태그에 접근하여 데이터 초기화
    const handleOnClick = () => {
        if(text.length < 5){
            textRef.current.focus();
        } else {
            alert(text);
            setText("");
        }
    }

    return (
        <div>
            <input ref={textRef} value={text} onChange={handleOnChange} />
            <button onClick={handleOnClick}>작성완료</button>
        </div>
    );
};

export default Body;