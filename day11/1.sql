-- delimiter $$
-- create procedure 스토어드_프로시저이름()
-- begin
-- -- sql 프로그래밍 코딩
-- end $$
-- delimiter ;
-- call 스토어드_프로시저이름();



# 예제
-- drop procedure if exists ifProc2;
-- use employees;

-- delimiter $$
-- create procedure ifProc2()
-- begin
-- declare hireDate date; # 입사일
-- declare curDate date; # 오늘
-- declare days int; # 근무일수

-- select hire_date into hireDate from employees.employees # hire_date 열의 결과를 hireDate에 대입
-- where emp_no = 10001;

-- set curDate = current_date(); # 현재 날짜
-- set days = datediff(curDate, hireDate); # 날짜 차이 (현재날짜, 입사일) - 일 단위

-- if (days/365) >= 5 then # 5년이상인 경우
-- 	select concat('입사한지 ', days, '일이나 지났습니다. 축하합니다!') as 'result';
-- 	-- select '입사한지 ' + days + '일이나 지났습니다. 축하합니다!'; # 이 방법으로하면 출력값은 days만 나타남
-- else
-- -- 	select '입사한지 ' + days + '일밖에 안되었네요. 열심히 일하세요.';
-- 	select concat('입사한지 ', days, '일밖에 안되었네요. 열심히 일하세요.')  as 'result';
-- end if;
-- end $$
-- delimiter ;

-- call ifProc2();


# 예제
-- drop procedure if exists caseProc;
-- delimiter $$
-- create procedure caseProc()
-- begin
-- declare point int;
-- declare credit char(1);
-- set point = 77;

-- case
-- when point >= 90 then
-- 	set credit = 'A';
-- when point >= 80 then
-- 	set credit = 'B';
-- when point >= 70 then
-- 	set credit = 'C';
-- when point >= 60 then
-- 	set credit = 'D';
-- else
-- 	set credit = 'F';
-- end case;
-- select concat('취득 점수 -> ', point) as '점수', concat('학점 -> ', credit) as '학점';
-- end $$
-- delimiter ;
-- call caseProc();



# 예제
-- use sqldb;
-- select u.userID, u.name, sum(price*amount) as '구매금액',
-- case # case ~ end 로 고객등급 column 추가
-- when (sum(price*amount) >= 1500) then '최우수고객'
-- when (sum(price*amount) >= 1000) then '우수고객'
-- when (sum(price*amount) >= 1) then '일반고객'
-- else '유령고객'
-- end as '고객등급'
-- from buytbl b
-- right outer join usertbl u
-- on b.userID = u.userID
-- group by u.userID, u.name
-- order by sum(price*amount) desc;




# 예제 - 7의 배수 제외의 합이 1000 넘으면 출력
-- drop procedure if exists whileProc2;
-- delimiter $$
-- create procedure whileProc2()
-- begin
-- 	declare i int; # 1에서 100까지 증가할 변수
-- 	declare hap int; # 더한 값을 누적할 변수
-- 	set i = 1;
-- 	set hap = 0;	

-- myWhile : while (i <= 100) do # while문에 label을 지정
-- if (i % 7 = 0) then 
-- 	set i = i + 1;
-- 	iterate myWhile; # 지정한 label문으로 가서 계속 진행 		# iterate는 continue
--     # 7로 나눈 나머지가 0이 되는 경우 계속 진행
-- end if; # 7의 배수가 아니면
-- 	set hap = hap + i; # hap에 i를 더함
-- 	if (hap > 1000) then # i가 1000이 넘
-- 	leave myWhile; # 지정한 label문 떠남 - while문 종료		# leave는 break
-- end if;
-- 	set i = i + 1;
-- end while;

-- select hap;
-- end $$
-- delimiter ;
-- call whileProc2();


