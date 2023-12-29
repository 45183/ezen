import emotion1 from './img/emotion1.png';
import emotion2 from './img/emotion2.png';
import emotion3 from './img/emotion3.png';
import emotion4 from './img/emotion4.png';
import emotion5 from './img/emotion5.png';

// 내가 선택한 경우(케이스)마다 이모션 이모티콘이
// 선택될 수 있게 컴포넌트를 만들어서 스위치 구문 코딩

export const getEmotionImgById = (emotionId) => {
    const targetEmotionId = String(emotionId);
    switch (targetEmotionId){
        case '1':
            return emotion1;
        case '2':
            return emotion2;
        case '3':
            return emotion3;
        case '4':
            return emotion4;
        case '5':
            return emotion5;
        default:
            return null;
    };
};