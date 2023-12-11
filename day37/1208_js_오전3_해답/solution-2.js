const raffle = document.querySelector("#raffle");

raffle.addEventListener("click", (e) => {
  e.preventDefault();  
  const seed = document.querySelector("#seed"); // 전체 몇명
  const total = document.querySelector("#total"); // 이만큼 뽑아요
  const result = document.querySelector("#result");
  let winner = [];

  while (winner.length < total.value) {
    // 전체 인원 중 한명 무작위 선발
    let picked = Math.floor((Math.random() * seed.value) + 1);
    
    if (!winner.includes(picked)) {
      winner.push(picked);
    }
  }

  if (seed.value > total.value) {
    result.innerText = "당첨자 수는 총 인원보다 적어야 합니다.";
  } else {
    result.innerText = `당첨자 : ${winner.join(', ')}번`;
  }
  
  result.classList.add("show");
});
