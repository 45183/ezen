// 1부터 45까지 list 자료 안에다 값을 집어넣음
var list = [];

for (var i = 1; i <= 45; i++) {
  list.push(i);
}

// 1부터 45사이의 숫자 중 6개의 숫자를 뽑아서 저장 (그 숫자의 인덱스)
var result = [];

for (var i = 0; i < 6; i++) {
  var index = Math.floor(Math.random() * list.length);

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


