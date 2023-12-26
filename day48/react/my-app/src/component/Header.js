function Header(){
    return (
        <header>
            <h1>헤더</h1>
        </header>
    );
}

// 리액트에서 Header 컴포넌트를 다른 파일에 쓸 수 있게 내보냄
// default 설정은 모듈의 기본값으로 보낸다는 의미
// 모듈의 기본값으로 내보내게되면 원하는 이름으로도 불러올 수 있음

export default Header;