# 퀴즈: sqldb안에 있는 usertbl에서 addr 기준으로 가장  큰 키를 뽑아주세요

# 위의 쿼리를 cte스타일로 만들어 주세요.
# 만들어 주실 때 키 큰순으로 정렬해 주세요.

-- WITH cte_tbl(addr, maxh)
-- AS
-- (SELECT addr, max(height)
-- FROM usertbl GROUP BY addr)

-- -- 결과
--  SELECT * FROM cte_tbl ORDER BY maxh DESC;


# quiz - cte 본 기법을 이용해서 지역별 최고키의 평균을 구하는 쿼리 작성
# 컬럼이름도 '지역별 최고키의 평균'으로

-- with cte_tbl(addr, maxh)
-- as
-- (select addr, max(height) from sqldb.usertbl group by addr)
-- select avg(maxh) as '지역별 최고키의 평균' from cte_tbl;

-- with max_height(addr, maxHeight)
-- as
-- (select addr, max(height) from sqldb.usertbl group by addr)
-- select avg(maxHeight) as '지역별 최고키의 평균' from max_height;


# 변수의 사용
-- use sqldb;

-- set @myVar1 = 3;
-- prepare myQuery from 'select name, height from usertbl order by height limit ?';
-- execute myQuery using @myVar1; 
# 준비된 myQuery에 ? 부분에 변수 @myVar1이 들어간다.


-- set @a = 15;
-- prepare myQuery from 'select * from usertbl order by mobile1, mobile2 limit ?';
-- execute myQuery using @a;



# 데이터 형식변환

# cast, convert
# 실수 -> 정수, 정수 -> 문자열, 날짜 등

-- use sqldb;
-- select avg(amount) as '평균 구매 개수' from buytbl;

-- # cast(expression as 데이터 형식[(길이)])
-- select cast(avg(amount) as signed integer) as '평균 구매 개수' from buytbl;

-- # convert(expression, 데이터 형식[(길이)])
-- select convert(avg(amount), signed integer) as '평균 구매 개수' from buytbl;

-- select cast('2023/11/01' as date);
-- select convert('2023/11/01', date);

# concat(문자1, 문자2, ...) - 문자열로 이어주기 (cast, convert 이용해서 문자열로 변환)
-- select num, concat(cast(price as char(10)), 'x', cast(amount as char(4)), '=') as '단가X수량', price*amount as '구매액' from sqldb.buytbl;

# concat 걷어내기
-- select num, cast(price as char(10)), cast(amount as char(4)), price*amount as '구매액' from sqldb.buytbl;
-- select num, price as '단가', amount as '수량', price*amount as '구매액' from sqldb.buytbl;

# boolean 처리됨
-- select 1 > '2mega'; # 0
-- select 3 > '2mega'; # 1
-- select 2 = '2mega'; # 1
-- select 2 = 'mega2'; # 0
-- select 0 = 'mega2'; # 1 
# 문자열 데이터의 맨 앞 숫자는 변환해서 비교 연산
# 단, 문자열이 가장 앞이면 0으로 해석해서 연산



# MySQL 내장함수

# if(수식, 참, 거짓) - 참,거짓에 따른 문자열 반환
-- select if(100>200, '참이다', '거짓이다');

# ifnull(수식1, 수식2)
# null이면 수식1 반환, null이 아니면 수식2 반환
-- select ifnull(null, '널이군요'), ifnull(100, '널이군요');

-- select nullif(100, 100), nullif(200,100);



# case 값에 따라 값 반환

-- case 경우
-- when 보기1 then 출력1
-- when 보기2 then 출력2
-- else 출력3
-- end

-- select case 10
-- when 1 then '일'
-- when 5 then '오'
-- when 10 then '10'
-- else '모름'
-- end as  'case 연습';



# ASCII 번호로 반환, 문자로 반환
# ASCII(문자), char(숫자);
-- select ascii('A'), char(65);


# 문자열의 길이를 반환, 내부적 bit, 글자의 개수, 내부적 byte    # 1 byte = 8 bit
# 내부 크기보다 글자의 길이만 보는 경우가 일반적 -> char_length()
# bit_length(문자열), char_length(문자열), length(문자열)
-- select bit_length('abc'), char_length('abc'), length('abc');



# 구분자와 함께 이어줌
# concat_ws(구분자1, 문자1, 문자2, ...)
-- select concat_ws('/', '2023', '11', '01');



