const nums = document.querySelectorAll('.nums span')
const counter = document.querySelector('.counter')
const finalMessage = document.querySelector('.final')
const replay = document.querySelector('#replay')

runAnimation()

function resetDOM() {
  counter.classList.remove('hide')
  finalMessage.classList.remove('show')

  nums.forEach((num) => {
    num.classList.value = ''
  })

  nums[0].classList.add('in')
}

function runAnimation() {
  nums.forEach((num, idx) => {
    const nextToLast = nums.length - 1

    num.addEventListener('animationend', (e) => {
      if (e.animationName === 'goIn' && idx !== nextToLast) {
        num.classList.remove('in')
        num.classList.add('out')
      } else if (e.animationName === 'goOut' && num.nextElementSibling) {
        num.nextElementSibling.classList.add('in')
      } else {
        counter.classList.add('hide')
        finalMessage.classList.add('show')
      }
    })
  })
}

replay.addEventListener('click', () => {
  resetDOM()
  runAnimation()
})

// const nums = document.querySelectorAll('.nums span'): CSS 클래스가 "nums"인 요소 하위의 모든 <span> 요소를 선택하고 이를 nums 변수에 NodeList로 저장합니다. 이 NodeList에는 카운터의 각 숫자를 나타내는 요소가 들어 있습니다.

// const counter = document.querySelector('.counter')와 const finalMessage = document.querySelector('.final'): "counter"와 "final" 클래스를 가진 요소를 선택하고 각각 counter와 finalMessage 변수에 할당합니다.

// const replay = document.querySelector('#replay'): "replay" ID를 가진 버튼 요소를 선택하고 replay 변수에 할당합니다.

// runAnimation(): 페이지 로드 시 runAnimation() 함수를 호출하여 애니메이션을 시작합니다.

// resetDOM(): DOM 요소를 초기 상태로 리셋하는 함수입니다. "counter" 및 "final" 클래스를 제거하고 숫자 요소의 클래스를 모두 초기화합니다. 초기 숫자인 0은 "in" 클래스를 가지고 시작합니다.

// runAnimation(): 각 숫자 요소에 대한 애니메이션을 설정하는 함수입니다. 각 숫자 요소에는 "in" 클래스가 처음에 적용되어 숫자가 표시됩니다. 각 숫자의 애니메이션 종료 이벤트를 감지하여 숫자가 변경되는 애니메이션 효과를 만듭니다.

// replay.addEventListener('click', () => { ... }): "다시 시작" 버튼을 클릭할 때 발생하는 이벤트 리스너를 등록합니다. 이벤트 리스너는 resetDOM() 함수를 호출하여 DOM을 초기 상태로 리셋하고, 다시 runAnimation() 함수를 호출하여 애니메이션을 다시 시작합니다.

// 애니메이션 흐름:

// 각 숫자 요소는 "in" 클래스를 가지고 시작하며, "goIn" 애니메이션을 통해 나타납니다.
// "goIn" 애니메이션 종료 시, 숫자 요소에 "in" 클래스가 제거되고 "out" 클래스가 추가되어 숫자가 사라지는 효과를 줍니다.
// 다음 숫자 요소(현재 요소의 다음 형제 요소)는 "in" 클래스를 추가하여 나타나게 됩니다.
// 마지막 숫자 요소가 애니메이션 종료되면 "counter" 클래스는 숨겨지고 "final" 클래스가 표시되어 애니메이션이 완료된 메시지를 표시합니다.
