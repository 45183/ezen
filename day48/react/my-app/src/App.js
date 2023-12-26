// import logo from './logo.svg';
import './App.css';
import Header from './component/Header';
import Body from './component/Body';
import Body2 from './component/Body2';
import Footer from './component/Footer';
import Body3 from './component/Body3';
import Body4 from './component/Body4';

// 리액트에서 정말 함수형 컨텐츠를 만들어서 사용 가능한가?
// 대소문자를 구분해야하는 정도가 아니고 컴포넌트의 이름은 반드시 대문자로 시작해야한다.
// function Header(){
//   return (
//     <header>
//       <h1>헤더</h1>
//     </header>
//   );
// }

// props로 컴포넌트 전달하기
function ChildComp(){
  return <div>넘겨줄 자식 컴포넌트</div>;
}


function App() {
  // 스프레드 연산자로 여러개의 값을 동시에 전달
  // 1. Body3 컴포넌트에서 전달할 값을 객체 BodyProps로 만듭니다.
  const BodyProps = {
    name: "hyun",
    location: "Incheon",
    favorList: ["파스타", "빵", "떡볶이"],
  }
  const name = "hyun"
  return (
    <div className="App">
      <Header />
      <Body />
      <Body2 />
      
      {/* props를 전달하려는 자식 컴포넌트 태그에서 이름={값} 형식으로 작성 */}
      <Body3 name={name} location={'인천'} />
      {/* 2. 스프레드 연산자로 개별 프로퍼티를 Props값으로 전달 */}
      <Body3 {...BodyProps}/>
      <Footer />
      <Body4>
        <ChildComp />
      </Body4>
    </div>
  );
};




export default App;
