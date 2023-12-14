/*
화면단 = 프론트엔드 해야할 일 

1. 사용자 정보를 서버에서 가져와
2. 화면에 데이터 표시 후 이벤트 연결하기
3. 서버에서 사용자 입력 데이터 전송 및 불러들이기
4. 데이터 수정/삭제 요청
5. 생성한 데이터 화면에 표시 

-> 서버와 연동해 화면 뿌려주기

*/

// 서버에서 user 데이터 가져와 수정/삭제 구현
async function getUser() {
  try {
    //사용자 정보를 서버에서 가져오기
    const res = await axios.get("/users");
    const users = res.data; // 사용자 데이터 저장
    const list = document.getElementById("list");
    // 리스트 초기화
    list.innerHTML = "";

    /*
    - Object.keys(객체)
    주어진 객체(users)의 열거 가능한 속성 이름들을 배열로 반환하는 JavaScript 메서드


    */

    //가져온 users에 map을 사용해 key값 가져와 서버 요청에 사용하기 
    Object.keys(users).map(function (key) {
      const userDiv = document.createElement("div");
      const span = document.createElement("span");
      span.textContent = users[key]; // span에 사용자 이름 설정
      console.log(key) // id값
      console.log(typeof key) //string

      // 수정 버튼
      const edit = document.createElement("button");
      edit.textContent = "수정";

      edit.addEventListener("click", async () => {
        //click하기 전까지 실행 안됨

        const name = prompt("바꿀 이름 입력하세요 ");

        if (!name) {
          return alert("이름을 입력하세요");
        }

        try {
          // 두번째 인자로는 서버에 전송할 데이터를 전송한다
          await axios.put("/user/" + key, { name }); // 서버로 [name]= 이름을 전송해 사용자 정보 업데이트 하기
          // 정보 수정 후 수정된 사용자 정보를 가져오기
          getUser();
        } catch (err) {
          console.error(err);
        }
      });

      // 삭제 버튼
      const remove = document.createElement("button");
      remove.textContent = "삭제";

      remove.addEventListener("click", async () => {
        try {
          await axios.delete("/user/" + key); // 삭제 요청
          getUser();
        } catch (err) {
          console.error(err);
        }
      });

      // 가져온 data로 화면 뿌려주기
      userDiv.appendChild(span);
      userDiv.appendChild(edit);
      userDiv.appendChild(remove);
      list.appendChild(userDiv);

      console.log(res.data);
    });
  } catch (err) {
    console.error(err);
  }
}

window.onload = getUser();

// 등록 이벤트 누르면 인풋값 서버로 보내기
document.getElementById("form").addEventListener("submit", async (e) => {
  // 새로고침 방지
  e.preventDefault();

  const name = e.target.username.value; // <input type="text" id="username" /> 값 가져오기 

  //name 값 없는데 등록 눌러진거면 에러처리하기
  if (!name) {
    return alert("이름을 입력하시오");
  }

  //input값 가져와 서버로 보내기
  try {
    await axios.post("/user", { name });
    getUser();
  } catch (err) {
    console.error(err);
  }
  // 입력 인풋 초기화
  e.target.username.value = "";
});

let test = { 'name' : 'kim'}
console.log(test)