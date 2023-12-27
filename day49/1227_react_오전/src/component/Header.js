function Header() {
  return (
    <header>
      <h1>헤더에요, 헤더라고욧!!!</h1>
    </header>
  );
}
// 리액트에서 Header 컴포넌트를 다른 파일에 쓸 수 있게 내보냅니다.
// default 설정은 모듈의 기본값으로 보낸다는 의미이며
// 모듈의 기본값으로 내보내게 되면 원하는 이름으로도 불러올 수 있습니다.
export default Header;
