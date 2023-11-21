var list = [];

for (var i = 1; i <= 45; i++) {
  ???
}

var result = [];

for (var i = 0; i < 6; i++) {
  ???

  // 랜덤으로 선택한 인덱스의 값
  var num = ???;

  // 배열에서 인덱스의 값 제거
  list.splice(index, 1);

  result.push(num);
}


result.sort(function(a, b) {
  return a - b;
});


for (var i = 0; i < 6; i++) {
  ???('<span class="ball">' + result[i] + '</span>');
}


