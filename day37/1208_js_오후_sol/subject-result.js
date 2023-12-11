// // 원래 해답

// const member1 = ["HTML", "CSS"]; // member1 배열에 HTML과 CSS 과목을 담습니다.
// const member2 = ["CSS", "자바스크립트", "리액트"]; // member2 배열에 CSS, 자바스크립트, 리액트 과목을 담습니다.
// const member3 = ["자바스크립트", "타입스크립트"]; // member3 배열에 자바스크립트와 타입스크립트 과목을 담습니다.

// const subjects = [...member1, ...member2, ...member3];
// // 위의 세 배열(member1, member2, member3)을 하나의 배열인 subjects로 합칩니다.
// // 결과적으로 subjects 배열에는 모든 과목이 포함됩니다.
// // alert(subjects); // 이거 출력해보면 단일 배열에 모든 원소가 펼쳐진 상태임을 알 수 있습니다.

// const resultList = new Set();
// subjects.forEach(subject => {
//   resultList.add(subject);
// });
// // subjects 배열의 중복된 항목을 제거하고 고유한 항목만 남기기 위해 Set을 사용합니다.
// // forEach를 사용하여 모든 과목을 resultList Set에 추가합니다.

// const result = document.querySelector("#result");
// result.innerHTML = `
//   <ul>
//   ${[...resultList].map(subject => `<li>${subject}</li>`).join("")}
//   </ul>
// `;
// // resultList Set의 고유한 항목들을 <li> 태그로 감싸서 리스트로 만듭니다.
// // 결과를 HTML 요소에 추가하여 화면에 표시합니다.


// 핵심은 중복된 원소를 데이터셋에서 제거하여 출력!!!
// 응용문제 느낌: 직접적으로 중복된 원소이야기는 안했지만
// 중복된 원소를 처리해야 한다는 문제의 의도를 캐치해야 함.
const member1 = ["HTML", "CSS"];
const member2 = ["CSS", "자바스크립트", "리액트"];
const member3 = ["자바스크립트", "타입스크립트"];

const subjects = [...member1, ...member2, ...member3];
// ...의 역할은 데이터 셋에서 데이터 원소를 뜯어내는 것
// subjects66 = [["HTML", "CSS"], 
// ["CSS", "자바스크립트", "리액트"], ["자바스크립트", "타입스크립트"]]
// subjects = ["HTML", "CSS", "CSS", 
// "자바스크립트", "리액트", "자바스크립트", "타입스크립트"]

// 집합 자료구조는 중복된 원소가 허용되지 않는다.
const uniqueSubjects = [...new Set(subjects)];
// uniqueSubjects = ["HTML", "CSS", "자바스크립트", "리액트", "타입스크립트"]
const result = document.querySelector("#result");
result.innerHTML = `
  <ul>
    ${uniqueSubjects.map(subject => `<li>${subject}</li>`).join("")}
  </ul>
`;