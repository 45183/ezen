// App 컴포넌트에서 함수 handleSetCount를 받아서 벝튼의 이벤트 핸들러로 사용
const Controller = ({handleSetCount}) => {
    return (
        <div>
            <button onClick={() => handleSetCount(-1)}>-1</button>
            <button onClick={() => handleSetCount(-10)}>-10</button>
            <button onClick={() => handleSetCount(-100)}>-100</button>
            <button onClick={() => handleSetCount(100)}>100</button>
            <button onClick={() => handleSetCount(10)}>10</button>
            <button onClick={() => handleSetCount(1)}>1</button>
        </div>
    );
};

export default Controller;