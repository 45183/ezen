    // const a = document.querySelector('#items');
// const b = a.getElementsByTagName('li')
// a.addEventListener('click', function(){
//     if(b.length > 0){
//         b[0].remove();
//     }
// });


// 배열 처리시 순서대로만 사라짐

document.querySelector("ul").addEventListener('click', whenClick);

// function to remove rows

function whenClick(event) {
  const tgt = event.target;
  if (!tgt.matches("li")) return
  tgt.remove();
}