# 데이터베이스 목록
-- show databases;
# 테이블 상세보기
-- show table status;

# 해당 table의 field 타입을 보여주세요 (bold 처리된 데이터베이스에서)
# describe table_name;
-- describe employees;
# desc table_name;
-- desc employees;



-- drop database if exists sqldb; # sqldb가 존재하면 삭제
-- create database sqldb;

-- use sqldb;
-- create table usertbl (
-- userID char(8) not null primary key, # 사용자 아이디 (pk)
-- name varchar(10) not null, # 이름
-- birthYear int not null, # 출생년도
-- addr char(2) not null, # 지역 (서울, 부산, 경남 등 두글자로)
-- mobile1 char(3), # 휴대폰 국번(010, 011, 016 등)
-- mobile2 char(8), # 휴대폰 나머지 번호 (하이픈 제외)
-- height smallint, # 키
-- mDate date # 회원 가입일
-- );

-- create table buytbl (
-- num int auto_increment not null primary key, # 순번 (pk)
-- userID char(8) not null, # 아이디 (fk)
-- prodName char(6) not null, # 물품명
-- groupName char(4), # 분류
-- price int not null, # 단가
-- amount int not null, # 수량
-- foreign key (userID) references usertbl (userID)
-- );


-- insert into usertbl values ('LSG', '이승기', 1987, '서울', '011', '11111111', 182, '2008-8-8');
-- insert into usertbl values ('KBS', '김범수', 1979, '경남', '011', '22222222', 173, '2012-4-4');
-- insert into usertbl values ('KKH', '김경호', 1971, '전남', '019', '33333333', 177, '2007-7-7');
-- insert into usertbl values ('JYP', '조용필', 1950, '경기', '011', '44444444', 166, '2009-4-4');
-- insert into usertbl values ('SSK', '성시경', 1979, '서울', null, null, 186, '2013-12-12');
-- insert into usertbl values ('LJB', '임재범', 1963, '서울', '016', '66666666', 182, '2009-9-9');
-- insert into usertbl values ('YJS', '윤종신', 1969, '경남', null, null, 170, '2005-5-5');
-- insert into usertbl values ('EJW', '은지원', 1972, '경북', '011', '88888888', 174, '2014-3-3');
-- insert into usertbl values ('JKW', '조관우', 1965, '경기', '018', '99999999', 172, '2010-10-10');
-- insert into usertbl values ('BBK', '바비킴', 1973, '서울', '010', '00000000', 176, '2013-5-5');


-- insert into buytbl values (null, 'KBS', '운동화', null, 30, 2);
-- insert into buytbl values (null, 'KBS', '노트북', '전자', 1000, 1);
-- insert into buytbl values (null, 'JYP', '모니터', '전자', 200, 1);
-- insert into buytbl values (null, 'BBK', '모니터', '전자', 200, 5);
-- insert into buytbl values (null, 'KBS', '청바지', '의류', 50, 3);
-- insert into buytbl values (null, 'BBK', '메모리', '전자', 80, 10);
-- insert into buytbl values (null, 'SSK', '책', '서적', 15, 5);
-- insert into buytbl values (null, 'EJW', '책', '서적', 15, 2);
-- insert into buytbl values (null, 'EJW', '청바지', '의류', 50, 1);
-- insert into buytbl values (null, 'BBK', '운동화', null, 30, 2);
-- insert into buytbl values (null, 'EJW', '책', '서적', 15, 1);
-- insert into buytbl values (null, 'BBK', '운동화', null, 30, 2);

-- select * from buytbl;
-- select * from usertbl;

# where절 - 특정한 조건만 조회
-- use sqldb;
-- select * from usertbl where name = '김경호';
-- select userID, name from usertbl where birthYear >= 1970 and heigth >= 182;
-- select userID, name from usertbl where birthYear >= 1970 or heigth >= 182;

# between ~ and ~
-- select userID, name from usertbl where height >= 180 and height <= 183;
-- select userID, name from usertbl where height between 180 and 183;

# in() - 같은 속성끼리
-- select name, height from usertbl where addr = '경남' or addr = '전남' or addr = '경북';
-- select name, height from usertbl where addr in ('경남', '전남', '경북');

# like
-- select name, height from usertbl where name like '김%';
-- select name, height from usertbl where name like '_종신';
# %, _는 와일드카드 문자
# %는 0개 이상의 문자
# _는 하나의 문자

# SubQuery
-- select name, height from usertbl where height > (select height from usertbl where name = '김경호');
-- select name, birthYear from usertbl where birthYear > (select birthYear from usertbl where name = '김경호');
-- select name, mDate from usertbl where mDate < (select mDate from usertbl where name = '김경호');

# subQuery가 2건인 경우 - 에러
-- select name, height from usertbl where height > (select height from usertbl where addr = '경남');
# (select height from usertbl where addr = '경남');에서 height는 170과 173이 나오므로 비교 불가, 에러 발생

