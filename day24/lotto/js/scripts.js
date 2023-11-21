var list = [];

for (var i = 1; i <= 45; i++) {
  list.push(i);
}
console.log(list)       // 1 ~ 45까지 list 자료 안에다 값을 추가

var result = [];

// 1 ~ 45까지 숫자 중 6개의 숫자를 뽑아서 저장 (index)
for (var i = 0; i < 6; i++) { 
  var index = Math.floor(Math.random(list) * list.length);    
  // list.length 대신 45를 사용하면 나중에 뽑은 숫자가 아닌 다른 숫자가 제거되는 경우 발생

  // 랜덤으로 선택한 인덱스의 값
  var num = list[index];

  // 배열에서 인덱스의 값 제거
  list.splice(index, 1);

  result.push(num);
}


result.sort(function(a, b) {
  return a - b;
});


for (var i = 0; i < 6; i++) {
  document.write('<span class="ball">' + result[i] + '</span>');
}
