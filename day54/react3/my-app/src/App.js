import {Routes, Route, Link} from 'react-router-dom';
// Routes는 여러 Route 컴포넌트를 감쌈, 그리고 현재 url 경로에 맞게 적절한 Route 컴포넌트를 페이지에 렌더링
import React, { useReducer, useRef, useEffect, useState } from 'react';
import Home from './pages/Home';
import Edit from './pages/Edit';
import New from './pages/New';
import Diary from './pages/Diary';
import './App.css';

// 일기 state값 컴포넌트 그룹에 전달할 context를 생성
// 이때 이 컨텍스트를 다른파일(컴포넌트)에서 불러올 수 있게 export
// context 사용 시 지나친 페이지 리렌더링 이슈를 막기 위한
// dispatch도 사용을 위해 불러옴
export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function reducer(state, action){
  switch (action.type){
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      const newState = [action.data, ...state];
      localStorage.setItem('diary', JSON.stringify(newState));
      return newState;
    }
    case 'UPDATE': {
      const newState = state.map((it) => String(it.id) === String(action.data.id) ? {...action.data} : it);
      localStorage.setItem('diary', JSON.stringify(newState));
      return newState;
    }
    case 'DELETE': {
      const newState = state.filter((it) => String(it.id) !== String(action.targetId));
      localStorage.setItem('diary', JSON.stringify(newState));
      return newState;
    }
    default: {
      return state;
    }
  };
};

const mockData = [
  {
    id: 'mock1',
    date: new Date().getTime()-1,
    content: 'mock1',
    emotionId: 1,
  },
  {
    id: 'mock2',
    date: new Date().getTime()-2,
    content: 'mock2',
    emotionId: 2,
  },
  {
    id: 'mock3',
    date: new Date().getTime()-3,
    content: 'mock3',
    emotionId: 3,
  },
  {
    id: 'mock4',
    date: new Date().getTime()-4,
    content: 'mock4',
    emotionId: 4,
  },
  {
    id: 'mock5',
    date: new Date().getTime()-5,
    content: 'mock5',
    emotionId: 5,
  },
]

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);
  // 함수 onCreate는 사용자가 선택한 날짜, 입력일기 데이터, 선택한 감정 세가지 데이터를 받아서 저장
  // 상단의 함수 dispatch를 호출하여 데이터는 객체로 저장할 때 타입은 'CREATE'로 한다.
  // 마지막으로 일기를 저장할 때마다 idRef.current += 1로 id값을 1씩 늘려서 id 데이터가 중복되지 않도록 함
  
  const [isDataLoaded ,setIsDataLoaded] = useState(false);

  useEffect(() => {
    // 로컬 스토리지로부터 diary라는 키값에 저장해 둔 데이터를 불러와서 rawData 변수에 저장
    // 만약 rawData가 존재하지 않는다면 setIsDataLoaded를 true로 업데이트하고 종료
    // 데이터가 존재하면 JSON 객체로 복원
      const rawData = localStorage.getItem('diary');
      if(!rawData){
        setIsDataLoaded(true);
        return;
      };
      const localData = JSON.parse(rawData);
      if(localData.length === 0){
        setIsDataLoaded(true);
        return;
      };
      // 불러온 일기 데이터를 id기준 내림차순 정렬
      // 내림차순 정렬이므로 localData[0] 즉, 데이터 배열의 첫 원소는 id 중 가장 큰 값이 됨
      // idRef.current 즉, id의 현재값은 일기 id에서 가장 큰 값에 1 더한 값으로 설정
      localData.sort((a,b) => Number(b.id) - Number(a.id));
      idRef.current = localData[0].id + 1;
      dispatch({type: 'INIT', data: localData});
      setIsDataLoaded(true);
    }, []);

  const onCreate = (date, content, emotionId) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current,
        date: new Date(date).getTime(), 
        content,
        emotionId,
      },
    });
    idRef.current += 1;
  };

  const onUpdate = (targetId, date, content, emotionId) => {
    dispatch({
      type: 'UPDATE',
      data: {
        id: targetId,
        date: new Date(date).getTime(), 
        content,
        emotionId,
      },
    });
  };

  // 일기 state를 dispatch로 업데이트하는 삭제함수인데 (삭제 상태를 업데이트)
  // 변수 targetId로 삭제할 아이디를 저장
  // 일기 객체의 타입으로 삭제를 의미하는 delete와 targetId로 삭제할 일기 id를 저장
  const onDelete = (targetId) => {
    dispatch({
      type: 'DELETE',
      targetId,
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      {/* 불필요한 리렌더링 최소화 */}
      <DiaryDispatchContext.Provider value={{onCreate, onUpdate, onDelete,}}>
        <div className="App">
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/edit/:id' element={<Edit />}></Route>
            <Route path='/new' element={<New />}></Route>
            <Route path='/diary/:id' element={<Diary />}></Route>
          </Routes>
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
};

export default App;
