// useReducer - 컴포넌트에서 상태변화 코드를 분리하는 기능
// 본 컴포넌트 안의 상태변화 코드는 onIncrease & onDecrease
// 상태변화 코드는 useState를 통해서 만들면 반드시 해당 컴포넌트 안에서 작성
// 그래서 원래는 상태변화 코드는 분리되지 않음

// 그런데 한 컴포넌트 안에 상태변화 코드가 지나치게 많으면 유지보수가 어려움
// useReducer는 state관리를 컴포넌트 외부에서 할 수 있도록 만든다.



// useReducer는 함수 reducer를 이용해서 상태변화코드를 컴포넌트 외부로 분리

// useState -> useReducer
import { useReducer } from "react";
// import {useState} from 'react';


function reducer(state, action){
    switch (action.type){
        case 'INCREASE':
            return state + action.data;
        case 'DECREASE':
            return state - action.data;
        case 'INIT':
            return 0;
        default:
            return state;
    }
};

function TestComp(){
    // const [count, setCount] = useState(0);
    const [count, dispatch] = useReducer(reducer, 0);
    // const onIncrease = () => {
    //     setCount(count + 1);
    // };
    // const onDecrease = () => {
    //     setCount(count - 1);
    // };

    return (
        <div>
            <h4>테스트 컴포넌트</h4>
            <div>
                <b>{count}</b>
            </div>
            <div>
                {/* <button onClick={onIncrease}>+</button>
                <button onClick={onDecrease}>-</button> */}
                <button onClick={() => dispatch({type: 'INCREASE', data: 1})}>+</button>
                <button onClick={() => dispatch({type: 'DECREASE', data: 1})}>-</button>
                <button onClick={() => dispatch({type: 'INIT'})}>초기화</button>
            </div>
        </div>
    )
};

export default TestComp;