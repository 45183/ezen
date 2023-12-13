// 영화 API를 호출하여
// 상위 20위 영화 호출하는 코드 작성
// https://raw.githubusercontent.com/wapj/musthavenodejs/main/movieinfo.json 이용

// axios 라이브러리 사용하여 프라미스 API 활용

const axios = require("axios");
const url = "https://raw.githubusercontent.com/wapj/musthavenodejs/main/movieinfo.json";

axios
    .get(url) // get 요청
    .then((result) => { // 정상적으로 작동하면 결과값을 처리
        if(result.status != 200){  // 상태가 정상(status = 200)이 아닌 경우
            throw new Error("요청에 실패했습니다.");
        };
        if(result.data){    // result.data가 존재하면
            // 결과 반환
            return result.data;
        };
        throw new Error("데이터가 없습니다.");
    })      // promise 사용시 ; 사용 주의
    .then((data) => {
        if(!data.articleList || data.articleList.size == 0){    // articleList가 없거나 articleList의 내용이 없다면
            throw new Error("데이터가 없습니다.");
        }
        return data.articleList;
    })
    .then((articles) => {
        return articles.map((article, idx) => { // 영화 리스트 데이터를 제목과 순위로 분리
            return {title: article.title, rank: idx + 1};
        });
    })
    .then((results) => {
        for( let movieinfo of results){ // 받은 영화 리스트 정보 출력
            console.log(`[${movieinfo.rank}등] ${movieinfo.title}`);
        }
    })
    .catch((err) => {
        console.log("<<에러 발생>>");
        console.error(err);
    });




// npm install axios

// const axios = require('axios');

// function getData(callbackFunc) {
//     axios.get('https://jsonplaceholder.typicode.com/posts/1')
//         .then(function (response) {
//             callbackFunc(response.data);
//         })
//         .catch(function (error) {
//             console.error(error);
//         });
// }

// getData(function (tableData) {
//     console.log(tableData);
// });


// // Promise 생성: axios.get 함수는 HTTP GET 요청을 보내고, 이 요청의 완료를 나타내는 Promise 객체를 반환한다.
// // then 메서드: Promise 객체의 then 메서드는 HTTP 요청이 성공적으로 완료되었을 때 실행될 콜백 함수를 등록한다. 이 콜백 함수는 서버로부터의 응답 데이터(response.data)를 받아 처리한다.
// // catch 메서드: catch 메서드는 요청 중에 오류가 발생했을 때 실행될 콜백 함수를 등록한다. 이는 네트워크 오류나 서버 에러 등 다양한 이유로 요청이 실패했을 때 오류 처리를 위해 사용된다.
// // 콜백 함수 사용: getData 함수는 외부에서 제공된 콜백 함수(callbackFunc)를 사용하여, HTTP 요청의 결과를 처리한다. 이는 Promise 패턴과 결합하여 비동기 작업이 완료된 후 필요한 추가 작업을 할 수 있게 해준다.