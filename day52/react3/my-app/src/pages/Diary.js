// App.js에서 부여한 다이나믹 컨텐츠 라우팅 주소에 대한
// 컴포넌트를 부여하고자 함
import { useParams } from "react-router-dom";

const Diary = () => {
    const {id} = useParams();
    console.log(id);
    return (
    <div>
        <div>{id}번 일기</div>
        <div>Diary 페이지입니다.</div>
    </div>
    )
}
export default Diary;