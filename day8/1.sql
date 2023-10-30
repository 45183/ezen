-- show databases;
# 데이터베이스 생성
-- create database databasename;
# 데이터베이스 생성 및 기본 자료형 설정
-- create database databasename default character set utf8mb4;

-- create database shopdb;

-- create database shopdb default character set utf8mb4;

-- create table `shopdb`.`membertbl`(
-- `memberID` char(8) not null,
-- `memberName` char(5) not null,
-- `memberAddress` char(20) null,
-- primary key (`memberID`));

# ' 이 아닌 ` 사용

-- CREATE TABLE `shopdb`.`membertbl` (
--   `memberID` CHAR(8) NOT NULL,
--   `memberName` CHAR(5) NOT NULL,
--   `memberAddress` CHAR(20) NULL,
--   PRIMARY KEY (`memberID`));


-- create table `shopdb`.`producttbl` (
-- `productName` char(4) not null,
-- `cost` int not null,
-- `makeDate` date null,
-- `company` char(5) null,
-- `amount` int not null,
-- primary key (`productName`));


# ``, '' 혼동 주의
-- insert into `shopdb`.`membertbl` (`memberID`, `memberName`, `memberAddress`) values ('Dang', '당탕이', '경기도 부천시 중동');
-- insert into `shopdb`.`membertbl` (`memberID`, `memberName`, `memberAddress`) values ('Jae', '지운이', '서울 은평구 증산동');
-- insert into `shopdb`.`membertbl` (`memberID`, `memberName`, `memberAddress`) values ('Han', '한주연', '인천 남구 주안동');
-- insert into `shopdb`.`membertbl` (`memberID`, `memberName`, `memberAddress`) values ('Sang', '상달이', '경기도 성남시 분당구');
-- insert into `shopdb`.`membertbl` (`memberID`, `memberName`, `memberAddress`) values ('Ezreal', '완상이', '경기도 김포시 걸포동');

-- insert into `shopdb`.`producttbl` (`productName`, `cost`, `makeDate`, `company`, `amount`) values ('컴퓨터', '200', '2020-1-1', '삼성', '17');
-- insert into `shopdb`.`producttbl` (`productName`, `cost`, `makeDate`, `company`, `amount`) values ('세탁기', '120', '2020-12-25', 'LG', '3');
-- insert into `shopdb`.`producttbl` (`productName`, `cost`, `makeDate`, `company`, `amount`) values ('냉장고', '145', '2020-3-5', '대우', '22');

-- create table shopdb.indexTBL(
-- first_name varchar(14),
-- last_name varchar(16),
-- hire_date date
-- );

-- insert into shopdb.indexTBL
-- select first_name, last_name, hire_date
-- from employees.employees
-- limit 500;

-- select * from shopdb.indexTBL;
-- select * from shopdb.indexTBL where first_name = 'Mary';

# index를 생성하면 빠르게 불러올 수 있다.
-- create INDEX idx_indexTBL_firstname on shopdb.indexTBL(first_name);  
-- select * from shopdb.indexTBL where first_name = 'Mary';


-- -- 테이블에 다른 DB의 다른 테이블(employees)의 성, 이름, 고용일 500개만 추가
-- INSERT INTO `shopdb`.`indexTBL`
--   SELECT first_name, last_name, hire_date
--   FROM `employees`.`employees`
--   LIMIT 500;

-- -- indexTBL 테이블에서 데이터 조회
-- SELECT * FROM `shopdb`.`indexTBL`;
-- SELECT * FROM `shopdb`.`indexTBL` WHERE first_name = 'Mary';

-- -- INDEX 생성
-- CREATE INDEX idx_indexTBL_firstname ON `shopdb`.`indexTBL`(first_name);

-- -- INDEX가 생성된 후 데이터 조회
-- SELECT * FROM `shopdb`.`indexTBL` WHERE first_name = 'Mary';

# view 뷰 특징
# 가상 테이블, 진짜 테이블에 링크된 개녕
# 뷰를 사용하면 데이터 보안과 안정성이 좋음 (읽기 전용의 특징을 잘 살림)

-- use shopdb;
-- -- view  생성
-- create view uv_memberTBL
-- as select memberName, memberAddress from membertbl;
-- -- view 조회
-- select * from uv_memberTBL;


-- delimiter // ~~~~ // -> 한줄처럼 한번에 처리
-- delimiter //
-- create procedure myProc()
-- begin
-- 	select * from memberTBL where memberName = "당탕이";
-- 	select * from productTBL where productName = "냉장고";
-- end //

-- # 실행
-- call myProc();


# 트리거 - 테이블에 부착되어 테이블에 특정 작업이 발생되면 실행되는 코드
# 예) 회원 테이블의 회원 삭제 -> 트리거 발동 -> 삭제 테이블에 저장


-- create table deletedMemberTBL (
-- memberID char(8),
-- mebmerName char(5),
-- memberAddress char(20),
-- deleteDate date -- 삭제 날짜
-- );


-- # trigger 생성
-- delimiter //
-- drop trigger if exists trg_deleteMemberTBL; -- 트리거가 있는 경우
-- create trigger trg_deleteMemberTBL -- 트리거 이름
-- after delete -- 삭제 후에 작동
-- on memberTBL -- 트리거를 부착할 테이블
-- for each row -- 각 행마다 실행
-- begin
-- # old 테이블의 내용을 백업테이블에 삽입
-- insert into deletedMemberTBL
-- values (old.memberID, old.memberNAme, old.memberAddress, curdate());
-- end //


-- use shopdb;
-- select * from memberTBL;
-- delete from memberTBL where memberName = '당탕이';
-- -- error: 1175 safe update 가 뜬다면 안전하게 (키값으로만) 삭제 업데이트 설정이 켜져있어서임
-- -- edit -> preferences -> sql editor -> safe updates(가장 아래) 체크해제

-- select * from memberTBL;
-- select * from deletedMemberTBL;


-- 트리거 삭제 
-- drop trigger trg_deletedMemberTBL

-- # 오타 등으로 트리거 재설정시 사용
-- delimiter //
-- drop trigger if exists trg_deletedMemberTBL;
-- create trigger trg_deletedMemberTBL
-- after delete
-- on memberTBL
-- for each row
-- begin
-- -- old 테이블의 내용을 백업 테이블에 삽입
-- insert into deletedMemberTBL
-- values (old.memberID, old.memberName, old.memberAddress, curdate());
-- end //
-- delimiter ;