# 7의 배수만 더하는 경우 - 내풀이
-- drop procedure if exists whileProc2;
-- delimiter $$
-- create procedure whileProc2()
-- begin
-- 	declare i int; 
-- 	declare hap int; 
-- 	set i = 1;
-- 	set hap = 0;	

-- myWhile : while (i <= 100) do 
-- if (i % 7 != 0) then 
-- 	set i = i + 1;
-- 	iterate myWhile;
-- end if; 
-- 	set hap = hap + i; 
-- 	if (i > 100) then 
-- 	leave myWhile; 
-- end if;
-- 	set i = i + 1;
-- end while;

-- select hap as '7의 배수의 합';
-- end $$
-- delimiter ;
-- call whileProc2();



# 정답 - 더 간단한 방법
-- drop procedure if exists whileProc2;
-- delimiter $$
-- create procedure whileProc2()
-- begin
-- 	declare i int; 
-- 	declare hap int; 
-- 	set i = 1;
-- 	set hap = 0;	

-- myWhile : while (i <= 100) do 
-- if (i % 7 = 0) then 
-- 	set hap = hap + i;
-- end if; 
-- 	set i = i + 1; 
-- end while;

-- select hap as '7의 배수의 합';
-- end $$
-- delimiter ;
-- call whileProc2();




# 오류처리
-- declare <액션> handler for <오류조건> <처리할 문장>;

-- drop procedure if exists errorProc2;
-- delimiter $$
-- create procedure errorProc2()
-- begin
-- 	declare continue handler for sqlexception
-- begin
-- 	show errors;	# 오류 메세지 보여준다
-- 	select '오류가 발생했네요. 작업은 취소시켰습니다.' as '메시지';
-- 	rollback;		# 오류 발생시 작업 롤백
-- end;
-- 	insert into usertbl values ('LSG', '이상구', 1988, '서울', null, null, 170, current_date()); # usertbl에서 userID는 pk로 중복이 불가능하다. 에러발생
-- end $$
-- delimiter ;
-- call errorProc2();




# 동적 SQL

# 정의
-- prepare <실행 이름> <사용하고싶은 명령어>;
# 실행
-- execute prepare <실행 이름>;
# 삭제
-- deallocate prepare <실행 이름>;

-- use sqldb;
-- drop table if exists myTable;
-- create table myTable (id int auto_increment primary key, mDate datetime);

-- set @curDate = current_timestamp();

-- prepare myQuery from 'insert into myTable values(null, ?)';
-- execute myQuery using @curDate;
-- deallocate prepare myQuery;

-- select * from myTable;





# db 만들기
-- create database tabledb;

-- create table `tabledb`.`buytbl` (
-- `num` int not null auto_increment,
-- `userid` char(8) not null,
-- `prodName` char(6) not null,
-- `groupName` char(4) null,
-- `price` int not null,
-- `amount` smallint not null,
-- primary key (`num`),
-- foreign key (`userid`) references usertbl(userid)
-- );


-- use tabledb;
-- drop table if exists buytbl, usertbl;
-- create table usertbl (
-- userID char(8) not null primary key,
-- name varchar(10) not null,
-- birthYear int not null,
-- addr char(2) not null,
-- mobile1 char(3) null,
-- mobile2 char(8) null,
-- height smallint null,
-- mDate date null
-- );

-- create table buytbl (
-- num int auto_increment not null primary key,
-- userID char(8) not null,
-- pordName char(6) not null,
-- groupName char(4) null,
-- price int not null,
-- amount smallint not null,
-- foreign key (userID) references usertbl(userID)
-- );

