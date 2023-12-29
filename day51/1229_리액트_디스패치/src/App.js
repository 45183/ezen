// CRUD 기능의 대표적인 구현 방법은 REACT HOOKS 중에 useState입니다
import "./App.css";
import Header from "./component/Header";
import TodoEditor from "./component/TodoEditor";
import TodoList from "./component/TodoList";
import React, { useMemo, useCallback, useReducer, useRef } from "react";
import TestComp from "./component/TestComp";

// 가짜 json형식의 데이터 객체를 형성하여 crud로직을 만들고
// 실제데이터를 갈아끼우는 형태로 개발하시면 됩니다
// useState를 useReducer로 대체하면서 컴포넌트 내
// 상태변화 코드를 정리하였습니다
// 복잡한 상태변화가 필요한 경우에도 컴포넌트 내부를 간결하게 유지가능합니다

// useCallback을 통해서 App이
// 새로고침(리렌더) 될 때, 함수 onUpdate, onDelete를 재생성하지 않도록
// 만들어서 TodoItem 컴포넌트의 렌더링 최적화를 완성하겠습니다.
// useCallback의 원리는 useMemo와 유사합니다.
// const memoizedFunc = useCallback(func, [])
// 위 func은 콜백함수이고, deps는 의존배열이다.
// 같은 메모이제이션의 원리로 콜백함수에 대한 결과배열 데이터를
// 아래 식과 같이 분리하는데, 불필요한 함수의 리렌더링을 방지하는 차원에서
// useCallback 함수는
// 꼭 필요한 경우가 아니라면 콜백함수의 의존 배열을 비워냅니다.

// 현재 이 Context의 기본값으로 설정할 값이 없어서 일단 인수는 생략

// context가 데이터를 다 가지고 있다보니 불필요한 상황에서도
// 페이지 리렌더링 이슈가 발생하며 데이터 전달구조는 ppt참고

export const TodoStateContext = React.createContext();
export const TodoDispatchContext = React.createContext();
const mockTodo = [
  {
    id: 0,
    inDone: false,
    content: "react 공부",
    createdDate: new Date().getTime(),
  },
  {
    id: 1,
    inDone: false,
    content: "개발자 되기",
    createdDate: new Date().getTime(),
  },
  {
    id: 2,
    inDone: false,
    content: "자료 다운로드",
    createdDate: new Date().getTime(),
  },
];

function reducer(state, action) {
  switch (action.type) {
    case "CREATE": {
      return [action.newItem, ...state];
    }
    case "UPDATE": {
      // action.type이 스위치문 기준으로 "UPDATE"일때, 수정할 상태변화 코드작성
      // action.targetId와 id를 비교해 일치하는 아이템의 isDone 관련
      // 새 배열데이터를 리턴합니다
      return state.map((it) =>
        it.id === action.targetId ? { ...it, isDone: !it.isDone } : it
      );
    }
    case "DELETE": {
      return state.filter((it) => it.id !== action.targetId);
    }
    default:
      return state;
  }
}

function App() {
  // useRef의 초기값을 3으로 설정한 이유는
  // 우리가 생성한 가짜데이터 id가 2로 끝나서입니다
  const idRef = useRef(3);
  const [todo, dispatch] = useReducer(reducer, mockTodo);

  const onCreate = (content) => {
    dispatch({
      type: "CREATE",
      newItem: {
        id: idRef.current,
        content,
        isDone: false,
        createdDate: new Date().getTime(),
      },
    });
    idRef.current += 1;
  };

  // targetId는 체크여부로 스케줄을 달성 여부 데이터를 수정하는
  // 데이터의 id를 설정합니다.
  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: "UPDATE",
      targetId,
    });
  }, []);
  const onDelete = useCallback((targetId) => {
    dispatch({
      type: "DELETE",
      targetId,
    });
  }, []);

const memoizedDispatches = useMemo(() => {
  return { onCreate, onUpdate, onDelete };
}, [])



  return (
    <div className="App">
      <TestComp />
      <Header />
      {/* TodoContext가 포함할 컴포넌트는 
      TodoEditor & TodoList 입니다 */}
      {/* 그래서 두 컴포넌트를 
      TodoContext.Provider가 감싸도록 합니다 */}
      {/* 마지막으로 TodoContext.Provider컴포넌트에 값을 전달하기 위해
      Context에 소속된 공급할 모든 값을 담습니다 */}
      {/* 데이터파트와 crud기능 함수로 context값 전달 파트를 분할 */}
      <TodoStateContext.Provider value={ todo}>
        <TodoDispatchContext.Provider
          value={memoizedDispatches}
        >
          <TodoEditor />
          <TodoList />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
}

export default App;
