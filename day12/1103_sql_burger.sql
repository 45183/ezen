CREATE DATABASE lucy;
use lucy;
CREATE DATABASE lucy;
CREATE DATABASE IF NOT EXISTS lucy;

SELECT SaKilA.AcTor_id FROM ACTor;
select sakila.actor_id from actor;
CREATE DATABASE IF NOT EXISTS `lu;cy`;
SHOW DATABASES LIKE 'lu%' ;
SHOW CHARACTER SET;
CREATE DATABASE rose DEFAULT CHARACTER SET utf8mb4
 COLLATE utf8mb4_ru_0900_as_cs;
# 빅데이터 심화과정
CREATE TABLE test_bigint (id BIGINT UNSIGNED);
INSERT INTO test_bigint VALUES (18446744073709551615);
INSERT INTO test_bigint VALUES (18446744073709551615-1);
INSERT INTO test_bigint VALUES (184467440737095516*100);

CREATE TABLE test_bool (i BOOL);
INSERT INTO test_bool VALUES (true),(false);
INSERT INTO test_bool VALUES (1),(0),(-128),(127);
SELECT i, IF(i,'true','false') FROM test_bool;
# 데이터 입력 시 유의사항
CREATE TABLE wage (monthly DOUBLE);
INSERT INTO wage VALUES (50000/12);
SELECT * FROM wage;
SELECT monthly*12 FROM wage;
SELECT ROUND(monthly*12,5) FROM wage;
SELECT ROUND(monthly*12,8) FROM wage;

CREATE TABLE test_varchar_trailing(d VARCHAR(2) UNIQUE);
INSERT INTO test_varchar_trailing VALUES ('a'), ('a ');
SELECT d, LENGTH(d) FROM test_varchar_trailing;
INSERT INTO test_varchar_trailing VALUES ('a       ');

CREATE TABLE test_varchar_pad_collation(
 data VARCHAR(5) CHARACTER SET latin1
 COLLATE latin1_bin UNIQUE);
INSERT INTO test_varchar_pad_collation VALUES ('a');
 INSERT INTO test_varchar_pad_collation VALUES ('a ');

 CREATE TABLE testdate (mydate DATE);
INSERT INTO testdate VALUES ('2020/02/0'); # 에러나
 INSERT INTO testdate VALUES ('2020/02/1');
 INSERT INTO testdate VALUES ('2020/02/31'); #에러나

# auto increment 복습
 CREATE TABLE actor (
 actor_id smallint unsigned NOT NULL AUTO_INCREMENT,
 first_name varchar(45) NOT NULL,
 last_name varchar(45) NOT NULL,
 PRIMARY KEY (actor_id)
 );
INSERT INTO actor VALUES (NULL, 'Alexander', 'Kaidanovsky');
INSERT INTO actor VALUES (NULL, 'Anatoly', 'Solonitsyn');
INSERT INTO actor VALUES (NULL, 'Nikolai', 'Grinko');
 SELECT * FROM actor;
# sql의 특성 
CREATE TABLE count (counter INT AUTO_INCREMENT KEY);
INSERT INTO count VALUES (),(),(),(),(),();
SELECT * FROM count;

DELETE FROM count WHERE counter > 4;
INSERT INTO count VALUES (),(),(),(),(),();
SELECT * FROM count;

TRUNCATE TABLE count;
INSERT INTO count VALUES (),(),(),(),(),();
SELECT * FROM count;

# Column Aliases
SELECT first_name AS 'First Name', 
last_name AS 'Last Name'
 FROM actor LIMIT 5;

 SELECT CONCAT(first_name, ' ', last_name, 
 ' played in ', title) AS movie
 FROM actor JOIN film_actor USING (actor_id)
 JOIN film USING (film_id)
 ORDER BY movie LIMIT 20;
# as 로 설정한 이름은 시스템은 몰라
SELECT first_name AS name 
FROM actor WHERE name = 'ZERO CAGE';
use sakila;
SELECT actor_id AS id 
FROM actor WHERE first_name = 'ZERO';
SELECT actor_id id 
FROM actor WHERE first_name = 'ZERO';
# Table Aliases (테이블 앞에 영어 약자 붙여서 쿼리를 깔끔하게)
# join할 때, 전체 데이터 컬럼으로 지정안해도 되
SELECT ac.actor_id, ac.first_name, ac.last_name, fl.title 
FROM actor AS ac 
INNER JOIN film_actor AS fla USING (actor_id)
INNER JOIN film AS fl USING (film_id)
WHERE fl.title = 'AFFAIR PREJUDICE';

 SELECT ac.actor_id, ac.first_name, ac.last_name, fl.title FROM
 actor AS ac INNER JOIN film_actor AS fla USING (actor_id)
 INNER JOIN film AS fl USING (film_id)
 WHERE film.title = 'AFFAIR PREJUDICE';

 SELECT distinct first_name
 FROM actor JOIN film_actor USING (actor_id);

SELECT first_name
 FROM actor JOIN film_actor USING (actor_id)
 LIMIT 5;
 # join쓸때 distinct 쓰지마
  SELECT DISTINCT first_name, last_name
 FROM actor JOIN film_actor USING (actor_id);

 SELECT first_name FROM actor
 WHERE first_name IN ('GENE', 'MERYL')
 GROUP BY first_name;

