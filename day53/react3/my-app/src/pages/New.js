import Editor from "../component/Editor";

const New = () => {
    return <div>
        <Editor initData={{
            date: new Date().getTime(), 
            emotionId: 1,
            content: '이전에 작성했던 샘플 일기'
        }} onSubmit={() => {
            alert('작성완료를 클릭하셨습니다.');
        }} />
    </div>
}
export default New;