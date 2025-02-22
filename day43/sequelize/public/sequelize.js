// // 사용자 이름을 클릭했을 때 댓글을 로딩하는 이벤트 리스너
// document.querySelectorAll('#user-list tr').forEach((el) => {
//     el.addEventListener('click', function(){
//         // 클릭한 테이블 행에서 첫번째 열(td) 내용을 가져온다.
//         const id = el.querySelector('td').textContent;
//         // 해당 사용자의 댓글을 가져오는 함수 호출
//         getComment(id);
//     });
// });

// // 사용자 정보를 가져와서 테이블에 표시 (html) 함수
// async function getUser(){
//     try{
//         // 서버로부터 사용자 정보를 불러옴
//         const res = await axios.get('/users');          // sequelize.html에 script에서 axios 사용
//         const users = res.data;
//         console.log(users);

//         // 사용자 정보를 표시할 테이블 요소 선택
//         const tbody = document.querySelector('#user-list tbody');
//         // 데이터 표시하기 전에 tbody 내용 초기화
//         tbody.innerHTML = '';
        
//         // 사용자 정보를 테이블에 추가
//         users.map(function(user){
//             const row = document.createElement('tr');
//             row.addEventListener('click', () => {
//                 getComment(user.id);
//             });

//             let td = document.createElement('td');
//             td.textContent = user.id;
//             row.appendChild(td);
            
//             td = document.createElement('td');
//             td.textContent = user.name;
//             row.appendChild(td);
            
//             td = document.createElement('td');
//             td.textContent = user.age;
//             row.appendChild(td);
            
//             td = document.createElement('td');
//             td.textContent = user.married;
//             row.appendChild(td);

//             // 테이블에 행 추가
//             tbody.appendChild(row);
//         });
//     } catch(err){
//         console.error(err);
//     };
// };


// async function getComment(id){
//     try{
//         // 서버로부터 해당 사용자의 댓글 정보를 가져옴
//         const res = await axios.get(`/users/${id}/comments`);
//         const comments = res.data;
//         // 댓글 정보를 표시할 테이블의 tbody 요소를 선택
//         const tbody = document.querySelector('#comment-list tbody');
//         // 데이터 표시하기 전에 tbody 내용 초기화
//         tbody.innerHTML = '';

//         comments.map(function(comment){
//             const row = document.createElement('tr');

//             let td = document.createElement('td');
//             td.textContent = comment.id;
//             row.appendChild(td);

//             td = document.createElement('td');
//             td.textContent = comment.User.name;
//             row.appendChild(td);

//             td = document.createElement('td');
//             td.textContent = comment.comment;
//             row.appendChild(td);
            
//             // html 문서 안에 '수정' 버튼을 만들어서 버튼을 누르면 댓글을 수정할 수 있게 작업
//             const edit = document.createElement('button');
//             edit.textContent = '수정';
//             edit.addEventListener('click', async() => {
//                 // 수정할 내용 입력받기
//                 const newComment = prompt('수정할 내용을 입력하세요.');
//                 if(!newComment){
//                     return alert('내용을 반드시 입력하여 주시기 바랍니다.');
//                 }
//                 try{
//                     // 수정할 내용을 요청 보냄
//                     await axios.patch(`/comments/${comment.id}`, {comment: newComment});
//                     // 수정 후 댓글을 다시 가져옴
//                     getComment(id);
//                 } catch(err){
//                     console.error(err);
//                 }
//             });

//             const remove = document.createElement('button');
//             remove.textContent = '삭제';
//             remove.addEventListener('click', async() => {
//                 try{
//                     await axios.delete(`/comments/${comment.id}`);
//                     // 삭제 후 댓글을 다시 가져옴
//                     getComment(id);
//                 } catch(err){
//                     console.error(err);
//                 };
//             });
            
//             // 만들어둔 '수정' & '삭제' 버튼을 html에 위치시킴
//             td = document.createElement('td');
//             td.appendChild(edit);
//             row.appendChild(td);

//             td = document.createElement('td');
//             td.appendChild(remove);
//             row.appendChild(td);

//             // 새로운 댓글 데이터가 위치할 수 있도록 행 추가
//             tbody.appendChild(row);
//         });
//     } catch(err){
//         console.error(err);
//     };
// };


// // 함수들을 정의했으니 사용자 등록하는 이벤트 리스너 만들기
// // 사용자 정보와 댓글 정보를 호출하여 작업하는 파트 진행
// document.getElementById('user-form').addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const name = e.target.username.value;
//     const age = e.target.age.value;
//     const married = e.target.married.checked;

//     if(!name){
//         return alert('이름을 입력하세요.')
//     };
//     if(!age){
//         return alert('나이을 입력하세요.')
//     };

//     try{
//         // 서버에 받은 사용자 정보를 등록 요청
//         await axios.post('/users', {name, age, married});
//         getUser();
//     } catch(err){
//         console.error(err);
//     };

//     // 입력필드 초기화
//     e.target.username.value = '';
//     e.target.age.value = '';
//     e.target.married.checked = false;
// });


// // 댓글 정보를 호출하여 작업하는 파트
// document.getElementById('comment-form').addEventListener('submit', async(e) => {
//     e.preventDefault();

//     const id = e.target.userid.value;
//     const comment = e.target.comment.value;

//     if(!id){
//         return alert('아이디를 입력하세요.');
//     };
//     if(!comment){
//         return alert('댓글을 입력하세요.');
//     };

//     // 서버에 댓글 정보를 등록 요청하고 화면정보 등록
//     try{
//         // 서버에 댓글 정보를 등록 요청
//         await axios.post('/comments', {id, comment});
//         // 등록하고 나서 해당 사용자의 댓글을 다시 가져오기
//         getComment(id);
//     } catch (err) {
//       console.error(err);
//     }

