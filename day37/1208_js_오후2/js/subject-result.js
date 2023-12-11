// const subject = document.querySelector('li');
// const b = subject.innerText.split(' : ');
// const a = b[1].split(', ');
// console.log(b)
// console.log(a)
const subjects = document.querySelectorAll('li')
const set = new Set();

for (i=0; i < subjects.length; i++){
    const a = subjects[i].innerText.split(' : ');
    const b = a[1].split(', ');
    // console.log(b)
    for(j=0; j < b.length; j++){
        set.add(b[j])
    }
}
// console.log(set)
const list = [...set]

const result = document.querySelector('#result');


for(var i=0; i < list.length; i++){
    result.innerHTML += list[list.length-i-1] + '<br>';
}