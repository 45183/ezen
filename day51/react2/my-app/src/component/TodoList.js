import { useContext, useMemo, useState } from 'react';
import { TodoStateContext } from '../App';
import './TodoList.css';
import TodoItem from './TodoItem';

// props에서 전제조건이었던 자식 컴포넌트의 인수 입력은 
// context 기능의 사용으로 인해 더이상 필요하지 않음
// 리액트 훅스인 useContext와 리액트 객체에서 나오는 기능으로
// 데이터는 이제 useContext를 통해서만 받기 때문
const TodoList = () => {
    const todo = useContext(TodoStateContext);  // App.js에서 데이터로 받아서 여기서도 객체가 아님
    const analyzeTodo = useMemo(() => {
        console.log("analyzeTodo함수 호출")
        const totalCount = todo.length;
        const doneCount = todo.filter((it) => it.isDone).length;
        const notDoneCount = totalCount - doneCount;
        return {
            totalCount,
            doneCount,
            notDoneCount
        };
    }, [todo]);
    const {totalCount, doneCount, notDoneCount} = analyzeTodo;


    const [search, setSearch] = useState('');
    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    };

    const getSearchResult = () => {
        return search === "" ? todo : todo.filter((it) => it.content.toLowerCase().includes(search.toLowerCase()));
    };


    return <div className="TodoList">
        <h4>Todo List 🔍</h4>
        <input value={search} className="SearchBar" onChange={onChangeSearch} placeholder="검색어를 입력하세요" />
        <div className="list_wrapper">

            {getSearchResult().map((it) => (
                <TodoItem key={it.id} {...it} />
            ))}
        </div>
        <div>
            <div>총 개수 : {totalCount}</div>
            <div>완료된 일 : {doneCount}</div>
            <div>미완료 : {notDoneCount}</div>
        </div>
    </div>
}

TodoList.defaultProps = {
    todo: [],
};

export default TodoList;

