import './App.css';
import Header from "./component/Header";
import Body from "./component/Body";
import Footer from "./component/Footer";
// 리액트에서 정말 함수형 컨텐츠를 만들어서 사용 가능한가?
// 대소문자를 구분해야하는 정도가 아니고 
// 컴포넌트의 이름은 반드시 대문자로 시작해야 한다

// props는 데이터 뿐 아니라 html컨텐츠가 담긴 컴포넌트를 통채로 전달 가능하다

// // props로 컴포넌트 전달하기 (함수를 통채로 전달)
// function ChildComp() {
//   return <div>넘겨줄 자식 컴포넌트</div>;
// }

function App() {
  // 스프레드 연산자로 여러개의 값을 동시에 전달하기
const BodyProps = {
  name: "이기현",
  location: "인천시",
}
  return (
    <div className="App">
        <Header />
        {/* 스프레드 연산자로 개별데이터 표시 */}
        <Body />

        <Footer />
    </div>
  );
}



export default App;
