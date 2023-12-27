import './TodoItem.css';

const options = { year: "numeric", month: "long", day: "numeric", weekday: "long" };

const TodoItem = () => {
    return (
        <div className="TodoItem">
            <div className="checkbox_col">
                <input type="checkbox" />
            </div>
            <div className="title_col">
                할 일
            </div>
            <div className="date_col">
                {new Date().toLocaleDateString("ko-KR", options)}
            </div>
            <div className="btn_col">
                <button>삭제</button>
            </div>
        </div>
    )
};

export default TodoItem;