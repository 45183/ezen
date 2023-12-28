// 사용자가 입력하는 새로운 할일 데이터를 저장할 state 생성
// 사용자 데이터 입력 후 '추가' 버튼을 누르면 입력 초기화되는 기능 추가 (중복입력 방지)
import { useState, useRef } from 'react';
import './TodoEditor.css';

const TodoEditor = ({onCreate}) => {
    const [content, setContent] = useState('');
    const inputRef = useRef();
    const onChangeContent = (e) => {
        setContent(e.target.value);
    };

    const onSubmit = () => {
        // 현재 content가 빈 문자열이면 inputRef가 현재값으로 
        // 저장한 요소에 포커스 기능을 수행하고 함수 종료
        if(!content){
            inputRef.current.focus();
            return;
        };
        onCreate(content);
        // 데이터 입력 후 입력창 초기화
        setContent('');
    };
    // 엔터(keycode = 13) 입력시 onSubmit 동작
    const onKeyDown = (e) => {
        if(e.keyCode === 13){
            onSubmit();
        };
    };
    return <div className="TodoEditor">
        <h4>새로운 Todo 작성하기 📝</h4>
        <div className="editor_wrapper">
            {/* 엔터에 대한 이벤트 핸들러 onKeyDown 생성 */}
            <input ref={inputRef} value={content} onChange={onChangeContent} onKeyDown={onKeyDown} placeholder="새로운 Todo..." />
            {/* 추가 버튼에 대한 이벤트 핸들러 onSubmit 생성 */}
            <button onClick={onSubmit}>추가</button>
        </div>
        </div>
};

export default TodoEditor;