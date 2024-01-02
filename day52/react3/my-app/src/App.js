import {Routes, Route, Link} from 'react-router-dom';
// Routes는 여러 Route 컴포넌트를 감쌈, 그리고 현재 url 경로에 맞게 적절한 Route 컴포넌트를 페이지에 렌더링
import { useReducer, useRef } from 'react';
import Home from './pages/Home';
import Edit from './pages/Edit';
import New from './pages/New';
import Diary from './pages/Diary';
import './App.css';

function reducer(state, action){
  switch (action.type){
    case 'CREATE': {
      return [action.data, ...state];
    }
    case 'UPDATE': {
      return state.map((it) => String(it.id) === String(action.data.id) ? {...action.data} : it);
    }
    default: {
      return state;
    }
  };
};

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);
  // 함수 onCreate는 사용자가 선택한 날짜, 입력일기 데이터, 선택한 감정 세가지 데이터를 받아서 저장
  // 상단의 함수 dispatch를 호출하여 데이터는 객체로 저장할 때 타입은 'CREATE'로 한다.
  // 마지막으로 일기를 저장할 때마다 idRef.current += 1로 id값을 1씩 늘려서 id 데이터가 중복되지 않도록 함
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
      }
    })
  }

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/edit/:id' element={<Edit />}></Route>
        <Route path='/new' element={<New />}></Route>
        <Route path='/diary/:id' element={<Diary />}></Route>
      </Routes>
    </div>
  );
};

export default App;
