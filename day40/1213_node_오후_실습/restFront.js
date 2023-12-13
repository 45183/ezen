// getUser 라는 함수를 정의해서 함수 내의 내용을 try 구문으로 시도

async function getUser(){
    try{
        // 사용자 정보를 서버에서 가져옴
        const res = await axios.get('/users');  // restFront.html에서 script로 axios 추가해서 require를 사용하지 않음
        // 서버응답에서 사용자 데이터를 추출
        const users = res.data;
        const list = document.getElementById('list');   // 화면에서 사용자 리스트를 표시할 요소 찾기
        list.innerHTML = '';    // 리스트 초기화

        // 각 사용자에 대해 반복적으로 화면에 표시하고 이벤트 연결
        Object.keys(users).map(function (key){
            // 사용자 정보를 표시할 태그 요소 생성
            const userDiv = document.createElement('div');
            const span = document.createElement('span');
            span.textContent = users[key];   // span에 사용자 이름 설정

            // 수정 버튼
            const edit = document.createElement('button');
            edit.textContent = '수정'   // 버튼에 대한 텍스트 설정
            edit.addEventListener('click', async () => {
                const name = prompt("바꿀 이름을 입력하세요");
                if(!name){
                    return alert("이름을 반드시 입력하셔야 합니다.")
                };
                try{
                    // 서버로 수정된 이름을 전송하여 사용자 정보를 업데이트
                    await axios.put('/user/' + key, {name});
                    // 정보 수정 후 사용자 정보를 다시 가져옴
                    getUser();
                } catch(err){
                    console.error(err);
                };

            });

            // 삭제 버튼
            const remove = document.createElement('button');
            remove.textContent = '삭제';
            remove.addEventListener('click', async() => {
                try{
                    await axios.delete('/users/' + key);
                    getUser();
                } catch(err){
                    console.error(err);
                };
            });

            // 생성한 요소들을 사용자 리스트에 추가하기
            userDiv.appendChild(span);
            userDiv.appendChild(edit);
            userDiv.appendChild(remove);
            list.appendChild(userDiv);

            // 서버에서 받은 사용자 데이터를 콘솔에 출력
            console.log(res.data);
        });
    } catch(err){
        console.error(err);
    };
};

window.onload = getUser;

document.getElementById('form').addEventListener('submit', async(e) => {
    e.preventDefault();
    // 폼에서 입력한 사용자 이름을 가져와서 name이란 변수에 저장
    const name = e.target.username.value;
    if(!name){
        return alert("이름을 입력하세요");
    };
    try{
        // 서버로 사용자 정보를 전송
        await axios.post('/user', {name});      
        getUser();
    } catch(err){
        console.error(err);
    };
    // 입력필드 초기화
    e.target.username.value = '';
});