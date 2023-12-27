// // 사용하지 않는 로고관련 스크립트 삭제(파일도 삭제)
// // 화면 구성 컴포넌트인 Viewer & Controller 임포트 후 사용

// // useState 기능 사용 - 카운트 초기값은 0으로 설정
// // useState 사용시 반드시 리액트에서 임포트
// import './App.css';
// import Controller from './component/Controller';
// import Viewer from './component/Viewer';
// import {useState} from 'react';

// function App() {
//   const [count, setCount] = useState(0);
//   // count와 setCount 차이
//   // 100 눌러서 100이 달라진 상태 -> setCount
//   // 100 눌러서 300의 결과값 -> count

//   const handleSetCount = (value) => {
//     setCount(count + value);
//   }
//   return (
//     <div className="App">
//       <h1>Simple Counter</h1>
//       <section>
//         {/* Viewer 컴포넌트에 count의 값을 props로 전달 */}
//         <Viewer count={count}/>
//       </section>
//       <section>
//         {/* Controller 컴포넌트에 State 변수 count의 값을 props로 전달 */}
//         <Controller handleSetCount={handleSetCount}/>
//       </section>
//     </div>
//   );
// };

// export default App;



//                    App
//          state형성 [count, setCount]
//          /                    \
//      count                   setCount
//       /                          \
// Viewer                             Controller

// 데이터 전달 방향 -> 위에서 아래 (부모에서 자식)
// 이벤트 전달 방향 -> 아래서 위 (자식에서 부모)




// useEffect를 사용해서 여러개의 값을 검사

// import './App.css';
// import Controller from './component/Controller';
// import Viewer from './component/Viewer';
// import {useEffect, useState} from 'react';

// function App() {
//   const [count, setCount] = useState(0);
//   const [text, setText] = useState("");

//   const handleSetCount = (value) => {
//     setCount(count + value);
//   };

//   const handleChangeText = (e) => {
//     setText(e.target.value)
//   }

//   // useEffect가 변화를 감지하는 것을 console.log를 통해 알 수 있다.
//   // 버튼을 클릭할 때마다 useEffect에 인수로 전달한 콜백함수가 실행되어 
//   // 변경된 state값을 (count) 콘솔에 출력
// //   useEffect(() => {
// //   console.log('count & text 업데이트 : ', text, count);
// // }, [count, text]);
  
//   // 데이터 전달없이 출력메세지만 있는 경우는 
//   // 콜백함수의 실행을 알 수 있음 (데이터 변경추적 X)
//   useEffect(() => {
//     console.log('컴포넌트 업데이트 : ');
//   });

//   return (
//     <div className="App">
//       <h1>Simple Counter</h1>
//       <section>
//         <input value={text} onChange={handleChangeText}/>
//       </section>
//       <section>
//         <Viewer count={count}/>
//       </section>
//       <section>
//         <Controller handleSetCount={handleSetCount}/>
//       </section>
//     </div>
//   );
// };

// export default App;





// useEffect를 업데이트 시점에만 실행
// 특정시점에만
import './App.css';
import Controller from './component/Controller';
import Viewer from './component/Viewer';
import {useRef, useEffect, useState} from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const handleSetCount = (value) => {
    setCount(count + value);
  };

  const handleChangeText = (e) => {
    setText(e.target.value)
  };

  // App 컴포넌트에서 페이지에 마운트(=최초로 화면에 표시)했는지를 
  // 판단하는 변수 didMountRef을 useRef의 객체로 사용함
  // 처음 페이지에 렌더링(화면에 표시)하다 = 마운트 시점
  // 리액트 훅 중 하나인 Ref는 홈페이지의 DOM요소 뿐만이 아닌
  // 컴포넌트의 변수로도 사용가능
  const didMountRef = useRef(false);

  useEffect(() => {
    if(!didMountRef.current){
      didMountRef.current = true;
      return;
    } else{
      console.log('컴포넌트 업데이트 : ');
    }
  });

  useEffect(() => {
    console.log('컴포넌트 마운트')
  }, [])

  return (
    <div className="App">
      <h1>Simple Counter</h1>
      <section>
        <input value={text} onChange={handleChangeText}/>
      </section>
      <section>
        <Viewer count={count}/>
      </section>
      <section>
        <Controller handleSetCount={handleSetCount}/>
      </section>
    </div>
  );
};

export default App;