//     // 입력필드 초기화
//     e.target.userid.value = '';
//     e.target.comment.value = '';
// });

// 사용자 이름을 클릭했을 때 댓글을 로딩하는 이벤트 리스너 등록
document.querySelectorAll('#user-list tr').forEach((el) => {
    el.addEventListener('click', function () {
      // 클릭한 테이블 행에서 첫 번째 열(td)의 내용을 가져옴
      const id = el.querySelector('td').textContent;
      // 해당 사용자의 댓글을 가져오는 함수 호출
      getComment(id);
    });
  });
  
  // 사용자 정보를 가져와서 테이블에 표시하는 함수
  async function getUser() {
    try {
      // 서버로부터 사용자 정보를 가져옴
      const res = await axios.get('/users');
      const users = res.data;
      console.log(users);
      // 사용자 정보를 표시할 테이블의 tbody 요소를 선택
      const tbody = document.querySelector('#user-list tbody');
      tbody.innerHTML = ''; // tbody 내용 초기화
  
      // 사용자 정보를 테이블에 추가
      users.map(function (user) {
        const row = document.createElement('tr');
        // 테이블 행을 클릭하면 해당 사용자의 댓글을 가져오는 함수 호출
        row.addEventListener('click', () => {
          getComment(user.id);
        });
  
        // 각 열(td)에 사용자 정보를 추가
        let td = document.createElement('td');
        td.textContent = user.id;
        row.appendChild(td);
  
        td = document.createElement('td');
        td.textContent = user.name;
        row.appendChild(td);
  
        td = document.createElement('td');
        td.textContent = user.age;
        row.appendChild(td);
  
        td = document.createElement('td');
        td.textContent = user.married ? '기혼' : '미혼';
        row.appendChild(td);
  
        // 테이블에 행 추가
        tbody.appendChild(row);
      });
    } catch (err) {
      console.error(err);
    }
  }
  
  // 특정 사용자의 댓글을 가져와서 테이블에 표시하는 함수
  async function getComment(id) {
    try {
      // 서버로부터 해당 사용자의 댓글 정보를 가져옴
      const res = await axios.get(`/users/${id}/comments`);
      const comments = res.data;
      // 댓글을 표시할 테이블의 tbody 요소를 선택
      const tbody = document.querySelector('#comment-list tbody');
      tbody.innerHTML = ''; // tbody 내용 초기화
  
      // 댓글을 테이블에 추가
      comments.map(function (comment) {
        // 테이블 행을 생성
        const row = document.createElement('tr');
  
        // 각 열(td)에 댓글 정보를 추가
        let td = document.createElement('td');
        td.textContent = comment.id;
        row.appendChild(td);
  
        td = document.createElement('td');
        td.textContent = comment.User.name;
        row.appendChild(td);
  
        td = document.createElement('td');
        td.textContent = comment.comment;
        row.appendChild(td);
  
        // 수정 버튼 생성 및 이벤트 리스너 등록
        const edit = document.createElement('button');
        edit.textContent = '수정';
        edit.addEventListener('click', async () => {
          // 수정할 내용을 입력받음
          const newComment = prompt('바꿀 내용을 입력하세요');
          if (!newComment) {
            return alert('내용을 반드시 입력하셔야 합니다');
          }
          try {
            // 서버에 수정 요청을 보냄
            await axios.patch(`/comments/${comment.id}`, { comment: newComment });
            // 수정 후 댓글을 다시 가져옴
            getComment(id);
          } catch (err) {
            console.error(err);
          }
        });
  
        // 삭제 버튼 생성 및 이벤트 리스너 등록
        const remove = document.createElement('button');
        remove.textContent = '삭제';
        remove.addEventListener('click', async () => {
          try {
            // 서버에 삭제 요청을 보냄
            await axios.delete(`/comments/${comment.id}`);
            // 삭제 후 댓글을 다시 가져옴
            getComment(id);
          } catch (err) {
            console.error(err);
          }
        });
  
        // 수정과 삭제 버튼을 열(td)에 추가
        td = document.createElement('td');
        td.appendChild(edit);
        row.appendChild(td);
  
        td = document.createElement('td');
        td.appendChild(remove);
        row.appendChild(td);
  
        // 테이블에 행 추가
        tbody.appendChild(row);
      });
    } catch (err) {
      console.error(err);
    }
  }
  
  // 사용자를 등록하는 이벤트 리스너 등록
  document.getElementById('user-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = e.target.username.value;
    const age = e.target.age.value;
    const married = e.target.married.checked;
  
    if (!name) {
      return alert('이름을 입력하세요');
    }
    if (!age) {
      return alert('나이를 입력하세요');
    }
  
    try {
      // 서버에 사용자 정보를 등록 요청
      await axios.post('/users', { name, age, married });
      // 등록 후 사용자 정보 다시 가져옴
      getUser();
    } catch (err) {
      console.error(err);
    }
  
    // 입력 필드 초기화
    e.target.username.value = '';
    e.target.age.value = '';
    e.target.married.checked = false;
  });
  
  // 댓글을 등록하는 이벤트 리스너 등록
  document.getElementById('comment-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = e.target.userid.value;
    const comment = e.target.comment.value;
  
    if (!id) {
      return alert('아이디를 입력하세요');
    }
    if (!comment) {
      return alert('댓글을 입력하세요');
    }
  
    try {
      // 서버에 댓글 정보를 등록 요청
      await axios.post('/comments', { id, comment });
      // 등록 후 해당 사용자의 댓글 다시 가져옴
      getComment(id);
    } catch (err) {
      console.error(err);
    }
  
    // 입력 필드 초기화
    e.target.userid.value = '';
    e.target.comment.value = '';
  });
  