-- insert into usertbl values 
-- ('LSG', '이승기', 1987, '서울', '011', '1111111', 182, '2008-8-8'), 
-- ('KBS', '김범수', 1979, '경남', '011', '2222222', 173, '2012-4-4'), 
-- ('KKH', '김경호', 1971, '전남', '019', '3333333', 177, '2007-7-7'), 
-- ('JYP', '조용필', 1950, '경기', '011', '4444444', 166, '2009-4-4'), 
-- ('SSK', '성시경', 1979, '서울', NULL, NULL, 186, '2013-12-12'), 
-- ('LJB', '임재범', 1963, '서울', '016', '6666666', 182, '2009-9-9'), 
-- ('YJS', '윤종신', 1969, '경남', NULL, NULL, 170, '2005-5-5'), 
-- ('EJW', '은지원', 1972, '경북', '011', '8888888', 174, '2014-3-3'), 
-- ('JKW', '조관우', 1965, '경기', '018', '9999999', 172, '2010-10-10'), 
-- ('BBK', '바비킴', 1973, '서울', '010', '0000000', 176, '2013-5-5');

-- insert into buytbl values
-- (NULL, 'KBS', '운동화', NULL, 30, 2), 
-- (NULL, 'KBS', '노트북', '전자', 1000, 1), 
-- (NULL, 'JYP', '모니터', '전자', 200, 1), 
-- (NULL, 'JYP', '모니터', '전자', 200,  1), 
-- (NULL, 'BBK', '모니터', '전자', 200,  5), 
-- (NULL, 'KBS', '청바지', '의류', 50,   3), 
-- (NULL, 'BBK', '메모리', '전자', 80,  10), 
-- (NULL, 'SSK', '책'    , '서적', 15,   5), 
-- (NULL, 'EJW', '책'    , '서적', 15,   2), 
-- (NULL, 'EJW', '청바지', '의류', 50,   1), 
-- (NULL, 'BBK', '운동화', NULL   , 30,   2), 
-- (NULL, 'EJW', '책'    , '서적', 15,   1), 
-- (NULL, 'BBK', '운동화', NULL   , 30,   2);


# 아래처럼 입력 시 에러발생 - 처음 buytbl의 userid가 jyp일때 usertbl의 userid에서 jyp가 없음 (fk 에러)
-- INSERT INTO usertbl VALUES('LSG', '이승기', 1987, '서울', '011', '1111111', 182, '2008-8-8');
-- INSERT INTO usertbl VALUES('KBS', '김범수', 1979, '경남', '011', '2222222', 173, '2012-4-4');
-- INSERT INTO usertbl VALUES('KKH', '김경호', 1971, '전남', '019', '3333333', 177, '2007-7-7');
-- INSERT INTO buytbl VALUES(NULL, 'KBS', '운동화', NULL, 30, 2);
-- INSERT INTO buytbl VALUES(NULL, 'KBS', '노트북', '전자', 1000, 1);
-- INSERT INTO buytbl VALUES(NULL, 'JYP', '모니터', '전자', 200, 1);


# 제약조건 - 무결성
-- describe usertbl;


# 2개를 합쳐서 primary key로 만드는 경우
-- CONSTRAINT PRIMARY KEY PK_usertbl_userID (userID, userName)





# FOREIGN KEY(외래키) 제약 조건
-- 두 테이블 사이의 관계를 선언함으로써 데이터의 무결성을 보장
-- 외래키 테이블이 참조하는 기준 테이블의 열은 반드시 Primary Key거나 Unique 제약 조건이 설정되어야 함





# 제약조건 - CONSTRAINT 
# check 제약조건

-- create table usertbl2 (
-- userID char(8) primary key, 
-- name varchar(10), 
-- birthYear int check (birthYear >= 1900 and birthYear <= 2023),
-- mobile1 char(3) null,
-- constraint ck_name  check (name is not null)
-- );

-- alter table usertbl2
-- 	add constraint ck_mobile1 check (mobile1 in ('010', '011', '016', '017', '018', '019'));



# default - 값을 입력하지 않으면 자동으로 입력됨

-- create table usertbl3 (
-- userID char(8) not null primary key, 
-- name varchar(10) not null,
-- birthYear int not null default -1,
-- addr char(2) not null default '서울',
-- mobile1 char(3) null,
-- mobile2 char(8) null,
-- height smallint null default 170,
-- mDate date null
-- );

