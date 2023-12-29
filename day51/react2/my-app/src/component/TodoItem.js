import React, {useContext} from 'react';
import { TodoDispatchContext } from '../App';
import './TodoItem.css';

const options = { year: "numeric", month: "long", day: "numeric", weekday: "long" };
const TodoItem = ({id, content, isDone, createdDate}) => {
    const {onUpdate, onDelete} = useContext(TodoDispatchContext);
    console.log(`${id} Todoitem 업데이트`)
    const onChangeCheckbox = () => {
        onUpdate(id);
    };
    const onClickDelte = () => {
        onDelete(id);
    };
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
    );
};

export default React.memo(TodoItem);