# ELT(인덱스, 문자1, 문자2, ....) - 인덱스에 해당하는 문자를 출력, 없으면 null
# FIELD(검색어, 문자1, 문자2, ....) - 검색어의 인덱스를 숫자로 출력, 없으면 0
# FIND_IN_SET(검색어, '문자1, 문자2, ...') - ',' 기준으로 인덱스를 숫자로 출력, 없으면 0
# INSTR('문자열', 부분 문자열) - 부분문자열의 시작 인덱스를 숫자로 출력, 없으면 0
# LOCATE(부분문자열, '문자열') - 부분문자열의 시작 인덱스를 숫자로 출력, 없으면 -
-- select elt(2, '하나', '둘', '셋'), field('둘', '하나', '둘', '셋'), find_in_set('둘', '하나,둘,셋'), instr('하나둘셋', '둘'), locate('둘','하나둘셋');



-- 확인필요-------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 숫자를 자릿수 만큼 표현하고 싶을 때
-- FORMAT(숫자, 자릿수)
-- SELECT FORMAT(123456.123456, 4);

-- 진법 변환: BIN(숫자), HEX(숫자), OCT(숫자);
-- SELECT BIN(31), HEX(31), OCT(31);
-- 11111, 1F, 37

-- INSERT(문자열, 시작인덱스, 갯수, 넣을 문자열)
-- SELECT INSERT('abcdefghi', 3, 4, '@@@@'), INSERT('abcdefghi', 3, 2, '@@@@');

-- 왼쪽에서 3개 출력: LEFT(문자열, 3)
-- 오른쪽에서 2개 출력: RIGHT(문자열, 2)
-- SELECT LEFT('abcdefghi', 3), RIGHT('abcdefghi', 2);

-- 대문자로: UPPER(문자열)
-- 소문자로: LOWER(문자열)
-- SELECT LOWER('abcdEFGH'), UPPER('abcdEFGH');

-- 왼쪽 패딩 총 길이 5: LPAD(문자열, 5, 패딩할 문자열)
-- 오른쪽 패딩 총 길이 8: LPAD(문자열, 5, 패딩할 문자열)
-- SELECT LPAD('이것이', 5, '#'), RPAD('이것이', 8, '!#');

-- 오른쪽 공백 삭제: RTRIM(문자열)
-- 왼쪽 공백 삭제: LTRIM(문자열)
-- 양쪽 공백 삭제: TRIM(문자열)
-- 양쪽 특정 문자열 삭제: TRIM(BOTH 삭제할 문자 FROM 문자열)
-- SELECT LTRIM('   이것이'), RTRIM('이것이   ');
-- SELECT TRIM('   이것이   ');
-- SELECT TRIM(BOTH 'ㅋ' FROM 'ㅋㅋㅋ재밌어요.ㅋㅋㅋ');
-- SELECT TRIM('ㅋ' FROM 'ㅋㅋㅋ재밌어요.ㅋㄴㅋㅋ');

-- 문자열 횟수 반복: REPEAT(문자열, 횟수)
-- SELECT REPEAT('이것이', 3);

-- 문자열 치환: REPLACE(문자열, 바꿀 문자열, 바뀐 문자열)
-- SELECT REPLACE('이것이 MySQL이다', '이것이', 'This is');
-- SELECT REPLACE('삭제해줘', '삭제', '수정');

-- 거꾸로
-- SELECT REVERSE('MySQL');

-- 띄어쓰기 넣기
-- SELECT CONCAT('이것이', SPACE(10), 'MySQL이다');

-- 부분 문자열 3번째~2개까지(민국)
-- SELECT SUBSTRING('대한민국만세', 3, 2);

-- 부분문자열 인덱싱
-- SUBSTRING_INDEX(문자열, 구분자, 순번(시작부터))
-- SELECT SUBSTRING_INDEX('cafe.naver.com', '.', 2), SUBSTRING_INDEX('cafe.naver.com', '.', -2);

-- 절댓값
-- SELECT ABS(-100);

-- 올림, 내림, 반올림: CEILING, FLOOR, ROUND
-- SELECT CEILING(4.2), FLOOR(4.7), ROUND(4.7);

-- CONV(문자 또는 숫자, 원래 진법, 바꿀 진법)
-- SELECT CONV('AA', 16, 2), CONV(100, 10, 8);

-- 각도 변환
-- SELECT DEGREES(PI()), RADIANS(180);

