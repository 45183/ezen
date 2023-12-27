// props로 넘긴 데이터를 자식 컴포넌트에서 받아서 출력할 수 있도록
// props의 값을 {count}인수로 받음

const Viewer = ({count}) => {
    return (
        <div>
            <div>현재 카운트</div>
            <h1>{count}</h1>
        </div>
    );
};

export default Viewer;