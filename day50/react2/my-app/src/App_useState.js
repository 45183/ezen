// useState (App.js는 useReducer)



// CRUD 기능의 대표적인 구현 방법은 React Hooks 중에 useSate
import './App.css';
import Header from './component/Header';
import TodoEditor from './component/TodoEditor';
import TodoList from './component/TodoList';
import {useState, useRef} from 'react';
import TestComp from './component/TestComp';

// 가짜 json형식의 데이터 객체를 형성하여 CRUD로직을 만들고 
// 실제 데이터로 갈아끼우는 형태로 개발 
const mockTodo = [
  {
    id: 0,
    isDone: false,
    content: 'react 테스트1',
    createdDate: new Date().getTime()
  },
  {
    id: 1,
    isDone: false,
    content: 'react 테스트2',
    createdDate: new Date().getTime()
  },
  {
    id: 2,
    isDone: false,
    content: 'react 테스트3',
    createdDate: new Date().getTime()
  }
]

function App() {
  // useRef의 초기값을 3으로 설정한 이유는
  // 생성한 가짜 데이터 id가 2로 끝나서
  const idRef = useRef(3);
  const [todo, setTodo] = useState(mockTodo);

  const onCreate = (content) => {
    // todoEditor 컴포넌트에서 <추가> 버튼을 누르면 호출될 함수 onCreate를 생성
    // 함수는 사용자가 작성한 데이터를 받아 변수 content에 저장
    // 받아서 저장한 데이터로 새 할일 객체를 만들어 newItem에 저장
    const newItem = {
      // id: 0, // id가 0이니까 항상 맨 위에 올라옴  // 이처럼 id를 0으로 설정하면 기존 데이터 id와 중복되는 문제 발생
      id: idRef.current,
      content,
      isDone: false,
      createdDate: new Date().getTime(),
    }
    // 배열의 스프레드 연산자를 이용해 newItem을 포함한 새 배열을 만들어서 state변수를 업데이트
    // 새롭게 추가되는 아이템은 항상 배열의 0번 요소 (id = 0)
    setTodo([newItem, ...todo]);
    idRef.current += 1;
  };

  // 함수 onUpdate는 TodoItem에 이벤트가 발생했을때 호출
  // 어떤 TodoItem에 이벤트가 발생했는지 알아야하므로 아이템 데이터의 id를 저장
  // todo값을 업데이트하기위해 setTodo 호출
  // map 메서드를 이용해서 it.id === targetId 조건을 만족하면
  // 새 배열 데이터를 만들어서 인수(인풋)값으로 전달
  // const onUpdate = (targetId) => {
  //   setTodo(
  //     todo.map((it) => {
  //       if(it.id === targetId){
  //         return {
  //           ...it, 
  //           isDone: !it.isDone,
  //         };
  //       } else{
  //         return it;
  //       };
  //     })
  //   )
  // };

  const onUpdate = (targetId) => {
    setTodo(
      todo.map((it) => 
        it.id === targetId ? {...it, isDone: !it.isDone} : it
      )
    )
  };


  const onDelete = (targetId) => {
    setTodo(todo.filter((it) => it.id !== targetId))
  }

  return (
    <div className="App">
      <TestComp />
      <Header />
      <TodoEditor onCreate={onCreate}/>
      {/* 배열 todo를 TodoList 컴포넌트에 props로 전달 */}
      <TodoList todo={todo} onUpdate={onUpdate} onDelete={onDelete}/>
    </div>
  );
}

export default App1;