-- 나머지
-- SELECT MOD(157, 10), 157 % 10, 157 MOD 10;

-- 제곱과 제곱근
-- SELECT POW(2,3), SQRT(9);

-- 랜덤(0~1), 1~6까지 랜덤
-- SELECT RAND(), FLOOR(1 + (RAND() * (6-1)) );

-- 숫자의 부호를 반환 함수
-- SELECT SIGN(100), SIGN(0), SIGN(-100.123);

-- 삼각함수
-- select sin(100), sin(0), sin(-100);

-- 자릿수 소숫점 2번째까지, 둘쨋자리까지 버림 - round와 비교
-- SELECT TRUNCATE(12345.12345, 2), TRUNCATE(12345.12355, -2);

-- 날짜 더하기 빼기
-- SELECT ADDDATE('2025-01-01', INTERVAL 31 DAY), ADDDATE('2025-01-01', INTERVAL 1 MONTH);
-- SELECT SUBDATE('2025-01-01', INTERVAL 31 DAY), SUBDATE('2025-01-01', INTERVAL 1 MONTH);

-- 시간 더하기 빼기
-- SELECT ADDTIME('2025-01-01 23:59:59', '1:1:1'), ADDTIME('15:00:00', '2:10:10');
-- SELECT SUBTIME('2025-01-01 23:59:59', '1:1:1'), SUBTIME('15:00:00', '2:10:10');

-- 현재 날짜, 시간 보기
-- SELECT YEAR(CURDATE()), MONTH(CURDATE()), DAYOFMONTH(CURDATE());
-- SELECT HOUR(CURTIME()), MINUTE(CURRENT_TIME()), SECOND(CURRENT_TIME()), MICROSECOND(CURRENT_TIME());

-- 현재 날짜, 시간 보기
-- SELECT DATE(NOW()), TIME(NOW());
-- SELECT DATE(CURTIME()), TIME(CURTIME());

-- 날짜, 시간 차이 구하기
-- SELECT DATEDIFF('2025-01-01', NOW()), TIMEDIFF('23:23:59', '12:11:10');

-- 요일(일월화수목금토, 1234567), 월을 글자로 출력, 1년 중 몇번째 날짜?
-- DAYOFWEEK(날짜), MONTHNAME(날짜), DAYOFYEAR(날짜)
-- SELECT DAYOFWEEK(CURDATE()), MONTHNAME(CURDATE()), DAYOFYEAR(CURDATE());

-- 해당 달의 마지막 날짜 구하기
-- SELECT LAST_DAY('2024-02-01');

-- 날짜 만들기
-- MAKEDATE(년도, 일수)
-- SELECT MAKEDATE(2021, 279);

-- 시간 만들기
-- MAKETIME(시, 분, 초)
-- SELECT MAKETIME(12, 11, 10);

-- 기간 더하기, 기간 빼기
-- PERIOD_ADD(yymm 또는 yyyymm 형식, 달수), PERIOD_DIFF(yymm 또는 yyyymm 형식, yymm 또는 yyyymm 형식)
-- SELECT PERIOD_ADD(202501, 11), PERIOD_DIFF(202501, 202312);

-- 분기 계산(3분기)
-- SELECT QUARTER('2025-07-07');

-- 초로 바꾸기(43870초)
-- SELECT TIME_TO_SEC('12:11:10');

-- 현재 유저, 사용중인 DB 보기
-- SELECT CURRENT_USER(), DATABASE();

-- USE sqldb;
-- SELECT * FROM usertbl;
-- -- 조회된 행갯수 보기
-- SELECT FOUND_ROWS();

-- USE sqldb;
-- UPDATE buytbl SET price=price*2;
-- -- 변화된 행 갯수 보기
-- SELECT ROW_COUNT();

-- 타이머 작동(쿼리문)
-- SELECT SLEEP(5);
-- SELECT '5초후에 이게 보여요';
-- --------------------------------------------------------------------------------------------------------------------------------------------------------------------



# 영화사이트(대용량 데이터) 구축 실습

# 테이블 생성
-- create table movietbl 
--   (movie_id        int,
--    movie_title     varchar(30),
--    movie_director  varchar(20),
--    movie_star      varchar(20),
--    movie_script    longtext,
--    movie_film      longblob
-- ) default charset=utf8mb4;


-- insert into movietbl values ( 1, '쉰들러 리스트', '스필버그', '리암 니슨',  
-- load_file('C:/Users/hsb97/Desktop/ezen/day10/movies/Schindler.txt'), load_file('C:/Users/hsb97/Desktop/ezen/day10/movies/Schindler.mp4') );

