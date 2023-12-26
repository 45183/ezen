import './Body.css';

// props를 쓰기 위해 해당 함수는 데이터를 인수로 받음
function Body3(props){

    // 구조분해 할당으로 여러개의 값을 쓰는 경우
    // 코드가 간결해지는 장점
    const {name, location, favorList} = props;
    return (
        <div className='body'>
            {/* 객체에 props로 받은 값을 출력 */}
            {/* {props.name}은 {props.location}에 거주합니다. */}
            {name}은 {location}에 거주
            <br />
            {favorList.length}개의 음식을 좋아함
            
        </div>
    );
};

// 받을 데이터의 디폴트값 설정 가능
Body3.defaultProps = {
    favorList: ["마라탕"],
}

export default Body3;