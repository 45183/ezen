// 1. 유저이름, 전공의 인풋값이 양식의 버튼에 대응 되도록 변수를 선언해야 합니다.
// 2. 버튼 누르면 함수가 실행되게 설정합니다.
// 3. 입력된 데이터를 출력할 수 있게 테이블요소를 생성합니다.
// 4. 생성된 테이블 요소에 가지고 있던 인풋값을 추가 합니다. 

const username = document.getElementById("username");
const major = document.getElementById("major");
const bttn = document.querySelector("button");

// 버튼에 클릭 이벤트 리스너 추가
bttn.addEventListener("click", (e) => {
  e.preventDefault(); // 기본 동작 중단

  // 테이블의 tbody 요소를 선택
  let tbody = document.querySelector("#attendant > tbody");

  // 새로운 테이블 행 요소(<tr>) 생성
  let newTr = document.createElement("tr");

  // 첫 번째 셀에 입력한 이름을 넣기 위한 <td> 요소 생성
  let nameTd = document.createElement("td");
  nameTd.innerText = username.value; // 입력한 이름 설정
  username.value = ""; // 입력 필드 초기화

  // 두 번째 셀에 입력한 전공을 넣기 위한 <td> 요소 생성
  let majorTd = document.createElement("td");
  majorTd.innerText = major.value; // 입력한 전공 설정
  major.value = ""; // 입력 필드 초기화

  // 새로운 행에 이름과 전공 정보를 추가
  newTr.append(nameTd);
  newTr.append(majorTd);

  // 테이블의 tbody에 새로운 행을 추가
  tbody.append(newTr);
});

