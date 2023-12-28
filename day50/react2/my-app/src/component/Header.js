// Header 컴포넌트를 App의 자식으로 배치해야하므로
// 현재 날짜와 시간을 저장하는 Date 객체를 만들고
// toDateString 메서드(함수)를 이용해서 날짜를 문자열로 표시


// 헤더 컴포넌트가 실제로 불필요한 리렌더링 현상이 일어나는지 체크 -> console.log('Header 업데이트')
// 데이터 입력마다 리렌더링되는 비효율적인 문제가 있음
// React.memo(Header) 사용후 데이터 입력마다 리렌더링되지 않음

import React from 'react';
import './Header.css'

const options = { year: "numeric", month: "long", day: "numeric", weekday: "long" };
const Header = () => {
    console.log('Header 업데이트')
    return (
        <div className='Header'>
            <h3>오늘은 📆</h3>
            <h1>{new Date().toLocaleDateString("ko-KR", options)}</h1>
        </div>
    );
};

// export default Header;
export default React.memo(Header);