-- select * from movietbl;
-- 값이 안들어 가는 이유: 용량 크기 설정, 보안 설정이 필요!

-- show variables like 'max_allowed_packet'; # 최대 허용 파일 업로드 사이즈
-- show variables like 'secure_file_priv'; # 업로드 / 다운르드 경로 설정



# C:\Users\hsb97\Desktop\ezen\day10 안에 사진 과정 진행, C:/ProgramData/MySQL/MySQL Server 8.0/Uploads에 movies 폴더에 있던 파일 전부 이동
-- use sqldb;

-- truncate movietbl; # 기존 테이블 전부 비우기

-- insert into movietbl values (1, '쉰들러 리스트', '스필버그', '리암 니슨',  
-- load_file('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Schindler.txt'), load_file('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Schindler.mp4') );
-- insert into movietbl values ( 2, '쇼생크 탈출', '프랭크 다라본트', '팀 로빈스',  
-- load_file('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Shawshank.txt'), load_file('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Shawshank.mp4') );    
-- insert into movietbl values ( 3, '라스트 모히칸', '마이클 만', '다니엘 데이 루이스',
-- load_file('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Mohican.txt'), load_file('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Mohican.mp4') );

-- select * from movietbl;
# movie_script - 결과 우클릭-open value in viewer 
# movie_file - blob



-- TEXT 다운로드 - 권한 없어서 실행 불가
-- SELECT movie_script FROM movietbl WHERE movie_id=1 
-- INTO OUTFILE 'C:/Users/hsb97/Desktop/ezen/day10/Schindler_out.txt'  
-- LINES TERMINATED BY '\\n';
-- 영화 다운로드 - 권한 없어서 실행 불가
-- SELECT movie_film FROM movietbl  WHERE movie_id=3 
-- INTO DUMPFILE 'C:/Users/hsb97/Desktop/ezen/day10/Mohican_out.mp4';






# 피벗 테이블 - 피벗(Pivot)테이블이란 많은 양의 데이터에서 필요한 자료만을 뽑아 새롭게 표를 작성해 주는 기능
-- use sqldb;
-- create table pivotTest (uName char(3), season char(2), amount int);
-- insert into pivotTest values
-- ('김범수', '겨울',  10), ('윤종신', '여름',  15), ('김범수', '가을',  25), ('김범수', '봄',     3),
-- ('김범수', '봄',    37), ('윤종신', '겨울',  40), ('김범수', '여름',  14), ('김범수', '겨울',  22),
-- ('윤종신', '여름',  64);

-- select * from pivotTest;

-- select uName, 
-- sum(if(season='봄', amount, 0)) as '봄', # season이 봄이면 amount를 더함, 아니면 0 더함
-- sum(if(season='여름', amount, 0)) as '여름',
-- sum(if(season='가을', amount, 0)) as '가을',
-- sum(if(season='겨울', amount, 0)) as '겨울', 
-- sum(amount) as '합계' from pivotTest group by uName;

-- select uName, 
-- avg(if(season='봄', amount, 0)) as '봄',
-- avg(if(season='여름', amount, 0)) as '여름',
-- avg(if(season='가을', amount, 0)) as '가을',
-- avg(if(season='겨울', amount, 0)) as '겨울', 
-- avg(amount) as '합계' from pivotTest group by uName;

-- select uName, 
-- max(if(season='봄', amount, 0)) as '봄',
-- max(if(season='여름', amount, 0)) as '여름',
-- max(if(season='가을', amount, 0)) as '가을',
-- max(if(season='겨울', amount, 0)) as '겨울', 
-- max(amount) as '합계' from pivotTest group by uName;


# JSON
-- use sqldb;
-- select json_object('name', name, 'height', height) as 'JSON 값' from usertbl where height >= 180;

-- set @json='{ "usertbl" :
-- [
-- {"name": "임재범", "height": 182},
-- {"name": "이승기", "height": 182},
-- {"name": "성시경", "height": 186}
-- ]
-- }';


# json이 유효한지 1/0 리턴
-- select json_valid(@json) as json_valid;



# JSON_SEARCH : 데이터를 받아서 인덱스 출력
# JSON_EXTRACT : 인덱스를 받아서 데이터 출력