# 이미 사용중인 테이블에 default 걸기
-- alter table usertbl3
-- 	alter column birthYear set default -1;
-- alter table usertbl3
-- 	alter column addr set default '한국';

# default 문은 default로 설정된 값을 자동입력
-- insert into usertbl3 values ('LHL', '이혜리', default, default, '011', '1234567', default, '2023-11-02');
# 열이름이 명시되지 않으면 default로 설정된 값을 자동입력
-- insert into usertbl3 (userID, name) values ('KAY', '김아영');
# 값이 직접 명기되면 default로 설정된 값은 무시
-- insert into usertbl3 values ('WB', '원빈', 1982, '대전', '019', '9876543', 176, '2020-02-20');



# 제약조건의 종류
-- primary key
-- foreign key
-- unique
-- default
-- check
-- null 값의 허용여부


# unique와 primary key의 비교
-- 공통점 : 중복 불가
-- 차이점 : null 가능 여부 (unique - null 가능, primary key - not null)
-- 			개인 휴대폰 번호같은 경우 번호가 없거나 중복이 없으므로 unique 속성이 걸리는 경우가 있다.

-- 참고) null과 0은 완전히 다른 데이터 / null은 데이터 자체가 비어있음




# 데이터 압축
-- row_format=compressed  # 지금은 거의 사용 x

-- CREATE DATABASE IF NOT EXISTS compressDB;
-- USE compressDB;
-- CREATE TABLE normalTBL( emp_no int , first_name varchar(14));
-- CREATE TABLE compressTBL( emp_no int , first_name varchar(14))
--   ROW_FORMAT=COMPRESSED;

-- INSERT INTO normalTbl 
--      SELECT emp_no, first_name FROM employees.employees;   
-- INSERT INTO compressTBL 
--      SELECT emp_no, first_name FROM employees.employees;

-- SHOW TABLE STATUS FROM compressDB;
# 확인시 data_length 차이 발생



# 임시 테이블
-- create temporary table 테이블이름



# 열 추가
-- use tabledb;
-- alter table usertbl
-- 	add fhomepage varchar(30)
-- 	default 'http://www.hanbit.co.kr' null first; # null 허용, 제일 앞에 열 추가


# 열 삭제
-- alter table usertbl
-- 	drop column mobile1;


# 테이블 삭제
-- drop table 테이블 이름


# 테이블 수정
# 열 이름, 데이터 형식 변경
-- alter table usertbl
-- 	change column name uName varchar(20) null;
    
    
# 참고만
-- 기본 키 삭제
-- ALTER TABLE usertbl
--   DROP PRIMARY KEY;
-- 제약 조건이 걸려있으면 삭제 불가능
-- 따라서 외래 키를 제거 후 기본키를 삭제해야 함
-- ALTER TABLE buytbl
--   DROP FOREIGN KEY buytbl_ibfk_1;


# 실습

-- use tabledb;
-- drop table if exists buytbl, usertbl;

# 제약 없는 기본값
-- create table usertbl (
-- userID char(8),
-- name varchar(10),
-- birthYear int,
-- addr char(2), 
-- mobile1 char(3),
-- mobile2 char(8),
-- height smallint, 
-- mDate date
-- );

# 제약 없는 기본값, num만 자동 생성
-- create table buytbl (
-- num int auto_increment primary key,
-- userID char(8),
-- prodName char(6),
-- groupName char(4),
-- price int, 
-- amount smallint
-- );

-- insert into usertbl values
-- ('LSG', '이승기', 1987, '서울', '011', '1111111', 182, '2008-8-8'), 
-- ('KBS', '김범수', NULL, '경남', '011', '2222222', 173, '2012-4-4'), # 김범수씨 생년을 모름
-- ('KKH', '김경호', 1871, '전남', '019', '3333333', 177, '2007-7-7'), # 김경호씨 생년을 잘못 입력
-- ('JYP', '조용필', 1950, '경기', '011', '4444444', 166, '2009-4-4');

