// Header 컴포넌트를 App의 자식으로 배치해야하므로
// 현재 날짜와 시간을 저장하는 Date객체를 만들고, 
// toDateString 메서드(함수)를 이용해서 날짜를 문자열로 표시
// 헤더 컴포넌트가 실제로 불필요한 리-렌더링 현상이 벌어지는지 봅시다
// 입력데이터와 하등 관계없는 헤더컴포넌트는 
// 데이터 입력 마다 리-렌더링 되는 비효율적인 문제가 있음을 확인

import React from 'react';
import "./Header.css"
const Header = () => {
    console.log("header 업데이트");
    return <div className='Header'>
        <h3>오늘은 📆</h3>
        <h1>{new Date().toDateString()}</h1>
    </div>
}

export default React.memo(Header);