-- JSON_SEARCH(데이터, one/all, 찾을것)
-- 데이터 내에서 찾을꺼 첫번째 인덱스 반환(0부터 시작)
-- select json_search(@json, 'one', '성시경') as json_search;

-- 인덱스 기반으로 검색
-- select json_extract(@json, '$.usertbl[2].name') as json_extract;

# 입력
-- select json_insert(@json, '$.usertbl[0].mDate', '2009-09-09') as json_insert;

# 변경
-- select json_replace(@json, '$.usertbl[0].name', '홍길동') as json_replace;

# 삭제
-- select json_remove(@json, '$.usertbl[0]') as json_remove;



# 데이터가 적은 쪽이 pk
# 데이터가 많은 쪽이 fk를 가짐

-- create table Users (
-- UserID int auto_increment,
-- UserName varchar(100),
-- UserEmail varchar(100),
-- primary key (UserID)
-- );

-- create table Orders (
-- OrderID int auto_increment,
-- OrderDate date,
-- UserID int,
-- Amount decimal(10, 2),
-- primary key (OrderID),
-- foreign key (UserID) references Users(UserID)
-- );

-- insert into Users (UserName, UserEmail) values ('김철수', 'chulsoo@example.com'), ('이영희', 'younghi@example.com'), ('박지민', 'jimin@example.com');

-- insert into Orders (OrderDate, UserID, Amount) values ('2023-10-01', 1, 15000.00), ('2023-10-02', 1, 20000.00), ('2023-10-03', 2, 5000.00), ('2023-10-04', 3, 8000.00);


# 외래 키 제약 조건: Orders 테이블에 데이터를 추가할 때, UserID는 반드시 Users 테이블에 존재하는 UserID 값을 가져야 합니다.
# 만약 Users 테이블에 없는 UserID를 가진 주문을 추가하려고 하면, 데이터베이스 시스템은 오류를 반환합니다.

# 삭제 및 업데이트 제약: Users 테이블에서 사용자를 삭제하거나 UserID를 변경할 경우, 
# 이와 연관된 Orders 테이블의 데이터에도 영향을 미칠 수 있습니다. 이를 관리하기 위한 다양한 전략(CASCADE, SET NULL 등)이 존재합니다.





# 조인(join)
-- select <열목록> from <첫번째 테이블>
-- inner join <두번째 테이블> on <조인될 조건>
-- (where 검색조건) - 생략가능

-- select * from buytbl
-- inner join usertbl on buytbl.userID = usertbl.userID
-- where buytbl.userID = 'JyP';
# group by는 합칠 수 있는것만 출력할때 사용

# distinct - 중복제거
-- select distinct U.userID, U.name, U.addr from usertbl U
-- inner join buytbl B on U.userID = B.userID
-- order by U.userID;

-- select distinct * from usertbl U
-- inner join buytbl B on U.userID = B.userID
-- order by U.userID;


-- use sqldb;
-- create table stdtbl (stdName varchar(10) not null primary key, addr char(4) not null);
-- create table clubtbl (clubName varchar(10) not null primary key, roomNo char(4) not null);
-- create table stdclubtbl (num int auto_increment not null primary key, stdName varchar(10) not null, clubName varchar(10) not null, 
-- foreign key (stdName) references stdtbl (stdName), foreign key (clubName) references clubtbl (clubName));

-- insert into stdtbl values ('김범수','경남'), ('성시경','서울'), ('조용필','경기'), ('은지원','경북'),('바비킴','서울');
-- insert into clubtbl values ('수영','101호'), ('바둑','102호'), ('축구','103호'), ('봉사','104호');
-- insert into stdclubtbl values (NULL, '김범수','바둑'), (NULL,'김범수','축구'), (NULL,'조용필','축구'), (NULL,'은지원','축구'), (NULL,'은지원','봉사'), (NULL,'바비킴','봉사');

-- select S.stdName, S.addr, SC.clubName, C.roomNo from stdtbl S
-- inner join stdclubtbl SC on S.stdName = SC.stdName
-- inner join clubtbl C on SC.clubName = C.clubName
-- order by S.stdName;

# 주 테이블과 연결하고자 하는 테이블의 직접적인 데이터 연관을 설명하는 키가 없는 경우, 
# foreign key를 전부 보유한 테이블을 불러서 그 테이블을 통해 원하는 정보를 연결하는 접근법을 취해야 한다.