SELECT first_name, last_name, film_id
FROM actor INNER JOIN film_actor USING (actor_id)
ORDER BY first_name, last_name LIMIT 20;

# 퀴즈: 위 쿼리문을 참조하여, 각 사람별로 영화 몇편찍었는지 보여주세요

 SELECT first_name, last_name, 
 COUNT(film_id) AS num_films FROM
 actor INNER JOIN film_actor USING (actor_id)
 GROUP BY first_name, last_name
 ORDER BY num_films desc limit 10;

 SELECT title, name AS category_name, COUNT(*) AS cnt
 FROM film INNER JOIN film_actor USING (film_id)
 INNER JOIN film_category USING (film_id)
 INNER JOIN category USING (category_id)
 GROUP BY film_id, category_id
 ORDER BY cnt DESC LIMIT 5;

 SELECT email, name AS category_name, 
 COUNT(category_id) AS cnt
 FROM customer cs INNER JOIN rental USING (customer_id)
 INNER JOIN inventory USING (inventory_id)
 INNER JOIN film_category USING (film_id)
 INNER JOIN category cat USING (category_id)
 GROUP BY 1, 2
 ORDER BY 3 DESC LIMIT 5;

SELECT COUNT(*) FROM customer;
SELECT COUNT(email) FROM customer;
SELECT userid, AVG(price) FROM sqldb.buytbl GROUP BY userid;
SELECT userid, max(price) FROM sqldb.buytbl GROUP BY userid;
SELECT userid, min(price) FROM sqldb.buytbl GROUP BY userid;

SELECT first_name, last_name, COUNT(film_id)
 FROM actor INNER JOIN film_actor USING (actor_id)
 GROUP BY actor_id, first_name, last_name
 HAVING COUNT(film_id) > 40
 ORDER BY COUNT(film_id) DESC;
# 퀴즈 - 아래 쿼리에서 having대신 where를 쓰세요
SELECT first_name, last_name, 
COUNT(film_id) AS film_cnt 
FROM actor INNER JOIN film_actor USING (actor_id)
 where first_name = 'EMILY' AND last_name = 'DEE'
 GROUP BY actor_id, first_name, last_name
 ;
SELECT first_name, last_name, film_id FROM
 actor INNER JOIN film_actor USING (actor_id);
SELECT first_name, last_name, film_id
 FROM actor, film_actor
 WHERE actor.actor_id = film_actor.actor_id;
SELECT first_name, last_name, film_id FROM
 actor INNER JOIN film_actor
 ON actor.actor_id = film_actor.actor_id;
 
SELECT first_name FROM actor
 UNION
 SELECT first_name FROM customer
 UNION
 SELECT title FROM film;

SELECT first_name FROM actor WHERE actor_id = 88
 UNION all
 SELECT first_name FROM actor WHERE actor_id = 169;

 (SELECT first_name, last_name FROM actor 
 WHERE actor_id < 5)
 UNION
 (SELECT first_name, last_name FROM actor 
 WHERE actor_id > 190)
 ORDER BY first_name LIMIT 4;

 SELECT first_name, last_name FROM actor
 WHERE actor_id < 5 OR actor_id > 190
 ORDER BY first_name LIMIT 4;

# 퀴즈: 아래 쿼리문을 설명 하시오
 SELECT title, rental_date
 FROM film LEFT JOIN inventory USING (film_id)
 LEFT JOIN rental USING (inventory_id);

 SELECT email, name AS category_name, 
 COUNT(cat.category_id) AS cnt
 FROM customer cs INNER JOIN rental USING (customer_id)
 INNER JOIN inventory USING (inventory_id)
 INNER JOIN film_category USING (film_id)
 INNER JOIN category cat USING (category_id)
 GROUP BY email, category_name
 ORDER BY cnt DESC LIMIT 5;

 SELECT email, name AS category_name, 
 COUNT(category_id) AS cnt
 FROM category cat LEFT JOIN film_category 
 USING (category_id)
 LEFT JOIN inventory USING (film_id)
 LEFT JOIN rental USING (inventory_id)
 JOIN customer cs ON rental.customer_id = cs.customer_id
 WHERE cs.email = 'WESLEY.BULL@sakilacustomer.org'
 GROUP BY email, category_name
 ORDER BY cnt DESC;

 SELECT title, rental_date
 FROM rental RIGHT JOIN inventory USING (inventory_id)
 RIGHT JOIN film USING (film_id)
 ORDER BY rental_date DESC;
 
 SELECT emp_no, first_name, last_name, hire_date
 FROM employees JOIN titles USING (emp_no)
 WHERE title = 'Assistant Engineer'
 AND hire_date < ANY (SELECT hire_date FROM
 employees JOIN titles USING (emp_no)
 WHERE title = 'Manager'); 
 # 매니저 들의 입사일을 모아서 그 중에 제일 최근입사일 보다
 # 더 입사를 먼저한 대리들 찾기
 
 SELECT emp_no, first_name, last_name
 FROM employees JOIN titles USING (emp_no)
 WHERE title = 'Manager'
 AND emp_no = ANY (SELECT emp_no FROM employees
 JOIN titles USING (emp_no) WHERE
 title <> 'Manager');

 
 
 
 