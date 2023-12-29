import './App.css';
import Header from './component/Header';
import TodoEditor from './component/TodoEditor';
import TodoList from './component/TodoList';
import React, {useMemo, useCallback, useReducer, useRef} from 'react';
import TestComp from './component/TestComp';


// context 도입 이후 todoitem 컴포넌트가 불필요하게 리렌더링됨
// 문제의 이유는 provider 역시 리액트 컴포넌트이므로 props를 쏠때마다 리렌더되기 때문

// context가 데이터를 다 가지고 있다보니 불필요한 상황에서도 페이지 리렌더링 이슈가 발생
// 데이터 전달구조는 ppt 참고
// export const TodoContext = React.createContext();     // 현재 이 Context의 기본값으로 설정할 값이 없어서 일단 인수는 생략
// TodoContext를 TodoStateContext와 TodoDispatchContext로 나눔
export const TodoStateContext = React.createContext();
export const TodoDispatchContext = React.createContext();

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


function reducer(state, action){
  switch (action.type){
    case 'CREATE': {
      return [action.newItem, ...state];
    }
    case 'UPDATE': {
      return state.map((it) => it.id === action.targetId ? {...it, isDone: !it.isDone} : it)
    }
    case 'DELETE': {
      return state.filter((it) => it.id !== action.targetId);
    }
    default:
      return state;
  }
}

function App() {
  const idRef = useRef(3);
  const [todo, dispatch] = useReducer(reducer, mockTodo);

  const onCreate = (content) => {

    dispatch({
      type: 'CREATE',
      newItem: {
        id: idRef.current,
        content,
        isDone: false,
        createdDate: new Date().getTime(),
      }
    });
    idRef.current += 1;
  };

  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: 'UPDATE',
      targetId
    })
  }, []);

  const onDelete = useCallback((targetId) => {
    dispatch({
      type: 'DELETE',
      targetId
    })
  },[]);


  const memoizedDispatches = useMemo(() => {
    return {onCreate, onDelete, onUpdate};  // 함수는 객체 처리
  }, []);


  return (
    <div className="App">
      <TestComp />
      <Header />
      {/* TodoContext가 포함할 컴포넌트는 TodoEditor와 TodoList
      그래서 두 컴포넌트를 TodoContext.Provider가 감싸도록 함 */}
      {/* 마지막으로 TodoContext.Provider 컴포턴트에 값을 전달하기 위해 
      Context에 소속된 공급할 모든 값을 담음 (TodoEditor -> onCreate  /  TodoList -> todo, onUpdate, onDelete) */}
      <TodoStateContext.Provider value={todo}>  {/* 객체처리가 아닌 그냥 데이터로 받음 */}  {/* 데이터와 CRUD 기능 함수로 context값 전달 파트를 분할 -> 데이터만 있는경우 객체처리 하지 않아도 됨 (함수와 같이 보내려고 객체 처리)*/}
        <TodoDispatchContext.Provider value={memoizedDispatches}>
          <TodoEditor />
          <TodoList />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
}

export default App;



// props를 통해서 함수와 데이터 전달했을 때, 데이터와 함수를 함께 보내려고 함
// 자바스크립트에서 자바스크립트, 함수 등은 {함수 혹은 자바스크립트 이름} 이런식으로
// 중괄호 안에 넣어서 "객체" 형태로 넘김
// 그런데 데이터를 한 객체 안에 넣어서 같이 보내려고 편의상 데이터를 객체화해서 넘김
// 자바스크립트 언어 자체가 json 데이터도 그렇고 객체를 매우 사랑하는 언어
// dispatch의 도입으로 인해 데이터와 함수를 분리해서 context 즉, 같은 맥락별로 묶음
// 그래서 더이상 데이터와 함수를 함께 보낼 필요가 없으니 데이터를 객체처리할 필요성이 사라짐
// 이전 예제에서도 함수를 보낼 일이 없었다면 데이터의 객체화는 필요치 않았을 것