-- insert into buytbl values
-- (NULL, 'KBS', '운동화', NULL , 30,   2), 
-- (NULL,'KBS', '노트북', '전자', 1000, 1), 
-- (NULL,'JYP', '모니터', '전자', 200,  1), 
-- (NULL,'BBK', '모니터', '전자', 200,  5); # BBK는 회원이 아님

-- alter table usertbl
-- 	add constraint pk_usertbl_userID
--     primary key (userID);
    
# 확인
-- desc usertbl;
-- desc buytbl;

# buytbl 테이블의 userID를 usertbl의 userID 를 참조하여 외래키로 지정
-- alter table buytbl
--  add constraint fk_usertbl_buytbl
--  foreign key (userID) references usertbl (userID);
 # 오류 발생(기존 유저tbl에 ID는 BBK가 없기 때문에)
 
 # 아이디가 없는데 구매한 BBK 삭제
--  delete from buytbl where userID = "BBK";
 
 # 외래키 재지정
--  alter table buytbl
-- 	add constraint fk_usertbl_buytbl
--     foreign key (userID) references usertbl (userID);

# 오류 발생 (BBK 아이디가 없어서)
-- insert into buytbl values (NULL,'BBK', '모니터', '전자', 200,  5);

# 외래키 지정하려면 다 삭제하고 다시 넣는건 불가능하므로
# 외래키를 잠시 비활성화(0)하고 데이터 넣고 다시 활성화(1)
-- set foreign_key_checks = 0;
-- insert into buytbl values 
-- (NULL, 'BBK', '모니터', '전자', 200,  5), 
-- (NULL, 'KBS', '청바지', '의류', 50,   3), 
-- (NULL, 'BBK', '메모리', '전자', 80,  10), 
-- (NULL, 'SSK', '책'    , '서적', 15,   5), 
-- (NULL, 'EJW', '책'    , '서적', 15,   2), 
-- (NULL, 'EJW', '청바지', '의류', 50,   1), 
-- (NULL, 'BBK', '운동화', NULL   , 30,   2), 
-- (NULL, 'EJW', '책'    , '서적', 15,   1), 
-- (NULL, 'BBK', '운동화', NULL   , 30,   2);
-- set foreign_key_checks = 1;


# 체크 제약 조건으로 범위 설정
-- alter table usertbl
-- 	add constraint ck_birthYear
--     check ((birthYear >= 1900 and birthYear <= 2023) and (birthYear is not null));
# 오류 발생 - 1871년생이 있어서, null도 존재

# 오류 수정
-- update usertbl set birthYear=1979 where userID = 'KBS';
-- update usertbl set birthYear=1971 where userID = 'KKH';

# 체크 제약조건 오류 없이 실행
-- alter table usertbl
-- 	add constraint ck_birthYear
--     check ((birthYear >= 1900 and birthYear <= 2023) and (birthYear is not null));

# 체크 제약조건으로 2999년이라 입력이 안됨
-- insert into usertbl values ('TKV', '태권뷔', 2999, '우주', NULL  , NULL , 186, '2023-12-12');

# 정상적으로 구성된 테이블 만들기
-- insert into usertbl values
-- ('SSK', '성시경', 1979, '서울', NULL  , NULL , 186, '2013-12-12'), 
-- ('LJB', '임재범', 1963, '서울', '016', '6666666', 182, '2009-9-9'), 
-- ('YJS', '윤종신', 1969, '경남', NULL  , NULL , 170, '2005-5-5'), 
-- ('EJW', '은지원', 1972, '경북', '011', '8888888', 174, '2014-3-3'), 
-- ('JKW', '조관우', 1965, '경기', '018', '9999999', 172, '2010-10-10'), 
-- ('BBK', '바비킴', 1973, '서울', '010', '0000000', 176, '2013-5-5');

