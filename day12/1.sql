-- create database lucy;

-- use lucy;

-- create database if not exists lucy; # warning - 이미 존재

-- use sakila;
-- select actor_id from actor;

# 컬럼명을 대소문자 구분옶션 설정 가능 -> lower_case_table_names -> 0이면 대소문자 구분, 1이면 시스템에서 전부 소문자로 변환해서 사용 (대소문자 구분 안해도 된다)
# 2면 테이블 값은 구분해서 저장하되 소문자로만 열람가능
# 윈도우즈는 기본값 1 
# 맥은 기본 2
# 리눅스는 2를 지원하지 않음, 보통 0으로 강제함 - 대소문자 구분해야한다.

-- select sakila.actor.actor_id from actor;

-- create database if not exists `lu;cy`; # 생성된다.

-- show databases like 'lu%';

-- show character set; # 현재 시스템에서 사용하고 있는 문자 종류

# charset과 collation
-- create database rose default character set utf8mb4
-- collate utf8mb4_ru_0900_as_cs;


-- use sqldb;
# 빅데이터 심화과정
-- create table  test_bigint (id bigint unsigned);
# bigint
-- insert into test_bigint values (12345678901234567890); # 20자리
-- insert into test_bigint values (12345678901234567890-1);
-- insert into test_bigint values (123456789012345678*100); # 첫번째 값보다 작지만 에러 - 계산 순간 수용범위 넘어섬


# boolean
-- create table test_bool (i bool);
-- insert into test_bool values (true), (false); # true = 1, false = 0
-- insert into test_bool values (1), (0), (-128), (127);
-- select i, if (i, 'true', 'false') from test_bool; # 0 제외 전부 true
# 그래서 while문 작성시 0 만들면 종료됨


# 데이터 입력시 유의사항
-- create table wage(monthly double);
-- insert into wage values (50000/12);
-- select * from wage;
-- select monthly*12 from wage; # 원상복구 안됨 - 49999.999999992004
-- select round(monthly*12, 5) from wage; # round 사용 반올림 (5번째 자리) - 50000 -> 1~7까지는 50000 나옴
-- select round(monthly*12, 8) from wage; # 49999.999999999(2004)


-- create table test_varchar_trailing (d varchar(2) unique);
-- insert into test_varchar_trailing values ('a'), ('a   '); # 두개는 다른 데이터 - 공백 포함
-- insert into test_varchar_trailing values ('a      '); # 에러 'a '와 'a      '는 같다. - 공백이 여러개여도 하나와 같음
-- select d, length(d) from test_varchar_trailing;


-- create table test_varchar_pad_collation (data varchar(5) character set latin1 collate latin1_bin unique);
-- insert into test_varchar_pad_collation values ('a');
-- insert into test_varchar_pad_collation values ('a '); # 지정된 charset에서 공백은 없는 것으로 생각


#################### 다시 확인 -  "2020/02/1", '2020/2/1' 사용시 해결
-- use sqldb;
-- drop table testdate;
-- create table testdate (mydate date);
-- insert into testdate values (2020/02/0); # 에러 - 날짜 형식 안맞음 (2월 0일 없음)
-- insert into testdate values (2020/02/1); # 정상
-- insert into testdate values (2020/02/31); # 에러 - 2월 31일 없음
-- insert into testdate values (2024/02/29); # 정상 - 윤년
-- insert into testdate values (2023/02/22);
-- select * from testdate;


# auto_increment
-- create table actor (
-- actor_id smallint unsigned not null auto_increment,
-- first_name varchar(45) not null,
-- last_name varchar(45) not null,
-- primary key (actor_id)
-- );
-- insert into actor values (null, 'Alexander', 'Kaidanovsky');
-- insert into actor values (null, 'Anatoly', 'Solonitsyn');
-- insert into actor values (null, 'Nikolai', 'Grinko');
-- select * from actor;

# sql의 특성
# delete 와 truncate의 차이
# delete로 unique 값을 지우면 다시 추가할때 건너뛰지만
# truncate로 지울경우 처음부터
-- create table count (counter int auto_increment key);
-- insert into count values (), (), (), (), (), ();
-- select * from count;
-- delete from count where counter > 4;
-- insert into count values (), (), (), (), (), ();

