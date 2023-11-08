-- select * from sakila.actor;
-- use sakila;
-- show tables;
-- select * from actor;
-- select * from sakila.language where name = 'English';
-- select actor_id, first_name from actor where actor_id = '4';
-- select language_id, name from language where language_id <> 2;
-- select first_name from actor where first_name > 'B';   # C 부터
-- select title from film where title like "%family%";
-- select actors, title from film_list where actors like "NAT_%";
-- select title from film where title like "%day%";
-- select rating, title from film_list where category like "Sci-Fi" and rating like "PG";
-- select * from city where city_id = 3 or city_id = 4 and country_id = 60;
-- select * from city where country_id = 60 and city_id = 3 or city_id = 4; # 괄호 사용
-- select language_id, name from language where not (language_id = 2);
-- select fid, title from film_list where FID < 9 and not (FID = 4 or FID = 6);
-- select title from film_list where price between 2 and 4 and (category like 'Documentary' or category like 'Horror') and actors like "%BOB%";
-- select name from customer_list order by name limit 10;
-- select address, last_update from address order by last_update limit 5;
-- select address, district from address order by district, address limit 30;
-- select name from customer_list limit 5;
-- select name from customer_list limit 5, 5; # 6번째부터 5개
-- select id, name from customer_list order by id limit 10;
-- select id, name from customer_list order by id limit 10 offset 5; # 6번째부터 10개

# select - 컬럼선택
# from - 테이블 선택
# where - 조건문 설정
# =와 like는 같은 의미인데 like가 와일드 카드 사용시 쓰인다. like가 좀더 느슨하게 사용할수 있는 느낌
# order by - 기준으로 잡아서 정렬
# limit x, y- x개 제끼고 y개 보여준다
# 

-- select city, country from city inner join country on city.country_id = country.country_id
-- where country.country_id < 5 order by country, city;
-- select count(1) from city inner join country on city.country_id = country.country_id
-- where country.country_id = 49 order by country, city;
-- select max(language_id) from language;
-- insert into language values (null, 'Portuguese', now());
-- insert into language values (8, 'Russian', '2020--09-26 10:35:00');
-- select * from language;

-- insert into language values (8, 'Arabic', '2020-09-26 10:35:00') # 에러 발생
-- insert ignore into language values (8, 'Arabic', '2020-09-26 10:35:00') # 에러 무시하고 업로드 가능, 단 데이터 망함

-- select first_name, last_name, customer.customer_id, amount, payment_date from payment inner join customer
-- on customer.customer_id = payment.customer_id where first_name like 'Mary' and last_name like 'Smith';

-- delete from payment order by customer_id limit 10000;
-- update payment set amount = amount * 1.1;
-- update payment set last_update=now();

-- use shopdb_backup;
-- create table test_bool (i bool);
-- insert into test_bool values (true), (false);
-- insert into test_bool values (1), (0), (-128), (127); # 0 제외 나머지 정수는 전부 true
-- select i, if(i, 'true', 'false') from test_bool; # i가 True면 true 출력 False면 false 출력

# 데이터 입력시 유의사항
-- create table wage (monthly double);
-- insert into wage values (50000/12);
-- select * from wage;
-- select monthly * 12 from wage; # 50000이 아닌 49999.999999992004 출력
-- select round(monthly * 12, 5) from wage;
-- select round(monthly * 12, 8) from wage;
-- select round(monthly * 12, 9) from wage;

-- create table test_varchar_trailing(d varchar(2) unique);
-- insert into test_varchar_trailing values ('a'), ('a ');
-- select d, length(d) from test_varchar_trailing;
	
-- create table testdate (mydate date);
-- insert into testdate values ('2020/02/0');
-- insert into testdate values ('2020/02/2');
-- insert into testdate values ('2020/02/29');
-- select * from testdate;


-- create table actor (
-- actor_id smallint unsigned not null auto_increment,
-- first_name varchar(45) not null,
-- last_name varchar(45) not null,
-- primary key (actor_id)
-- );


create table count (counter int  auto_increment key);
insert into count values (), (), (), (), (), ();
select * from count;