use sakila;
SELECT * FROM sakila.language WHERE name = 'English';
SELECT actor_id, first_name FROM actor WHERE actor_id = 4;
SELECT city FROM city WHERE city_id < 5;
SELECT language_id, name FROM sakila.language
WHERE language_id <> 2;
SELECT first_name FROM actor WHERE first_name < 'B';
SELECT title FROM film WHERE title LIKE '%family%';
SELECT actors, title FROM film_list WHERE actors LIKE 'NAT_%';
SELECT title FROM film WHERE title LIKE '%day%';
SELECT rating, title FROM film_list WHERE category LIKE 'Sci-Fi'
AND rating LIKE 'PG';
SELECT * FROM sakila.city WHERE city_id = 3
OR city_id = 4 AND country_id = 60;
 SELECT * FROM sakila.city WHERE country_id = 60
AND city_id = 3 OR city_id = 4; # 괄호를 쓰자
 SELECT language_id, name FROM sakila.language
WHERE NOT (language_id = 2);
 SELECT fid,title FROM film_list 
 WHERE FID < 9 AND NOT (FID = 4 OR FID = 6);
 SELECT title FROM film_list
WHERE price BETWEEN 2 AND 4
AND (category LIKE 'Documentary' OR category LIKE 'Horror')
AND actors LIKE '%BOB%';
SELECT name FROM customer_list
ORDER BY name
LIMIT 10;
 SELECT address, last_update FROM address
ORDER BY last_update LIMIT 5;
SELECT address, district FROM address
 ORDER BY district, address LIMIT 30;
SELECT name FROM customer_list LIMIT 5;
SELECT name FROM customer_list LIMIT 5, 5;

SELECT id, name FROM customer_list
ORDER BY id LIMIT 10;
 SELECT id, name FROM customer_list
ORDER BY id LIMIT 10 OFFSET 5;

SELECT city, country FROM city INNER JOIN country
ON city.country_id = country.country_id
WHERE country.country_id < 5
ORDER BY country, city;
SELECT COUNT(1) FROM city INNER JOIN country
 ON city.country_id = country.country_id
 WHERE country.country_id = 49
 ORDER BY country, city;
SELECT MAX(language_id) FROM language;
INSERT INTO language VALUES (NULL, 'Portuguese', NOW());
INSERT INTO language VALUES (8, 'Russian', '2020-09-26 10:35:00');
SELECT * FROM language;
-- 돌리진 마시고 보세요
INSERT INTO language VALUES (8, 'Arabic', '2020-09-26 10:35:00') --> 이러면 에러나요
INSERT IGNORE INTO language VALUES (8, 'Arabic', '2020-09-26 10:35:00');
-- 에러무시하고 업로드 가능, 단 데이터 망함
SELECT first_name, last_name, customer.customer_id,
 amount, payment_date FROM payment INNER JOIN customer
 ON customer.customer_id=payment.customer_id
 WHERE first_name like 'Mary'
 AND last_name like 'Smith';
DELETE FROM payment ORDER BY customer_id LIMIT 10000;
UPDATE payment SET amount=amount*1.1;
UPDATE payment SET last_update=NOW();
CREATE DATABASE IF NOT EXISTS lucy;
USE lucy;