-- truncate table count;
-- insert into count values (), (), (), (), (), ();
-- select * from count;



# column aliases
-- select first_name as 'First Name', last_name as 'Last Name' from actor limit 5;


-- use sakila;
-- select concat(first_name, ' ', last_name, ' played in ', title) as movie from actor
-- join film_actor using (actor_id) join film using (film_id)
-- order by movie limit 20;

# as로 설정한 이름은 시스템에서는 모름 -> where first_name으로 사용해야한다.
-- select first_name as name from actor where name = 'ZERO';
-- select first_name as name from actor where first_name = 'ZERO';
-- select first_name name from actor where first_name = 'ZERO'; # 위와 출력이 같음 - as 생략가능


# table aliases - 테이블 앞에 영어 약자 붙여서 쿼리를 깔끔하게
-- select ac.actor_id, ac.first_name, ac.last_name, fl.title from actor as ac
-- inner join film_actor as fla using (actor_id)
-- inner join film as fl using (film_id)
-- where fl.title = 'AFFAIR PREJUDICE'; 	# join 할 때, 전체 데이터 컬럼으로 지정하지 않아도 된다.


-- select ac.actor_id, ac.first_name, ac.last_name, fl.title from actor as ac
-- inner join film_actor as fla using (actor_id)
-- inner join film as fl using (film_id)
-- where film.title = 'AFFAIR PREJUDICE'; # 에러 -> table as는 시스템에서 as만 인식 / column as 는 관계 없음


# distinct - 중복 내용 제거
-- select distinct first_name from actor join film_actor using (actor_id);
-- select first_name from actor join film_actor using (actor_id);



# join 사용할때 distinct 쓰지말것 - 내용이 바뀜
-- select first_name, last_name from actor join film_actor using (actor_id) limit 5;
-- select distinct first_name, last_name from actor join film_actor using (actor_id) limit 5;


# group by
-- select first_name from actor where first_name in ('GENE', 'Meryl') group by first_name;



-- select first_name, last_name, film_id from actor
-- inner join film_actor using (actor_id)
-- order by first_name, last_name limit 20;

# quiz - 위 쿼리문을 참조하여, 각 사람별로 영화 몇편 찍었는지 보여주기
-- select first_name, last_name, count(film_id) as 'num_films' from actor
-- inner join film_actor using (actor_id)
-- group by actor_id
-- order by num_films desc;


-- select first_name, last_name, count(film_id) as 'num_films' from actor
-- inner join film_actor using (actor_id)
-- group by first_name, last_name # susan davis - 두명이 하나로 출력됨
-- order by num_films desc;



-- select title, name as category_name, count(*) as cnt from film
-- inner join film_actor using (film_id)
-- inner join film_category using (film_id)
-- inner join category using (category_id)
-- group by film_id, category_id
-- order by cnt desc limit 5;


# count(*) -> 행의 수
-- select email, name as category_name, count(category_id) as cnt from customer cs
-- inner join inventory using (store_id)
-- inner join film_category using (film_id)
-- inner join category cat using (category_id)
-- group by customer_id, category_id
-- -- order by cnt desc limit 5;
-- order by cnt;


-- select count(*) from customer;
-- select count(email) from customer;
-- select userid, avg(price) from sqldb.buytbl group by userid;
-- select userid, max(price) from sqldb.buytbl group by userid;
-- select userid, min(price) from sqldb.buytbl group by userid;


# having -> where로 대체가능 / 위치 바뀜
-- select first_name, last_name, count(film_id) from actor
-- inner join film_actor using (actor_id)
-- -- where count(film_id) > 40	 # 에러 발생 - 컬럼을 묶었을 경우에는 WHERE 절에 조건을 넣어주면 안되고 having을 사용해야한다.
-- group by actor_id, first_name, last_name
-- having count(film_id) > 40						
-- order by count(film_id) desc;


# quiz - 아래 쿼리에서 having 대신 where를 사용
-- select first_name, last_name, count(film_id) as film_cnt from actor
-- inner join film_actor using (actor_id)
-- group by actor_id, first_name, last_name
-- having first_name = 'EMILY' and last_name = 'DEE';

# having 대신 where 사용
-- select first_name, last_name, count(film_id) as film_cnt from actor
-- inner join film_actor using (actor_id)
-- where first_name = 'EMILY' and last_name = 'DEE'
-- group by actor_id, first_name, last_name;




