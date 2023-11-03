# EX) ENAME의 월급은 SAL달러 입니다.
SELECT ENAME, '의 월급은 ', SAL, '달러 입니다.'
FROM EMP;

# emp 테이블에서 직업을 출력하는데 중복된 데이터를 제외하고 출력하라
SELECT DISTINCT JOB FROM EMP;

#이름과 월급을 출력하는데 월급이 낮은 사원부터 출력하라
SELeCT ENAME, SAL FROM EMP
ORDER BY SAL ASC;

# 월급이 3000 초과인 사원들의 이름, 월급, 직업을 출력하라
SELECT ENAME, SAL, JOB FROM EMP
WHERE SAL > 3000;

# Q. 이름이 SCOTT인 사원의 이름, 월급, 직업, 입사일, 부서 번호를 출력하라
SELECT ENAME, SAL, JOB, HIREDATE, DEPTNO
FROM EMP
WHERE ENAME = 'SCOTT';

# Q. 연봉이 3600 이상인 사원들의 이름과 연봉을 출력하라
# 주의: 지금 정보는 월급이다. 이를 고려하여 해결할 것
SELECT ENAME, SAL*12 AS 연봉
FROM EMP
WHERE SAL * 12 >= 3600;

# 직업이 SALESMAN이 아닌 사원들의 이름과 부서 번호, 직업을 출력하라
SELECT ENAME, DEPTNO, JOB FROM EMP
WHERE JOB <> 'SALESMAN';

# 월급이 1000에서 3000사이가 아닌 사원들의 이름과 월급을 출력하라
SELECT ENAME, SAL FROM EMP
WHERE SAL NOT BETWEEN 1000 AND 3000;

SELECT ENAME, SAL
FROM EMP
WHERE (SAL < 1000 OR SAL > 3000);

# 1982년도에 입사한 사원들의 이름과 입사일을 출력하라
SELECT ENAME, HIREDATE FROM EMP
WHERE HIREDATE '1982/01/01' AND '1982/12/31';
# Q. 이름의 첫 글자가 S로 시작하는 사원들의 이름과 월급을 출력하라
SELECT ENAME, SAL FROM EMP
WHERE ENAME LIKE 'S%';
# 이름의 끝 글자가 T로 끝나는 사원들의 이름과 월급을 출력하라
SELECT ENAME, SAL FROM EMP
WHERE ENAME LIKE '%T';

# 이름의 두 번째 철자가 M인 사원의 이름과 월급을 출력하라
SELECT ENAME, SAL FROM EMP
WHERE ENAME LIKE '_M%';
# 직업이 SALESMAN, ANALYST, 
# MANAGER인 사원들의 이름, 월급, 직업을 출력하라
SELECT ENAME, SAL, JOB FROM EMP
WHERE JOB IN (SALESMAN, ANALYST, MANAGER);
# 직업이 SALESMAN, ANALYST, 
# MANAGER가 '아닌' 사원들의 이름, 월급, 직업을 출력하라
SELECT ENAME, SAL, JOB FROM EMP
WHERE JOB NOT IN (SALESMAN, ANALYST, MANAGER);
# 날짜 컬럼에서 연도/월/일/시간/분/초를 추출하기 위해 
# EXTRACT 함수를 사용하는 방법도 있습니다.
SELECT ENAME AS 이름, EXTRACT(year from HIREDATE) AS 년도,
			EXTRACT(month from HIREDATE) AS 달,
			EXTRACT(day from HIREDATE) AS 요일
FROM EMP;
-- format(숫자형 데이터, 자릿수)

SELECT format(123456789, 0)
FROM DUAL;

# 1981년도에 입사한 사원의 이름과 입사일을 출력하시오
SELECT ENAME AS 이름, EXTRACT(year from HIREDATE) AS 년도
from emp where EXTRACT(year from HIREDATE) = 1981;

-- 사원의 이름, 직업, 월급, 보너스를 출력하시오. 
-- 단 보너스는 월급이 3000이상이면 500을, 
-- 월급이 2000이상 3000미만이면 300을, 
-- 월급이 1000이상 2000미만이면 200을, 
-- 나머지는 0을 출력하시오.
SELECT ENAME, JOB, SAL, 
                CASE WHEN SAL >= 3000 THEN 500
                     WHEN SAL >=2000 THEN 300
                     WHEN SAL >= 1000 THEN 200
                     ELSE 0 END AS BONUS
FROM EMP;
# 사원테이블에서 최대 월급을 출력하라
SELECT MAX(SAL) FROM EMP;
# 부서 번호와 부서 번호 별 최대 월급을 출력하라
SELECT DEPTNO, MAX(SAL) FROM EMP
GROUP BY DEPTNO;
# 직업과 직업별 토탈 월급을 출력하는데 
# 직업별 토탈 월급이 높은 것부터 출력하시오
SELECT JOB, SUM(SAL) FROM EMP
GROUP BY JOB ORDER BY SUM(SAL) DESC;

# 직업과 직업별 토탈 월급을 출력하는데 직업에서 SALESMAN은 제외하고, 
# 직업별 토탈 월급이 4000 이상인 직업군들만 출력하시오
SELECT JOB, SUM(SAL) FROM EMP
WHERE JOB <> 'SALESMAN' GROUP BY JOB
HAVING SUM(SAL) >= 4000;




