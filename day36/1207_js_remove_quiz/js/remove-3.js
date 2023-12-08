 document.querySelector("#products").addEventListener('click', whenClick);

function whenClick(event) {
    const tgt = event.target.closest('p');
    if (tgt) tgt.remove();
}


const buttons = document.querySelectorAll("p>span");

for(let button of buttons){
    button.addEventListener("click", function(){
        // 항목 클릭했을때 실행할 함수
        // 부모 노드에서 삭제
        this.parentNode.remove();
    });
}