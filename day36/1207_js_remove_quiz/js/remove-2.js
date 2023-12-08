    // const a = document.querySelector('#items');
    // const b = a.getElementsByTagName('li')
    // a.addEventListener('click', function(){
    //     if(b.length > 0){
    //         b[0].remove();
    //     }
    // });


    // 배열 처리시 순서대로만 사라짐


document.querySelector("ul").addEventListener('click', whenClick);

function whenClick(event) {
  const tgt = event.target;
  if (!tgt.matches("li")) return    // 클릭된 요소가 li가 아닌 경우 return
  tgt.remove();
}



// const items = document.querySelectorAll('li');
// // 문서에서 li 태그를 선택하여 변수에 저장

// items.forEach(function(item){
//     item.addEventListener("click", function(){
//         this.parentNode.removeChild(this);  // 부모 노드에서 삭제
//         // 이걸로 바꿔도 가능 this.remove(this);
//     });
// });