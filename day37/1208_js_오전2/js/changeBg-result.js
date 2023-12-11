window.onload = function(){
    const pictures = ["bg-1.jpg","bg-2.jpg","bg-3.jpg","bg-4.jpg","bg-5.jpg","event-bg.png"]
    const bgCount = pictures.length;

    let randomNumber = Math.floor(Math.random() * bgCount);
    document.body.style.backgroundImage = `url(images/${pictures[randomNumber]})`;
};