# any 사용 - 조건 아무거나 만족
-- select name, height from usertbl where height > any (select height from usertbl where addr = '경남');
# 두 조건 중 하나라도 만족하면 되므로 170보다 클때
-- select * from usertbl where height > any (select height from usertbl where addr = '경남' or name = '바비킴');
# 경남에서 170, 173 이고 바비킴 176 이므로 170보다 크면 전부 출력

# all 사용 - 조건 모두 만족
-- select name, height from usertbl where height > all (select height from usertbl where addr = '경남');
# 두 조건 모두 만족해야 하므로 173보다 클때
-- select * from usertbl where height > all (select height from usertbl where addr = '경남' or name = '바비킴');
# 경남에서 170, 173 이고 바비킴 176 이므로 176보다 크면 전부 출력

-- select name, mDate from usertbl order by mDate; # 기본값이 오름차순(asc)
-- select name, mDate from usertbl order by mDate desc; # 내림차순
-- select name, mDate, height from usertbl order by height desc, mDate asc; # 먼저 정렬한것(height 내림차순)으로 적용, 같은 키면 mDate를 오름차순에 맞춰 정렬
-- select name, mDate, height from usertbl order by height desc, mDate desc;

# 한글도 오름차순, 내림차순 가능
-- select addr from usertbl order by addr;

# distinct - 중복 제거하고 확인
-- select distinct addr from usertbl;
-- select distinct height, addr from usertbl; # height만 distinct 적용

# limit - 출력 개수 제한
-- use employees;
-- select emp_no, hire_date from employees # 테이블, 컬럼 열람
-- 	order by hire_date asc # 비교 대상
-- 	limit 0, 5; # 0번째부터 5개  # 기타조건(사바사)


# 테이블 복사하기 - 테이블 정보 + 데이터까지 복사
-- use sqldb;
-- create table buytbl2 (select * from buytbl);
-- select * from buytbl2;

# buytbl에서 userID, prodName 가져와서 buytbl3 생성
-- use sqldb;
-- create table buytbl3 (select userID, prodName from buytbl);
-- select * from buytbl3;


# group by
-- use sqldb;
-- select userID, amount from buytbl order by userID;
# userID 당 구매 갯수 총 합
-- select userID, sum(amount) from buytbl group by userID;
# userID 주문 하나 당 평균 구매 개수
-- select userID, avg(amount) from buytbl group by userID;
# userID 당 총 구매 금액
-- select userID as '사용자 아이디', sum(price*amount) as '총 구매 금액' from buytbl group by userID;
# userID 당 총 구매 개수
-- select userID as '사용자 아이디', sum(amount) as '총 구매 개수' from buytbl group by userID;

# group by 와 자주 사용
# avg() - 평균
# min() - 최솟값
# max() - 최댓값
# count() - 행의 갯수
# count(distinct) - 행의 갯수(중복은 1개로)
# stdev() - 표준편차
# var_samp() - 분산

# quiz : buytbl 상에서 amount 값의 평균을 출력 - '평균 구매 개수'라고 나오게
-- select avg(amount) as '평균 구매 개수' from buytbl;

# userID당 평균 구매 개수
-- select userID, avg(amount) from buytbl group by userID;


# 가장 큰 사람과 가장 작은 사람의 이름과 키 출력
-- select name, height from usertbl # 이름과 키 출력
-- where height = (select max(height) from usertbl where height) # 키가 가장 큰 사람
-- or height = (select min(height) from usertbl where height); # 키가 가장 작은 사람

# max(height), min(height)만 출력
-- select max(height), min(height) from usertbl;

-- select name, mDate from usertbl where mDate = (select max(mDate) from usertbl where mDate) or mDate = (select min(mDate) from usertbl where mDate);
-- select name, birthYear from usertbl where birthYear = (select max(birthYear) from usertbl where birthYear) or birthYear = (select min(birthYear) from usertbl where birthYear);

-- select count(*) from usertbl; # 10
-- select count(mobile1) from usertbl; # 8 (null 제외)

# having 절 - group by 뒤에 나옴
-- select userID, sum(price*amount) from buytbl group by userID having sum(price*amount) > 1000; # 총 매출 1000 보다 큰 고객 출력

# rollup - 중간합계나 총합 - 분류별로 중간합계 후 마지막에 총합 
-- select num, groupName, sum(price*amount) from buytbl group by groupName, num with rollup;


# quiz
-- select groupName, sum(price*amount) from buytbl group by groupName with rollup;


# DML - 데이터 조작언어
-- 쿼리문 날려서 데이터 이용

# DDL - 데이터 정의언어
-- 데이터 추가, 삭제

# DCL - 데이터 제어언어
-- 권한 부여, 박탈



# insert문
-- use sqldb;
-- create table testtbl (id int, username char(3), age int);

# 모든 값을 다 넣을 때
-- insert into testtbl values (1, '홍길동', 25);

# 특정 값만 넣을 때
-- insert into testtbl (id, username) values (2, '설현');

# 순서를 바꿔서 넣을 때 - 컬럼명과 데이터 명시 필요
-- insert into testtbl (username, id, age) values ('삼이', 3, 26);

