

// window.onload = function () {
//   const bgCount = 5;

//   let randomNumber = Math.floor(Math.random() * bgCount) + 1;
//   document.body.style.backgroundImage = `url(images/bg-${randomNumber}.jpg)`;
// };

window.onload = function () {
  const pictures = ["bg-1.jpg", "bg-2.jpg", "bg-3.jpg", "bg-4.jpg", "bg-5.jpg", "event-bg.png"];
  const bgCount = pictures.length; //숫자 직접 입력하는거 최대한 지양

  let randomNumber = Math.floor(Math.random() * bgCount);
  document.body.style.backgroundImage = `url(images/${pictures[randomNumber]})`;
};