# join - 아래 3개의 쿼리문 모두 같은 결과 출력
-- select first_name, last_name, film_id from actor
-- inner join film_actor using (actor_id);

# inner join 없어도 같은 결과 출력
-- select first_name, last_name, film_id from actor, film_actor
-- where actor.actor_id = film_actor.actor_id;

# 3개의 쿼리 모두 같은 결과 출력
-- select first_name, last_name, film_id from actor
-- inner join film_actor on actor.actor_id = film_actor.actor_id;




# union - 합집합 (중복 제거)
-- select first_name from actor
-- union
-- 	select first_name from customer
-- union
-- 	select title from film;

# union all - 합집합 (중복 포함)
-- select first_name from actor where actor_id = 88
-- union all  # 2개 출력
-- -- union  # 1개 출력
-- 	select first_name from actor where actor_id = 169;


# 아래 쿼리와 같은 결과
-- (select first_name, last_name from actor where actor_id < 5)
-- union
-- (select first_name, last_name from actor where actor_id > 190)
-- order by first_name limit 4;

# 위의 쿼리와 같은 결과
-- select first_name, last_name from actor
-- where actor_id < 5 or actor_id > 190
-- order by first_name limit 4;



# quiz - 아래 쿼리문을 설명하시오
-- select title, rental_date from film
-- left join inventory using (film_id)
-- left join rental using (inventory_id);
############################################# 조인 위치에 따라 바뀌는 것 확인

-- # 이메일 기준으로 고객 및 카테고리별로 누가 얼마나 대여한지 상위 5개의 행 (상위 몇명이라고 하기엔 한 고객이 여러개의 카테고리에서 상위 5개일수도 있음)
-- select email, name as category_name, count(cat.category_id) as cnt from customer cs
-- inner join rental using (customer_id)
-- inner join inventory using (inventory_id)
-- inner join film_category using (film_id)
-- inner join category cat using (category_id)
-- group by email, category_name
-- order by cnt desc limit 30;

# 저 이메일 가진 사람이 각 카테고리별로 렌탈횟수
-- select email, name as category_name, count(category_id) as cnt from category cat
-- left join film_category using (category_id)
-- left join inventory using (film_id)
-- left join rental using (inventory_id)
-- join customer cs on rental.customer_id = cs.customer_id
-- where cs.email = 'WESLEY.BULL@sakilacustomer.org'
-- group by email, category_name
-- order by cnt desc;




-- select title, rental_date from rental
-- right join inventory using (inventory_id)
-- right join film using (film_id)
-- order by rental_date desc;



# manager 직급의 사람들의 입사일 중 가장 최근 입사일보다 더 빨리 입사한 assistant engineer 찾기
-- use employees;
-- select emp_no, first_name, last_name, hire_date from employees
-- join titles using (emp_no) 
-- where title = 'Assistant Engineer'
-- and hire_date < any 
-- (select hire_date from employees 
-- join titles using (emp_no) 
-- where title = 'Manager');

# 나눠서 확인
-- select emp_no, first_name, last_name, hire_date from employees
-- 	join titles using (emp_no) 
-- 	where title = 'Assistant Engineer'
-- 	and hire_date;
-- select hire_date from employees 
-- 	join titles using (emp_no) 
-- 	where title = 'Manager';


# 직급 오류 확인
-- select emp_no, first_name, last_name, title from employees
-- join titles using (emp_no)
-- where title = 'Manager'
-- and emp_no = any (select emp_no from employees
-- join titles using (emp_no)
-- where title <> 'Manager');

-- select emp_no, first_name, last_name from employees
-- join titles using (emp_no)
-- where title = 'Manager';

-- select emp_no, title from employees
-- join titles using (emp_no)
-- where title <> 'Manager'; # manager 아닌 경우만








-- use cosmetics;

-- drop table emp;
-- drop table dept;

-- CREATE TABLE DEPT (
-- DEPTNO int(10),
-- DNAME VARCHAR(14),
-- LOC VARCHAR(13) 
-- );