# id가 잘못되어서 바꾸려고함
-- update usertbl set userID = 'VVK' where userID='BBK';
# 오류 발생 - fk, pk가 발동되어 있어서 

# fk 비활성화 
-- set foreign_key_checks = 0;
-- update usertbl set userID = 'VVK' where userID='BBK';

# fk 활성화
-- set foreign_key_checks = 1;


# 구매와 유저 테이블 조인 -> 8건
-- select B.userID, U.name, B.prodName, U.addr, concat(U.mobile1, U.mobile2) as '연락처' from buytbl B
-- inner join usertbl U
-- on B.userID = U.userID;

# 구매 테이블 - 12건 -> 조인해서 4개가 사라진 이유 : usertbl의 userID 'BBK'가 'VVK'로 변경되었지만 buytbl의 userID는 'BBK' 그대로

# outer join으로 확인 -> buytbl의 userID가 'BBK'인 경우 usertbl과 연결된게 없음
-- select B.userID, U.name, B.prodName, U.addr, concat(U.mobile1, U.mobile2) as '연락처' from buytbl B
-- left outer join usertbl U
-- on B.userID = U.userID
-- order by B.userID;

# fk 잠시 끄고 userID 바꾸기
-- set foreign_key_checks = 0;
-- update usertbl set userID = 'BBK' where userID = 'VVK';
-- set foreign_key_checks = 1;

# 원상 복귀를 위해 잠시 끊음
-- alter table buytbl
-- 	drop foreign key fk_usertbl_buytbl;

# pk가 바뀌면서 fk도 바뀌게 설정
-- alter table buytbl
-- 	add constraint fk_usertbl_buytbl
--     foreign key (userID) references usertbl (userID)
--     on update cascade;	# 이 부분에서 적용

# 바뀌면 따라 바뀌는지 확인
-- update usertbl set userID = 'VVK' where userID = 'BBK';

-- select B.userID, U.name, B.prodName, U.addr, concat(U.mobile1, U.mobile2) as '연락처' from buytbl B
-- inner join usertbl U
-- on B.userID = U.userID
-- order by B.userID;

# 회원 탈퇴하면 오류발생 - fk가 설정되어 있어서
-- delete from usertbl where userID = 'VVK';

# 다시 초기화
-- alter table buytbl
-- drop foreign key fk_usertbl_buytbl;

# 같이 삭제되게 하기
-- alter table buytbl
-- add constraint fk_usertbl_buytbl
-- foreign key (userID) references usertbl (userID)
-- on update cascade
-- on delete cascade;

# 잘 삭제됨
-- delete from usertbl where userID = 'VVK';

# 체크 조건 삭제는 문제 없음
# 결론 : fk, pk는 삭제, 수정시 영향을 미치기 때문에 on cascade를 적절히 사용해야함
-- alter table usertbl
-- 	drop column birthYear;




# 뷰

-- use tabledb;
-- create view v_usertbl
-- as select userID, name, addr from usertbl;


# 뷰 실습

-- use sqldb;

# 뷰 생성
-- create view v_userbuytbl
-- as 
-- 	select U.userID as 'USER ID', U.name as 'USER NAME', B.prodName as 'PRODUCT NAME', U.addr, concat(U.mobile1, U.mobile2) as 'MOBILE PHONE' from usertbl U
--     inner join buytbl B
--     on U.userID = B.userID;

# 뷰 조회
-- select `USER ID`, `USER NAME` from v_userbuytbl; # 주의! 따옴포(')가 아닌 백틱(`) 사용한다.

# 뷰 수정
-- alter view v_userbuytbl
-- as 
-- 	select U.userID as '사용자 아이디', U.name as '이름', B.prodName as '제품 이름', U.addr, concat(U.mobile1, U.mobile2) as '전화번호' from usertbl U
--     inner join buytbl B
--     on U.userID = B.userID;
    
