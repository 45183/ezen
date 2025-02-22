// var age = 30    // 변수 "age"를 선언하고 30을 할당
// var age = 40    // 변수 "age"를 선언하고 40을 할당

// let age = 30;   // 변수 "age"를 선언하고 30을 할당
// let age = 40;   // 변수 "age"를 선언하고 40을 할당


// const age = 30;   // 변수 "age"를 선언하고 30을 할당
// const age = 40;   // 변수 "age"를 선언하고 40을 할당

// console.log(age)





//  var, (let, const)
// let, const - 재선언 불가





// let name = "John"; // 하나의 변수 만들기
// let x, y, z; // 여러 변수 만들기






// 변하지 않는 환경변수는 전부 대문자로 해주세요 (DB이름, 관리자 이름)







// 유효한 변수명
// let myVariable = "Valid variable name";

// 잘못된 변수명 (숫자로 시작)
// let 123variable = "Invalid variable name";








// 변수에 저장할 수 있는 데이터 종류 (Data Types for Variables): 숫자, 문자열, 배열, 객체 등

// let number = 42; // 숫자
// let text = "Hello, World!"; // 문자열
// let myArray = [1, 2, 3]; // 배열
// let person = { name: "Alice", age: 25 }; // 객체







// let a = 10; // "a" 변수에는 숫자 데이터가 저장됩니다.
// let b = a; // "b"에 "a"의 값이 복사됩니다.
// a = 20; // "a"의 값 변경
// let a = 20; 은 오류(let은 재정의 불가), 이미 만들어진 값 변경은 그냥 a = 20;
// const a = 10; 선언 후 a = 20; 에러
// console.log(b); // "b"의 값은 여전히 10








// let counter = 0; // 변수 초기화
// counter = counter + 1; // 변수 값 변경
// console.log(counter); // 1 출력









// let 키워드를 사용하여 변수를 선언하면 해당 변수는 블록 스코프를 가집니다. 
// 즉, 변수는 선언된 블록 내에서만 유효합니다. let을 사용하여 선언한 변수는 값을 변경할 수 있습니다.

// let x = 10;
// if (true) {
//   let x = 20; // 새로운 변수 x를 블록 내에서 선언
//   console.log(x); // 20 출력
// }
// console.log(x); // 10 출력










// const 키워드를 사용하여 변수를 선언하면 해당 변수는 상수로 취급되며 한 번 값을 할당하면 다시 변경할 수 없습니다.
// const로 선언한 변수는 블록 스코프를 가집니다.

// const PI = 3.14;
// PI = 3.14159265359; // 에러 - 상수로 선언된 값은 변경할 수 없음






// var 키워드를 사용하여 변수를 선언하면 해당 변수는 함수 스코프를 가집니다.
//  이것은 변수가 선언된 함수 내에서만 유효함을 의미합니다. var로 선언한 변수는 값이 변경될 수 있습니다.

// function example() {
//     var y = 5;
//     if (true) {
//       var y = 10; // 동일한 변수 y를 블록 내에서 다시 할당
//     }
//     console.log(y); // 10 출력
//   }

// example() // 10 





// 일반적으로 변수는 블록 안에서만 유효하므로 괄호의 설정이 매우 중요 

// const는 관리자 계정, 데이터 ERD 구조 같이 변하지 않는 변수에 대해 사용을 권장

// let은 변수 재선언은 안되지만 선언된 변수에 대한 값변경 가능

// var는 변수 재선언 자체가 가능함 (코드 배울때 많이 사용)







// var로 선언한 변수는 같은 스코프 내에서 여러 번 선언할 수 있으며, 나중에 선언한 값으로 변수가 업데이트됩니다. 
// 반면 let과 const로 선언한 변수는 같은 스코프 내에서 한 번만 선언할 수 있습니다.
 

// let과 const를 사용하는 것이 코드의 안전성과 가독성 측면에서 일반적으로 더 권장됩니다. 이는 여러 이유로 인해 발생합니다:

// 재선언 방지: let과 const는 변수 재선언을 방지합니다. 이것은 실수로 동일한 변수명을 여러 번 선언하는 오류를 방지하고 코드의 일관성을 유지하는 데 도움이 됩니다.
// 블록 스코프: let과 const는 블록 스코프를 가지므로 변수의 범위가 블록 내로 제한됩니다. 이는 변수를 블록 내에서만 사용하고 블록 외부에서 접근할 수 없도록 합니다. 이것은 버그를 줄이고 코드를 더 예측 가능하게 만듭니다.
// 값 변경 제한: const는 변수에 한 번 값을 할당하면 다시 변경할 수 없도록 합니다. 이것은 상수를 정의하는 데 유용하며, 값을 더 안정적으로 유지하는 데 도움이 됩니다.
// 호이스팅 문제 완화: var는 호이스팅(hoisting) 문제를 일으키기 쉽습니다. let과 const는 호이스팅 문제를 완화하고 초기화하기 전에 변수에 액세스하지 못하도록 합니다.
// 보다 명확한 코드: let과 const는 코드의 의도를 명확히 나타내는데 도움을 줍니다. 예를 들어, 변수의 값이 변경되지 않아야 하는 경우 const를 사용하면 다른 개발자가 이를 알고 코드를 더 잘 이해할 수 있습니다.

// 결론적으로, let와 const는 코드의 안전성과 가독성을 높이고 버그를 줄이는 데 도움을 주며, 일반적으로 더 권장되는 변수 선언 방식입니다. var는 이전 버전의 자바스크립트와의 하위 호환성을 위해 남아 있지만, 가능한 한 let와 const를 사용하는 것이 좋습니다.










// const person = { name: "John", age: 30 };
// person.age = 31; // 객체 속성 값을 업데이트

// const numbers = [1, 2, 3];
// numbers.push(4); // 배열에 요소 추가

// console.log(person)
// console.log(numbers)