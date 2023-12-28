// 검색기능도 입력하는 검색어를 처리할 state 변수를 만들어야함
// 이슈사항 : todo에 저장한 아이템 개수에 비례해서 수행할 연산량이 증가
// 데이터를 많이 저장하면 지금의 코드 구조로는 todo에 계산할 계산량이 비대해짐
// 추가로 생길때마다 analyzeTodo가 호출되니까 불필요한 analyzeTodo의 호출은 피해야함

// 검색창에 react입력시 함수호출이 6번(처음 렌더링 + 글자하나마다) -> 문제
// 이를 해결하는 방법 -> useMemo의 사용
// 함수의 연산결과를 기억하는 행위를 memoization이라 함

// useMemo 사용법
// const value = useMemo(callback, deps);
// callback -> 콜백함수 / deps -> 의존성 배열

// React.memo - 메모이제이션의 사용
// React.memo를 통해서 어떻게 코딩이 최적화 되는지
// useMemo는 함수의 결과만을 메모한다면
// React.memo는 불필요한 화면의 리렌더링(화면 업데이트 재표시)를 막음

// React.memo가 잘 작동하지 않는 경우
// 함수 funcA, funcB가 동일한 기능을 수행한다고 가정
// 두 함수의 참조하는 값이 달라서 비교식에서 두 함수가 다른 함수라고 판단해버림
// 컴포넌트를 리렌더해도 함수를 다시 생성하지 않도록 만드는 것이 useCallback


// 고차 컴포넌트와 횡단관심사
// 고차 컴포넌트 - 인수로 전달된 컴포넌트를 새로운 컴포넌트로 반환하는 기술
// 횡단관심사(cross-cutting concerns) - 여러 서비스에 걸쳐서 동작해야 하는 코드
// 주로 로그인, 데이터베이스 접속, 유저 인가 과정같은 각 서비스의 단계에 해당하는 내용 -> 중복코드를 만드는 주된 원인

// 컴포넌트 간에 중복되는 코드를 줄이고 유지보수성을 향상

import { useMemo, useState } from 'react';
import './TodoList.css';
import TodoItem from './TodoItem';

const TodoList = ({todo, onUpdate, onDelete}) => {
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
    // search에 내용 없으면 todo 전체 출력, search에 입력값이 있으면 해당 내용있는것만 필터해서 출력
    // 검색어가 대소문자를 구분하면 검색기능이 약해지므로 검색어 자체를 전부 소문자 처리하고 비교할 단어도 소문자 처리해서
    // 영어 대소문자 구분으로 검색어가 매치되지 못하는 현상을 방지
    const getSearchResult = () => {
        return search === "" ? todo : todo.filter((it) => it.content.toLowerCase().includes(search.toLowerCase()));
    };


    return <div className="TodoList">
        <h4>Todo List 🔍</h4>
        <input value={search} className="SearchBar" onChange={onChangeSearch} placeholder="검색어를 입력하세요" />
        <div className="list_wrapper">
            {/* map 메서드의 콜백함수가 html이 아닌 준비된 TodoItem 컴포넌트를 
            화면에 렌더링하도록 코드 수정
            todo에는 할일 아이템이 객체데이터로 저장되어 있으므로
            스프레드 연산자 기능을 활용하여 개별 데이터로 분리하여 props로 전달 후, 
            화면에 렌더링 */}
            {getSearchResult().map((it) => (
                // 리스트 각 컴포넌트에 key로 할일 아이템의 id를 전달
                <TodoItem key={it.id} {...it} onUpdate={onUpdate} onDelete={onDelete}/>
            ))}
        </div>
        <div>
            <div>총 개수 : {totalCount}</div>
            <div>완료된 일 : {doneCount}</div>
            <div>미완료 : {notDoneCount}</div>
        </div>
    </div>
}

export default TodoList;