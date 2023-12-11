const items = document.querySelectorAll("li"); 
// 문서에서 li 태그를 선택하여 변수에 저장

items.forEach(function(item) {
  item.addEventListener("click", function () {
    // 항목 클릭했을 때 실행할 함수
    this.parentNode.removeChild(this); // 부모 노드에서 삭제
    // 아래 소스도 가능
    // this.remove(this);
  });
});

// 별해
document.querySelector("ul").addEventListener('click', whenClick);

function whenClick(event) {
  const tgt = event.target;
  // 밑의 코드 의미는 
  // 클릭된 요소가 li가 아닌 경우에 return문을 통해 함수를 종료한다.
  if (!tgt.matches("li")) return
  tgt.remove();
}
