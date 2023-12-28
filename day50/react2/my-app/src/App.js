// useReducer


// 가짜 json 형식의 데이터 객체를 형성하여 CRUD 로직을 만들고
// 실제 데이터를 갈아끼우는 형태로 개발
// useState를 useReducer로 대체하면서 컴포넌트 내 상태변화 코드를 정리
// 복잡한 상태변화가 필요한 경우에도 컴포넌트 내부를 간결하게 유지 가능

// useCallback을 통해서 App이 새로고침(리렌더링)될 때, 함수 onUpdate, onDelete를
// 재생성하지 않도록 만들어서 TodoItem 컴포넌트의 렌더링 최적화를 완성

import './App.css';
import Header from './component/Header';
import TodoEditor from './component/TodoEditor';
import TodoList from './component/TodoList';
import {useCallback, useReducer, useRef} from 'react';
import TestComp from './component/TestComp';


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
      // action.type이 switch문 기준으로 'UPDATE'일때 수정할 상태변화 코드 작성
      // action.targetId와 id를 비교해 일치하는 아이템의 isDone관련 새 배열 데이터를 리턴
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

  // targetId는 체크 여부로 스케줄을 달성했는지 여부 데이터를 수정하는 데이터의 id를 설정
  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: 'UPDATE',
      targetId
    })
  }, []);
  // useCallback의 의미는 useMemo와 유사
  // const memoizedFunc = useCallback(func, [deps])
  // 위 func는 콜백함수, [deps]는 의존배열
  // 같은 메모이제이션의 원리로 콜백함수에 대한 결과배열 데이터를 아래 식과 같이 분리하는데
  // 불필요한 함수의 리렌더링을 방지하는 차원에서 useCallback 함수는 꼭 필요한 경우가 아니라면 
  // 콜백함수의 의존배열을 비움

  // 의존성배열 [] -> useCallback에서 반드시 필요한 경우가 아니면 비움


  const onDelete = useCallback((targetId) => {
    dispatch({
      type: 'DELETE',
      targetId
    })
  },[]);

  return (
    <div className="App">
      <TestComp />
      <Header />
      <TodoEditor onCreate={onCreate}/>
      <TodoList todo={todo} onUpdate={onUpdate} onDelete={onDelete}/>
    </div>
  );
}

export default App;
