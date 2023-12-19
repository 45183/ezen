// 프라미스의 단점을 다룬 예시 코드
// 미들웨어 기능을 구현하는 반복문을 코딩하다 보면 잘못 사용할 소지가 있다.
// 미들웨어 기능을 만들다 보면 프라미스의 장점은 사라지고 사실상 콜백함수 뭉치와 같이 에러에 취약해진다.

const axios = require('axios');
const url = "https://raw.githubusercontent.com/wapj/musthavenodejs/main/movieinfo.json";

axios.get(url).then((result) => {
    if(result.status != 200){
        throw new Error("요청에 실패");
    };

    if(result.data){
        return result.data;
    }
    throw Error("데이터가 없어요");
})
.then((data) => {
    if(!data.articleList || data.articleList.size == 0){
        throw new Error("데이터가 없어요");
    }
    return data.articleList;
})
.then((articles) => {
    return articles.map((article, idx) => {
        return {title: article.title, rank: idx + 1};
    });
})
.then((results) => {
    for(let movieinfo of results){
        console.log(`[${movieinfo.rank}위] ${movieinfo.title}`);
    };
})
.catch((err) => {
    console.log("에러발생");
    console.log(err);
});