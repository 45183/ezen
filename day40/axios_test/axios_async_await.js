// async await를 적용한 영화 ranking 예제 (axios.js 코드 수정)
// async 사용 시 함수 앞에 async를 붙임


const axios = require("axios");

async function getTop20Movies(){    // async와 await 사용하기 위해 함수화
    const url = "https://raw.githubusercontent.com/wapj/musthavenodejs/main/movieinfo.json";
    
    try{
        // 네트워크에서 데이터를 받아오므로 await로 기다림
        const result = await axios.get(url)     // get 요청
        const {data} = result;                  // 결과값에는 data 프로퍼티가 있음
        
        if(!data.articleList || data.articleList.size == 0){    // articleList가 없거나 articleList의 내용이 없다면
            throw new Error("데이터가 없습니다.");
        };

        const movieinfos = data.articleList.map((article, idx) => {   // 영화리스트 데이터를 제목과 순위로 분리
            return {title: article.title, rank: idx + 1};
        });

        for(let movieinfo of movieinfos){          // 받은 영화 리스트 정보 출력
            console.log(`[${movieinfo.rank}등] ${movieinfo.title}`);
        };
    } catch(err){
        console.log("<<에러 발생>>");
        throw new Error(err);
    };
};

getTop20Movies();




// callback, promise, async/await 비교

//               callback            promise             async/await
// 에러처리     콜백함수 안에서      catch() 메서드       try-catch 블록
// 가독성       점점 떨어짐          가독성 좋음          가독성 좋음
// 중첩처리     콜백함수 안에서      then() 메서드        await 사용
//                                                     async는 함수 앞에 붙임