-- INSERT INTO DEPT VALUES (10, 'ACCOUNTING', 'NEW YORK');
-- INSERT INTO DEPT VALUES (20, 'RESEARCH', 'DALLAS');
-- INSERT INTO DEPT VALUES (30, 'SALES', 'CHICAGO');
-- INSERT INTO DEPT VALUES (40, 'OPERATIONS', 'BOSTON');

-- CREATE TABLE EMP (
--  EMPNO int(4) NOT NULL,
--  ENAME VARCHAR(10),
--  JOB VARCHAR(9),
--  MGR int(4) ,
--  HIREDATE DATE,
--  SAL int(7),
--  COMM int(7),
--  DEPTNO int(2) 
--  );

-- INSERT INTO EMP VALUES (7839,'KING','PRESIDENT', NULL,'81-11-17',5000, NULL,10);
-- INSERT INTO EMP VALUES (7698,'BLAKE','MANAGER',7839,'81-05-01',2850, NULL,30);
-- INSERT INTO EMP VALUES (7782,'CLARK','MANAGER',7839,'81-05-09',2450, NULL,10);
-- INSERT INTO EMP VALUES (7566,'JONES','MANAGER',7839,'81-04-01',2975, NULL,20);
-- INSERT INTO EMP VALUES (7654,'MARTIN','SALESMAN',7698,'81-09-10',1250,1400,30);
-- INSERT INTO EMP VALUES (7499,'ALLEN','SALESMAN',7698,'81-02-11',1600,300,30);
-- INSERT INTO EMP VALUES (7844,'TURNER','SALESMAN',7698,'81-08-21',1500,0,30);
-- INSERT INTO EMP VALUES (7900,'JAMES','CLERK',7698,'81-12-11',950, NULL,30);
-- INSERT INTO EMP VALUES (7521,'WARD','SALESMAN',7698,'81-02-23',1250,500,30);
-- INSERT INTO EMP VALUES (7902,'FORD','ANALYST',7566,'81-12-11',3000, NULL,20);
-- INSERT INTO EMP VALUES (7369,'SMITH','CLERK',7902,'80-12-11',800, NULL,20);
-- INSERT INTO EMP VALUES (7788,'SCOTT','ANALYST',7566,'82-12-22',3000, NULL,20);
-- INSERT INTO EMP VALUES (7876,'ADAMS','CLERK',7788,'83-01-15',1100, NULL,20);
-- INSERT INTO EMP VALUES (7934,'MILLER','CLERK',7782,'82-01-11',1300, NULL,10);

-- commit;


-- create table salgrade ( 
-- grade   int(10),
-- losal   int(10),
-- hisal   int(10) 
-- );

-- insert into salgrade values(1,700,1200);
-- insert into salgrade values(2,1201,1400);
-- insert into salgrade values(3,1401,2000);
-- insert into salgrade values(4,2001,3000);
-- insert into salgrade values(5,3001,9999);

-- commit;



-- select concat(ename, '의 월급은 ', sal, '달러 입니다.') as result from emp;

# emp 테이블에서 직업을 출력하는데 중복된 데이터를 제외하고 출력하라
-- select distinct job from emp;


# 이름과 월급을 출력하는데 월급이 낮은 사원부터 출력
-- select ename as '이름', sal as '월급' from emp order by sal asc; # asc 생략가능

# 월급이 3000 초과인 사원들의 이름, 월급, 직업을 출력
-- select ename as '이름', sal as '월급', job as '직업' from emp where sal > 3000;

# 이름이 scott 인 사원의 이름, 월급, 직업, 입사일, 부서 번호 출력
-- select ename as '이름', sal as '월급', job as '직업', hiredate as '입사일', deptno as '부서 번호' from emp where ename = 'SCOTT';

# 연봉이 36000 이상인 사원들의 이름과 연봉 출력
# 주의 - 지금 정보는 월급
-- select ename as '이름', sal * 12 as '연봉' from emp where sal * 12 >= 36000;

# 직업이 salesman이 아닌 사원들의 이름과 부서번호, 직업 출력
-- select ename as '이름', deptno as '부서 번호', job as '직업' from emp where job != 'SALESMAN' ; 
-- select ename as '이름', deptno as '부서 번호', job as '직업' from emp where job not in ('SALESMAN') ; 

