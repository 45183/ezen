// 검색기능도 입력하는 검색어를 처리할 state변수를 만듭니다
// 이슈사항: todo에 저장한 아이템 개수에 비례해서 
// 수행할 연산량이 증가
// 데이터를 많이 저장하면 지금의 코드 구조로는 todo에
// 계산할 계산량이 비대해진다
// 뭐가 생길 때마다 analyzeTodo가 호출되니까 
// 불필요한 analyzeTodo의 호출을 피해야한다
// 문제가 발견되었는데 검색창에 내가 react입력하니 함수호출이 6번
// 이 문제를 해결하는 방법이 useMemo의 사용
// 함수의 연산결과를 기억하는 행위를 memoization이라 합니다.
// useMemo 사용법: 
// const value = useMemo(callback, deps);
// callback: 콜백함수 & deps: 의존성 배열
// React.memo: 메모이제이션의 사용
// React.memo를 통해서 어떻게 코딩이 최적화 되니?
// useMemo는 함수의 결과만을 '메모' 한다면
// React.memo는 불필요한 화면의 리렌더링(화면 업데이트 재표시)를 막아요




import {useContext, useMemo, useState} from "react";
import {TodoStateContext} from "../App"
import TodoItem from "./TodoItem";
import "./TodoList.css";

// props에서 전제조건이었던 자식 컴포넌트의 인수 입력은
// context기능의 사용으로 인해 더이상 필요하지 않습니다
// 리액트 훅스인 useContext 와 리액트 객체에서 나오는 기능으로
// 데이터는 이제 useContext를 통해서만 받기 때문입니다
const TodoList = () => {
    const todo = useContext(TodoStateContext);
    const analyzeTodo = useMemo(() => {
        console.log("analyzeTodo 함수 호출");
        const totalCount = todo.length;
        const doneCount = todo.filter((it) => it.isDone).length;
        const notDoneCount = totalCount - doneCount;
        return {
            totalCount,
            doneCount,
            notDoneCount,
        };
    }, [todo]);
    const [search, setSearch] = useState("");
    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    }
    const getSearchResult = () => {
        // 검색어가 대소문자를 구분하면 검색기능이 약해지니까
        // 검색어 자체를 전부 소문자 처리하고 비교할 단어도 소문자 처리해서
        // 영어 대소문자 구분으로 검색어가 매치되지 못하는 현상을 방지
        return search === "" ? todo 
        : todo.filter((it) => 
        it.content.toLowerCase().includes(search.toLowerCase()));
    }

    const {totalCount, doneCount, notDoneCount} = analyzeTodo;

    return <div className="TodoList">
        <h4>Todo List 👑</h4>
        <input value = {search} onChange={onChangeSearch} 
        className="SearchBar" placeholder="검색어를 입력하세요" />
        <div className="list_wrapper">
            {/* map메서드의 콜백함수가 html이 아닌 
            준비된 TodoItem 컴포넌트를 화면에 렌더링(출력)
            하도록 코드를 수정하였습니다
            todo에는 할일 아이템이 객체데이터로 저장되어 있으므로
            스프레드 연산자 기능을 활용하여 개별 데이터로 
            분리하여 props로 전달 후, 화면에 렌더링 하도록 하였습니다 */}
            {getSearchResult().map((it) => (
                // 리스트 각 컴포넌트에 key로 할일 아이템의 id를 전달
                <TodoItem key={it.id} {...it} />
            ))}
        </div>
        <div>
            <div>총 개수: {totalCount}</div>
            <div>완료된 일: {doneCount}</div>
            <div>미완료: {notDoneCount}</div>
        </div>
        </div>
} 

TodoList.defaultProps = {
    todo: [],
};

export default TodoList;