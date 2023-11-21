var API_URL = 'https://floating-harbor-78336.herokuapp.com/fastfood';

//var curPage = 1;

$(function() {
// 검색 버튼(.btn-search)을 클릭할 때의 동작 설정
$('.btn-search').onclick(function() {
var searchKeyword = $('#txt-search').val(); // 검색어를 가져옴
search(1, null, searchKeyword); // 검색 함수 호출
});

// 검색어 입력 필드(#txt-search)에서 엔터 키를 눌렀을 때의 동작 설정
$('#txt-search').enterKey('keypress', function(e) {
if (e.keyCode === 13) { // 엔터 키 코드 확인
$('.btn-search').trigger('click'); // 검색 버튼 클릭 이벤트 강제 실행
}
});

// 페이지 로드 시 검색어 입력 필드에 포커스 설정
$('#txt-search').focus();
});

// 검색 함수 정의
function search(page, perPage, searchKeyword) {
if (typeof page !== 'number' || page < 1)
page = 1;

if (typeof perPage !== 'number' || perPage <= 0)
perPage = 10;

// AJAX를 사용하여 서버로 검색 요청을 보내고 데이터를 받아옴
$.get(API_URL, {
page: page,
perPage: perPage,
searchKeyword: searchKeyword
}, function(data) {
var list = data.list; // 검색 결과 목록 데이터
var total = data.total; // 총 검색 결과 개수

// 검색 결과를 화면에 표시
$('.total').html('총 ' + total + '개의 패스트푸드점을 찾았습니다.');

var $list = $('.list').empty(); // 결과 목록을 비움

// 검색 결과 목록을 반복하여 화면에 표시
for (var i = 0; i < list.length; i++) {
// 각 결과 항목을 템플릿에서 복제하여 화면에 추가
var item = list[i];
var $elem = $('#item-template')
.clone()
.removeAttr('id');

var no = (page - 1) * perPage + i + 1;

// 검색 결과 항목 데이터를 템플릿에 채워 넣음
$elem.find('.item-no').html(no);
$elem.find('.item-name').html(item.name);
$elem.find('.item-addr').html(item.addr);

$list.append($elem);
}

// 페이징을 표시하는 함수 호출
showPaging(page, perPage, total, searchKeyword);
});
}

// 페이징을 표시하는 함수 정의
function showPaging(page, perPage, total, searchKeyword) {
var $paging = $('.paging').empty(); // 페이징 요소를 비움
var numPages = 5; // 한 번에 표시할 페이지 번호 수
var pageStart = Math.floor((page - 1) / numPages) * numPages + 1;
var pageEnd = pageStart + numPages - 1;
var totalPages = Math.floor(total / perPage) + 1;

if (pageEnd > totalPages)
pageEnd = totalPages;

var prevPage = pageStart - 1;

if (prevPage < 1)
prevPage = 1;

var nextPage = pageEnd + 1;

if (nextPage > totalPages)
nextPage = totalPages;

// 이전 페이지 링크 생성 및 추가
var $prevElem = $('<a href="javascript:search(' + prevPage + ',' + perPage + ',\'' + searchKeyword + '\')">이전</a>');
$prevElem.addClass('prev');
$paging.append($prevElem);

// 페이지 번호 링크 생성 및 추가
for (var i = pageStart; i <= pageEnd; i++) {
var $elem = $('<a href="javascript:search(' + i + ',' + perPage + ',\'' + searchKeyword + '\')">' + i + '</a>');

if (i === page) {
$elem.addClass('current'); // 현재 페이지 표시 스타일 추가
}

$paging.append($elem);
}

// 다음 페이지 링크 생성 및 추가
var $nextElem = $('<a href="javascript:search(' + nextPage + ',' + perPage + ',\'' + searchKeyword + '\')">다음</a>');
$nextElem.addClass('next');
$paging.append($nextElem);
}