# outer join
-- select <열 목록> from <테이블1(left 테이블)>
-- <left|right|full> outer join <테이블2(right 테이블)>     # 왼쪽|오른쪽|모든테이블
-- on <조인될 조건>
-- (where 검색조건)

-- use sqldb;
-- select U.userID, B.prodName, U.addr, concat(U.mobile1, U.mobile2) as '연락처' from usertbl U
-- left outer join buytbl B on U.userID = B.userID order by U.userID;

# quiz - 아래 두개(주 테이블, 부테이블 변경했을때)의 차이
-- use sqldb;
-- select U.userID, B.prodName, U.addr, concat(U.mobile1, U.mobile2) as '연락처' from usertbl U
-- left outer join buytbl B on U.userID = B.userID order by U.userID;

-- use sqldb;
-- select U.userID, B.prodName, U.addr, concat(U.mobile1, U.mobile2) as '연락처' from buytbl B
-- left outer join usertbl U on U.userID = B.userID order by U.userID;

# 내 답변
# 주 테이블이 usertbl인 경우 물건을 구매하지 않은 경우에도 모든 userID에 대한 구매내역이 출력
# 주 테이블이 buytbl의 경우 물건을 구매한 userID (buytbl에 있는 userID)만 출력

# LEFT JOIN는 왼쪽 테이블(table1)의 모든 레코드를 반환하고 오른쪽 테이블(table2)에서 일치하는 레코드를 반환
# 위의 경우 buytbl의 userID가 모두 usertbl의 userID에 들어가 있지만 반대의 경우는 아니기때문에 차이 발생

# 정답
# usertbl의 userID는 10개, buytbl의 userID는 중복없이 5명뿐
# 기준이 되는 테이블의 모든 정보 반환하므로 
# 그냥 위의 설명 그대로




# cross join - 행 x 행 -> 너무 큼


# self join
-- use sqldb;
-- create table emptbl (emp char(3), manager char(3), emptel varchar(8));

-- insert into emptbl values ('나사장', null, '0000');
-- insert into emptbl values ('우대리', '이부장', '2222-2-1');
-- insert into emptbl values ('이부장', '김대리', '7777');
-- insert into emptbl values ('김전무', '나사장', '8888');

# '우대리'의 상관 전화번호
-- select A.emp, B.emp, A.emptel as '담당자 번호', B.emptel as '상사 번호' from emptbl A
-- inner join emptbl B on A.manager = B.emp
-- where A.emp = '우대리';



# union / union all
# 두 쿼리의 결과를 합치는 것
# union - 중복된 열 제거
# union all - 중복된 열 포함 출력


# stdName이 null인 경우 미출력
-- select S.stdName, S.addr, C.clubName, C.roomNo from stdtbl S
-- left outer join stdclubtbl SC on S.stdName = SC.stdName
-- left outer join clubtbl C on SC.clubName = C.clubName;

# clubName이 null인 경우 미출력
-- select S.stdName, S.addr, C.clubName, C.roomNo from stdtbl S
-- left outer join stdclubtbl SC on S.stdName = SC.stdName
-- right outer join clubtbl C on SC.clubName = C.clubName;

# union - 합집합 / 중복 제외
# 위의 두개의 합집합 (중복 제외)
-- select S.stdName, S.addr, C.clubName, C.roomNo from stdtbl S
-- left outer join stdclubtbl SC on S.stdName = SC.stdName
-- left outer join clubtbl C on SC.clubName = C.clubName
-- union
-- select S.stdName, S.addr, C.clubName, C.roomNo from stdtbl S
-- left outer join stdclubtbl SC on S.stdName = SC.stdName
-- right outer join clubtbl C on SC.clubName = C.clubName;


-- select S.stdName, S.addr, C.clubName, C.roomNo from stdtbl S
-- left outer join stdclubtbl SC on S.stdName = SC.stdName
-- left outer join clubtbl C on SC.clubName = C.clubName
-- union all
-- select S.stdName, S.addr, C.clubName, C.roomNo from stdtbl S
-- left outer join stdclubtbl SC on S.stdName = SC.stdName
-- right outer join clubtbl C on SC.clubName = C.clubName;




# not in / in

-- select name, concat(mobile1, mobile2) as '전화번호' from usertbl where name not in (select name from usertbl where mobile1 is null); # 전화번호가 null이 아닌 사람 출력
-- select name, concat(mobile1, mobile2) as '전화번호' from usertbl where name in (select name from usertbl where mobile1 is null); # 전화번호가 null인 사람 출력