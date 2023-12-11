const r = Number(prompt('반지름을 입력하세요'));


function area(r){
    return Math.PI * r * r;
}

function circum(r){
    return 2 * Math.PI * r;
}
document.write("반지름 : " + r + "<br>" + "넓이 : " + area(r) + "<br>" +"둘레 : " + circum(r));