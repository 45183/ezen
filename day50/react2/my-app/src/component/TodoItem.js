import React from 'react';
import './TodoItem.css';

const options = { year: "numeric", month: "long", day: "numeric", weekday: "long" };
// props의 구조분해 할당
const TodoItem = ({id, content, isDone, createdDate, onUpdate, onDelete}) => {
    console.log(`${id} Todoitem 업데이트`)
    const onChangeCheckbox = () => {
        onUpdate(id);
    };
    const onClickDelte = () => {
        onDelete(id)
    }
    return (
        <div className="TodoItem">
            <div className="checkbox_col">
                <input onChange={onChangeCheckbox} checked={isDone} type="checkbox" />
            </div>
            <div className="title_col">
                {content}
            </div>
            <div className="date_col">
                {new Date(createdDate).toLocaleDateString("ko-KR", options)}
            </div>
            <div className="btn_col">
                <button onClick={onClickDelte}>삭제</button>
            </div>
        </div>
    )
};

export default React.memo(TodoItem);