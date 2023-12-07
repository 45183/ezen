 document.querySelector("#products").addEventListener('click', whenClick);

// function to remove rows

function whenClick(event) {
    const tgt = event.target.closest('p');
    if (tgt) tgt.remove();
}