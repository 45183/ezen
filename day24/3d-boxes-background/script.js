const boxesContainer = document.getElementById('boxes')
const btn = document.getElementById('btn')

btn.addEventListener('click', () => boxesContainer.classList.toggle('big'))

function createBoxes() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const box = document.createElement('div')
      box.classList.add('box')
      box.style.backgroundPosition = `${-j * 125}px ${-i * 125}px`
      boxesContainer.appendChild(box)
    }
  }
}

// createBoxes()

// 이 코드는 HTML과 JavaScript를 사용하여 웹 페이지에 상자를 동적으로 생성하고 상자의 크기를 토글하는 기능을 구현한 예제입니다. 코드를 한 줄씩 살펴보겠습니다.

// const boxesContainer = document.getElementById('boxes'):

// getElementById 메서드를 사용하여 HTML 문서에서 id가 'boxes'인 요소를 찾아서 이를 boxesContainer 변수에 할당합니다. 이 요소는 나중에 상자들을 추가할 컨테이너 역할을 합니다.
// const btn = document.getElementById('btn'):

// getElementById 메서드를 사용하여 HTML 문서에서 id가 'btn'인 요소를 찾아서 이를 btn 변수에 할당합니다. 이 요소는 나중에 버튼 클릭 이벤트를 처리하는 데 사용됩니다.
// btn.addEventListener('click', () => boxesContainer.classList.toggle('big')):

// btn 요소에 클릭 이벤트 리스너를 추가합니다. 버튼이 클릭되면 실행되는 함수는 boxesContainer 요소의 classList.toggle('big')를 호출합니다. 이것은 'big' 클래스가 boxesContainer 요소에 이미 적용되어 있으면 제거하고, 없으면 추가합니다. 이렇게 하면 버튼을 클릭할 때마다 boxesContainer의 크기가 토글됩니다.
// function createBoxes() { ... }:

// createBoxes 함수를 정의합니다. 이 함수는 상자를 생성하고 boxesContainer에 추가하는 역할을 합니다.
// for 루프:

// 중첩된 for 루프를 사용하여 4x4 격자를 만듭니다. 바깥쪽 루프는 행을 나타내고 안쪽 루프는 열을 나타냅니다.
// const box = document.createElement('div'):

// document.createElement 메서드를 사용하여 div 요소를 생성하고 이를 box 변수에 할당합니다. 각 상자는 div 요소입니다.
// box.classList.add('box'):

// box 요소에 'box' 클래스를 추가합니다. 이 클래스는 CSS 스타일링을 위해 사용될 수 있습니다.
// box.style.backgroundPosition = ${-j * 125}px ${-i * 125}px``:

// 각 상자의 배경 이미지 위치를 설정합니다. box의 style 속성을 사용하여 backgroundPosition을 조정하고, i와 j 값에 따라 각 상자의 배경 위치를 계산합니다.
// boxesContainer.appendChild(box):

// 생성된 box를 boxesContainer에 추가합니다. 이렇게 하면 컨테이너에 상자가 동적으로 생성되고 추가됩니다.
// createBoxes():

// 페이지가 로드될 때 createBoxes 함수가 호출됩니다. 이 함수를 호출하여 초기에 4x4 격자의 상자가 생성되고 boxesContainer에 추가됩니다.
// 코드의 핵심 아이디어는 버튼을 클릭하면 boxesContainer 요소의 크기가 토글되고, 초기에는 4x4 격자의 상자가 생성되며 각 상자의 배경 위치가 설정됩니다. 이렇게 하면 사용자가 버튼을 클릭할 때마다 상자의 크기를 변경할 수 있습니다.