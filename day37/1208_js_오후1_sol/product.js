// 콜백함수: 다른 함수의 인수로 전달되어 그 함수내에서 호출하는 함수

const register = document.querySelector("#register");

function Product(product, price, quantity) {
  this.product = product;
  this.price = price;
  this.quantity = quantity;
};

// 제품 정보를 화면에 표시하는 함수를 정의했습니다.
function displayProduct(product) {
  const productList = document.querySelector("#productList");
  const productItem = document.createElement("li");
  productItem.innerText = `${product.product} / ${product.price} / ${product.quantity}`;
  productList.appendChild(productItem);
}

// "register" 버튼에 클릭 이벤트 리스너를 추가합니다.
register.addEventListener("click", (e) => {
  e.preventDefault();
  const product = document.querySelector("#product");
  const price = document.querySelector("#price");
  const quantity = document.querySelector("#quantity");

  const newProduct = new Product(product.value, price.value, quantity.value);

  product.value = "";
  price.value = "";
  quantity.value = "";

  // console.log(newProduct);
  displayProduct(newProduct);
})



// // HTML에서 id가 "register"인 요소를 선택합니다.
// const register = document.querySelector("#register");

// // 제품 정보를 화면에 표시하는 함수를 정의했습니다.
// function displayProduct(product, price, quantity) {
//   // id가 "productList"인 요소를 선택합니다.
//   const productList = document.querySelector("#productList");
//   // 새로운 리스트 아이템을 생성합니다.
//   const productItem = document.createElement("li");
//   // 리스트 아이템에 제품 정보를 설정합니다.
//   productItem.innerText = `${product} / ${price} / ${quantity}`;
//   // 제품 리스트에 리스트 아이템을 추가합니다.
//   productList.appendChild(productItem);
// }


// // "register" 버튼에 클릭 이벤트 리스너를 추가합니다.
// register.addEventListener("click", (e) => {
//   // 기본 이벤트 동작을 중단시킵니다 (페이지 새로고침 방지).
//   e.preventDefault();

//   // 각각의 입력 필드에서 사용자가 입력한 값을 가져옵니다.
//   const product = document.querySelector("#product").value;
//   const price = document.querySelector("#price").value;
//   const quantity = document.querySelector("#quantity").value;

//   // 입력된 제품 정보를 화면에 표시하는 함수를 실행합니다.
//   displayProduct(product, price, quantity);

//   // 필요한 경우 입력 필드를 초기화합니다.
//   document.querySelector("#product").value = "";
//   document.querySelector("#price").value = "";
//   document.querySelector("#quantity").value = "";
// });
