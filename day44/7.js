// async await를 사용해서 미들웨어 파트의 에러를 다루는 방식의 변화를 알아보자
// async await는 가장 최근 도입된 비동기 처리방식
// async는 asynchronous(비동기)라는 뜻
// 내가 비동기 처리하고 싶은 함수 맨 앞에 async를 붙이고 응답을 기다려야할 필수적인 기능에 await(기다리다)를 붙이는 방식
// try, catch 두개의 구문으로 그 함수의 전체적인 성공과 실패시 진행할 내용을 담음
// 나중에 코드 구조 안에 try함수 안에 try, catch를 중첩구조로도 가능

const axios = require('axios');

async function getTop20Movies(){
    const url = "https://raw.githubusercontent.com/wapj/musthavenodejs/main/movieinfo.json";
    try{
        const result = await axios.get(url);
        const {data} = result;
        if(!data.articleList || data.articleList.size == 0){
            throw new Error("데이터가 없습니다.")
        }
        
        const movieinfos = data.articleList.map((article, idx) => {
            return {title: article.title, rank: idx + 1};
        });

        for(let movieinfo of movieinfos){
            console.log(`[${movieinfo.rank}위] ${movieinfo.title}`);
        }
    } catch(err){
        throw new Error(err);
    }
}

getTop20Movies();