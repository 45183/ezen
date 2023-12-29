// 사용자가 입력하는 새로운 할일을 데이터를 저장할 state를 만들어요
// 사용자 데이터 입력 후 "추가" 버튼을 누르면 입력이 초기화 되는
// 기능도 만들도록 하겠습니다 (중복입력방지목적)
import { useContext, useRef, useState } from "react";
import {TodoDispatchContext} from "../App"
import "./TodoEditor.css";

const TodoEditor = () => {
  const { onCreate } = useContext(TodoDispatchContext);
  const [content, setContent] = useState("");
  const inputRef = useRef();
  const onChangeContent = (e) => {
    setContent(e.target.value);
  };
  const onSubmit = () => {
    // 현재 content가 빈 문자열이면 inputRef가 현재값으로
    // 저장한 요소에 포커스 기능을 수행하고 함수를 종료시킵니다
    if (!content) {
      inputRef.current.focus();
      return;
    }
    onCreate(content);
    // 데이터 입력 후 입력창 초기화 기능
    setContent("");
  };
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      onSubmit();
    }
  };
  return (
    <div className="TodoEditor">
      <h4>새로운 Todo 작성하기 🎃</h4>
      <div className="editor_wrapper">
        {/*엔터에 대한 이벤트 핸들러 onKeyDown을 만들었습니다 */}
        <input
          ref={inputRef}
          value={content}
          onChange={onChangeContent}
          onKeyDown={onKeyDown}
          placeholder="새로운 Todo..."
        />
        {/* 추가 버튼에 대한 이벤트 핸들러 onSubmit을 만들었습니다 */}
        <button onClick={onSubmit}>추가</button>
      </div>
    </div>
  );
};

export default TodoEditor;