-- select * from testtbl;



# auto_increment
-- use sqldb;
-- create table testtbl2 (
-- id int auto_increment primary key,
-- username char(3),
-- age int
-- );

-- insert into testtbl2 values (null, '지민', 25);
-- insert into testtbl2 values (null, '유나', 22);
-- insert into testtbl2 values (null, '유경', 21);
-- select * from testtbl2; # id 값이 1부터 1씩 증가 - auto_increment

# id값을 1000부터 3씩 증가하게 하려면
-- create table testtbl3 (
-- id int auto_increment primary key,
-- username char(3),
-- age int
-- );

# 처음 시작값 1000으로 설정
-- alter table testtbl3 auto_increment=1000;

# 증가값을 3으로 설정
-- set @@auto_increment_increment=3 # auto_increment의 increment를 3으로 설정

-- insert into testtbl3 values (null, '나연', 20);
-- insert into testtbl3 values (null, '정연', 18);
-- insert into testtbl3 values (null, '모모', 19);
-- select * from testtbl3; # id가 1000, 1003, 1006인 것 확인


# testtbl4를 만들고 id, fname, lname에 employees.employees의 emp_no, first_name, last_name을 넣는다
-- use sqldb;
-- create table testtbl4 (
-- id int,
-- fname varchar(50),
-- lname varchar(50)
-- );
-- insert into testtbl4 select emp_no, first_name, last_name from employees.employees;


# 한줄로 만들기
-- create table testtbl5 (select emp_no, first_name, last_name from employees.employees);


# testtbl4에서 fname이 kyoichi라는 이름이 있으면 그사람의 lname을 "없음" 이라고 바꾸기 
-- use sqldb;
-- update testtbl4 set lname = '없음' where fname = 'kyoichi';
-- select * from testtbl4 where fname = 'kyoichi';


# quiz - buytbl안에 price 컬럼의 값들을 1.5배 인상 시키세요
-- use sqldb;
-- update buytbl set price = price * 1.5;
-- select * from buytbl;

# 30% 할인
-- use sqldb;
-- update buytbl set price = price * 0.7;
-- select * from buytbl;



# delete from
-- delete from testtbl4 where fname = 'Aamer' limit 5; # 위에서 5개만 삭제
-- select * from testtbl4 where fname = 'Aamer';
-- select * from testtbl5 where first_name = 'Aamer';


# quiz - employees 테이블 셋 내부의 employees 테이블의 모든 정보를 가져와서 sqldb 데이터셋 소속 bigtbl1 테이블을 생성해서 가져온 모든 정보를 복사
-- use sqldb;
-- create table bigtbl1 (select * from employees.employees);
-- select * from bigtbl1;


-- use sqldb;
-- create table bigtbl2 (select * from employees.employees);
-- create table bigtbl3 (select * from employees.employees);



# delete from - 한 행씩 삭제, 테이블은 남아있음
-- delete from bigtbl1;
# drop table - 테이블 자체를 삭제
-- drop table bigtbl2;
# truncate table - 테이블을 남기고 모든 행 삭제
-- truncate table bigtbl3;

# 속도 - drop > truncate > delete 인데 왜 drop이 truncate 보다 늦지
# 이론상 속도 - drop > truncate > delete




# cte(common table expression)문 - 기존의 쿼리에서 내용을 추가하면 쿼리가 너무 길어져서 가독성이 떨어진다. 
# 								  그래서 기존의 쿼리를 함수처럼 abc쿼리문 식으로 쿼리문을 어떤 단어로 지정하여 
# 								  아래 예시를 abc order by sum desc 이런 식으로 설정하여 가독성을 높이는 방법이다.
-- use sqldb;
-- select userID as 'userid', sum(price*amount) as 'total' from buytbl group by userID order by sum(price*amount) desc;

-- select * sum_tot order by sum(price*amount) desc 
# sum_tot = 아래 두줄
# use sqldb;
# select userID as 'userid', sum(price*amount) as 'total' from buytbl group by userID 

-- with sum_tot(userID, total) # sum_tot를 정의 
-- as # 뒷부분이 내용
-- (select userID, sum(price*amount) # sum_tot 내용
-- from buytbl group by userID)

-- select * from sum_tot order by total desc;




# quiz - sqldb안에 있는 usertbl에서 addr 기준으로 가장 큰 키를 뽑아주세요
# 위의 쿼리를  cte 스타일로 만들기 - 키 큰 순으로 정렬
-- select addr, max(height) from sqldb.usertbl group by addr;

# 내 풀이
-- with max_height(addr, maxHeight)
-- as
-- (select addr, max(height) from sqldb.usertbl group by addr)
-- select * from max_height order by maxHeight desc;


# 정답
-- WITH cte_tbl(addr, maxh)
-- AS
-- (SELECT addr, max(height)
-- FROM usertbl GROUP BY addr)

-- -- 결과
-- SELECT * FROM cte_tbl ORDER BY maxh DESC;