# 한글이름은 추천 x
-- select `이름`, `전화번호` from v_userbuytbl;

# 뷰 삭제
-- drop view v_userbuytbl;

# 기존에 view가 존재하면 덮어씀 (오류를 더 줄임)
-- create or replace view v_userbuytbl
-- as 
-- 	select userID, name, addr from usertbl;
    
# 뷰 테이블 조회
-- desc v_userbuytbl;
-- describe v_userbuytbl;

# 뷰를 어떻게 생성했는지 쿼리 자세히 보기
-- show create view v_userbuytbl;

-- select * from v_userbuytbl;
# 뷰에서 값 바꾸기
-- update v_userbuytbl set addr = '부산' where userID = 'JKW';
# 변경확인
-- select * from v_userbuytbl;



-- ----------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ----------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ----------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ----------------------------------------------------------------------------------------------------------------------------------------------------------------

-- 오류 발생 -> 원본 Table에 특정 칼럼이 NOT NULL이 설정되어 있기 때문에
-- INSERT INTO v_usertbl(userid, name, addr) VALUES('KBM','김병만','충북') ;
-- 해결방법: 원본 테이블의 칼럼들을 NOT NULL 설정 해제
-- 해결방법의 문제점: 데이터 원본의 구조를 바꾸기 때문에 비추천
-- 왠만하면 데이터 삽입은 불가능!


-- 총액에 대한 그룹화
-- CREATE VIEW v_sum
-- AS
-- 	SELECT userid AS 'userid', SUM(price*amount) AS 'total'  
-- 	   FROM buytbl GROUP BY userid;

-- SELECT * FROM v_sum;

-- VIEWS의 스키마 보기
-- SELECT * FROM INFORMATION_SCHEMA.VIEWS
--      WHERE TABLE_SCHEMA = 'sqldb' AND TABLE_NAME = 'v_sum';
-- IsUpdatable이 No로 확인

-- 177이상인 사람의 VIEW 생성
-- CREATE VIEW v_height177
-- AS
-- 	SELECT * FROM usertbl WHERE height >= 177 ;

-- VIEW 조회
-- SELECT * FROM v_height177 ;

-- VIEW에서 177이하인 사람 삭제
-- DELETE FROM v_height177 WHERE height < 177 ;
-- VIEW에 변화가 없음

-- VIEW에서 177이하인 사람 삽입
-- INSERT INTO v_height177 VALUES('KBM', '김병만', 1977 , '경기', '010', '5555555', 158, '2023-01-01') ;
-- VIEW에 변화가 없음(조건이 만족하지 않아서 자동으로 입력 안함)

-- CHECK OPTION을 확인하고 VIEW에 넣으세요
-- ALTER VIEW v_height177
-- AS
-- 	SELECT * FROM usertbl WHERE height >= 177
-- 	    WITH CHECK OPTION ;

-- 155인 사람의 키를 넣으면 
-- INSERT INTO v_height177 VALUES('WDT', '서장훈', 2006 , '서울', '010', '3333333', 155, '2023-3-3') ;

-- 2개 이상의 테이블을 합친 뷰를 복합뷰라고 함
-- CREATE VIEW v_userbuytbl
-- AS
--   SELECT U.userid, U.name, B.prodName, U.addr, CONCAT(U.mobile1, U.mobile2) AS mobile
--    FROM usertbl U
--       INNER JOIN buytbl B
--          ON U.userid = B.userid ;

-- 복합뷰는 삽입 불가
-- INSERT INTO v_userbuytbl VALUES('PKL','박경리','운동화','경기','00000000000','2023-2-2');

-- VIEW가 살아있어도 원본 테이블을 지울 수 있음
-- DROP TABLE IF EXISTS buytbl, usertbl;

