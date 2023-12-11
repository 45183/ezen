const product = document.querySelector('#product');
const price = document.querySelector('#price');
const quantity = document.querySelector('#quantity');
const register = document.querySelector('#register');

register.addEventListener('click', (e) => {
    e.preventDefault(); // 기본 이벤트 동작 중단(페이지 새로고침 방지)
    
    const list = document.querySelector('#productList')
    const li = document.createElement('li');
    li.innerHTML = `${product.value} / ${price.value} / ${quantity.value}`;
    list.append(li)
    product.value="";
    price.value="";
    quantity.value="";
})