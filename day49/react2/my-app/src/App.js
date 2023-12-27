// CRUD 기능의 대표적인 구현 방법은 React Hooks 중에 useSate
import './App.css';
import Header from './component/Header';
import TodoEditor from './component/TodoEditor';
import TodoList from './component/TodoList';
import {useState} from 'react';

// 가짜 json형식의 데이터 객체를 형성하여 CRUD로직을 만들고 
// 실제 데이터로 갈아끼우는 형태로 개발 
const mockTodo = [
  {
    id: 0,
    inDone: false,
    content: 'react 테스트1',
    createdDate: new Date().getTime()
  },
  {
    id: 1,
    inDone: false,
    content: 'react 테스트2',
    createdDate: new Date().getTime()
  },
  {
    id: 2,
    inDone: false,
    content: 'react 테스트3',
    createdDate: new Date().getTime()
  }
]

function App() {
  const [todo, setTodo] = useState(mockTodo);
  return (
    <div className="App">
      <Header />
      <TodoEditor />
      <TodoList />
    </div>
  );
}

export default App;
