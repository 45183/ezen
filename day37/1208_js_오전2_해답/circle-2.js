function area(r) {
  return Math.PI * r * r;   
}
function circum(r) {
  return 2 * Math.PI * r;
}

const result = document.querySelector("#result");  // 결괏값을 표시할 부분
const radius = prompt("반지름의 크기는? ");

// 반올림해서 표시
result.innerText = `
    반지름 : ${radius},
    원의 넓이 : ${Math.round(area(radius))},
    원의 둘레 : ${Math.round(circum(radius))}
  `;