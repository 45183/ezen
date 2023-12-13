// axios 라이브러리 사용하여 프라미스 API활용

const axios = require("axios");
const url =
  "https://raw.githubusercontent.com/wapj/musthavenodejs/main/movieinfo.json";

axios
  .get(url) // get요청
  .then((result) => {
    //정상적으로 작동하면 결과값을 처리해 주세요
    if (result.status != 200) {
      //상태가 200 (정상)이 아니면 에러출력
      throw new Error("요청에 실패했어요");
    }
    if (result.data) {
      // result.data 가 있으면 결과반환
      return result.data;
    }
    throw new Error("데이터가 없어요");
  })
  .then((data) => {
    if (!data.articleList || data.articleList.size ==0) {
        throw new Error("데이터가 없어요");
    }
    return data.articleList;
  })
  .then((articles) => {
    return articles.map((article, idx) => { //영화리스트 데이터를 제목과 순위로 분리
        return  {title: article.title, rank: idx +1};
    })
  })
.then((results) => {
    for (let movieInfo of results) { //받은 영화 리스트 정보 출력
        console.log(`[${movieInfo.rank}등] ${movieInfo.title}`);
    }
})
.catch((err) => {
    console.log("<<에러발생>>");
    console.error(err);
});