-- 원본 테이블을 지우면 VIEW는 조회가 안됨
-- SELECT * FROM v_userbuytbl;

-- VIEW 테이블들에 대한 정보 보기
-- CHECK TABLE v_userbuytbl;

-- -----------------------------------------------------------------------------------------------------------------------------------------------------------------
-- -----------------------------------------------------------------------------------------------------------------------------------------------------------------
-- -----------------------------------------------------------------------------------------------------------------------------------------------------------------
-- -----------------------------------------------------------------------------------------------------------------------------------------------------------------


-- use sakila;
-- select * from language;
-- select * from sakila.language where name = 'English';
-- select actor_id, first_name from actor where actor_id = '4';
-- select city from city where city_id < 5;
-- select language_id, name from sakila.language where language_id <> 2; # language_id가 2인 경우 제외
-- select first_name from actor where first_name < 'B'; # 첫글자가 B 미만 (= A 인경우)
-- select title from film where title like '%family%'; # family 들어간 모든 title    # % -> 0개 이상의 문자열
-- select title, actors from film_list where actors like 'NAT_%'; # _ -> 하나의 문자
-- select title from film where title like '%day%';
-- select rating, category, title from film_list where category like 'sci-Fi' and rating like 'PG'; 
-- select * from sakila.city where city_id =3 or city_id = 4 and country_id = 60;
-- select * from sakila.city where country_id = 60 and city_id = 3 or city_id = 4; # 괄호를 쓰자
-- select language_id, name from sakila.language where not (language_id = 2);
-- select fid, title from film_list where FID < 7 and not (FID = 4 or FID =6);
-- select * from film_list where price between 2 and 4  			# price = 2와 4 사이 
-- 	and (category like 'Documentary' or category like 'Horror') 	# category = Documentary 또는 Horror 
-- 	and actors like '%BOB%';										# actors = BOB 라는 이름 있을것
-- select name from customer_list order by name limit 10;
-- select address, last_update from address order by last_update limit 5; # order by 뒤에 asc, desc 없는 경우 기본값은 asc
-- select address, last_update from address order by district, address limit 30; # order by 뒤에 두개면 첫번째 내용을 기준으로 정렬하고 같은 값이면 두번째 내용으로 정렬
-- select id, name from customer_list order by id limit 10; 			# 1 ~ 10
-- select id, name from customer_list order by id limit 10 offset 5; 	# 6 ~ 15 -> offset : 어디부터 가져올지
-- select id, name from customer_list order by id limit 5 ,10; 			# 6 ~ 15 -> 6번째부터 10개

-- select city, country from city inner join country
-- on city.country_id = country.country_id
-- where country.country_id < 5 order by country, city;

-- select count(1) from city inner join country
-- on city.country_id = country.country_id
-- where country.country_id = 49 order by country, city;

-- select max(language_id) from language;
-- insert into language values (null, 'Portuguese', now());
-- insert into language values (8, 'Russian', '2020-09-26 10:35:00');
-- select * from language;

-- insert into language values (8, 'Arabic', '2020-09-26 10:35:00');  # 에러
-- insert ignore into language values (8, 'Arabic', '2020-09-26 10:35:00');  # 에러 무시하고 넣을 수 있음 / 단, 데이터 망함

-- select first_name, last_name, customer.customer_id, amount, payment_date from payment inner join customer
-- on customer.customer_id=payment.customer_id
-- where first_name like 'Mary' and last_name like 'Smith';

-- delete from payment order by customer_id limit 10000; # 10000 까지 삭제

# drop, truncate, delete 차이
-- drop : 테이블 자체를 지움
-- truncate : 테이블은 유지하되 row 한번에 지움
-- delete : 테이블은 유지하되 row 하나씩 지움

-- update payment set amount=amount*1.1;
-- update payment set last_update=now();

-- create database if not exists lucy;
-- use lucy;