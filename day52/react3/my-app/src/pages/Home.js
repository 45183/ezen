import Button from "../component/Button";
import Header from "../component/Header";
import Editor from "../component/Editor"; 

const Home = () => {
    return (
        <div>
            <Header title={'Home'} 
            leftChild={
                <Button type='positive' text={'긍정버튼'} onClick={() => {alert('positive button')}}/>
            } 
            rightChild={
                <Button type='negative' text={'부정버튼'} onClick={() => {alert('negative button')}}/>
            }/>
            <Editor initData={{
                date: new Date().getTime(), 
                emotionId: 1,
                content: '이전에 작성했던 샘플 일기'
            }} onSubmit={() => {
                alert('작성완료를 클릭하셨습니다.');
            }} />
        </div>
    )
};

export default Home;