# 월급이 1000에서 3000 사이가 아닌 사원들의 이름과 월급을 출력
-- select ename as 이름, sal as 월급 from emp where sal >3000 or sal < 1000;
-- select ename as 이름, sal as 월급 from emp where !(sal <= 3000 and sal >= 1000);
-- select ename as 이름, sal as 월급 from emp where sal not between 1000 and 3000;

-- use cosmetics;

# 1982년도에 입사한 사원들의 이름과 입사일을 출력
-- select ename as 이름, hiredate as 입사일 from emp where hiredate like '1982%';

# 이름의 첫 글자가 s로 시작하는 사원들의 이름과 월급 출력
-- select ename as 이름, sal as 월급 from emp where ename like 'S%';

# 이름의 끝 글자가 T로 끝나는 사원들의 이름과 월급 출력
-- select ename as 이름, sal as 월급 from emp where ename like '%T';

# 이름의 두번째 철자가 M인 사원의 이름과 월급 출력
-- select ename as 이름, sal as 월급 from emp where ename like '_M%';

# 직업이 salesman, analyst, manager인 사원들의 이름, 월급, 직업 출력
-- select ename as 이름, sal as 월급, job as 직업 from emp where job = 'SALESMAN' OR job = 'ANALYST' OR job = 'MANAGER';
-- select ename as 이름, sal as 월급, job as 직업 from emp where job = 'SALESMAN' || job = 'ANALYST' || job = 'MANAGER';
-- select ename as 이름, sal as 월급, job as 직업 from emp where job in ('SALESMAN', 'ANALYST', 'MANAGER');

# 직업이 salesman, analyst, manager이 아닌 사원들의 이름, 월급, 직업 출력
-- select ename as 이름, sal as 월급, job as 직업 from emp where !(job = 'SALESMAN' OR job = 'ANALYST' OR job = 'MANAGER');
-- select ename as 이름, sal as 월급, job as 직업 from emp where !(job = 'SALESMAN' || job = 'ANALYST' || job = 'MANAGER');
-- select ename as 이름, sal as 월급, job as 직업 from emp where job not in ('SALESMAN', 'ANALYST', 'MANAGER'); # '' 없어도 출력

# 날짜 컬럼에서 연도/월/일/시간/분/초를 추출하기 위해 extract 함수 사용하는 방법도 있다.
-- select ename as 이름, extract(year from hiredate) as 년, extract(month from hiredate) as 월, extract(day from hiredate) as 일 from emp;

# to_char(숫자형 데이터, 형식)
-- select format(123456789, 0); 		# 123,456,789

# 1981년 입사한 사원들의 이름, 입사일 출력
-- select ename as 이름, concat(extract(month from hiredate), '월 ', extract(day from hiredate), '일') as 입사일 from emp 
-- where extract(year from hiredate) = 1981 order by hiredate;

# 사원의 이름, 직업, 월급, 보너스를 출력
# 단, 보너스는 월급이 3000 이상이면 500을
# 월급이 2000 이상 3000 미만이면 300을
# 월급이 1000 이상 2000 미만이면 200을
# 나머지는 0 출력
-- select ename as 이름, job as 직업, sal as 월급, 
-- (
-- case
-- when sal >= 3000 then 500
-- when sal >= 2000 then 300
-- when sal >= 1000 then 200
-- else 0
-- end
-- ) as 보너스 from emp; # (case ~ end) -> 괄호 없어도 괜찮음


# 사원 테이블에서 최대 월급 출력
-- select max(sal) as '최대 월급' from emp;

# 부서 번호와 부서 번호별 최대 월급을 출력
-- select deptno as '부서 번호', max(sal) as '부서별 최대 월급' from emp group by deptno;

# 직업과 직업별 토탈 월급 출력, 높은순
-- select job as 직업, sum(sal) as '직업별 총 월급 합' from emp group by job order by sum(sal) desc;

# 직업과 직업별 토탈 월급 출력하는데 직업에서 salesman은 제외하고, 직업별 토탈 월급이 4000 이상인 직군만 출력
-- select job as 직업, sum(sal) as '직업별 총 월급 합' from emp where job not in ('SALESMAN') group by job having sum(sal) >= 4000;
-- select job as 직업, sum(sal) as '직업별 총 월급 합' from emp where job <> 'SALESMAN' group by job having sum(sal) >= 4000;
