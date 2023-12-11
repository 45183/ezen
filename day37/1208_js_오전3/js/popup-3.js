const btn = document.querySelector('button');

btn.addEventListener('click', () => {
    window.open('./notice.html', 'popup', "fullscreen=no, width=576px, height=425px")
})


const close = document.querySelector('.btn_close');

close.addEventListener('click', () => {
    window.close();
})