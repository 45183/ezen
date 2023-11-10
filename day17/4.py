from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import pandas as pd
from sqlalchemy import create_engine
# 브라우저 실행
driver = webdriver.Chrome()

# 네이버 웹툰 페이지 접속
driver.get("https://comic.naver.com/webtoon/weekday")
time.sleep(3)
webtoon_titles = driver.find_elements(By.CLASS_NAME, 'text')
title_list = []

for name in webtoon_titles:
    title_list.append(name.text)
#     print(name.text)
# print(len(webtoon_titles))


df = pd.Series(title_list)



engine = create_engine('mysql+pymysql://root:hyun45183@localhost/practice6')

# 데이터 프레임을 MySQL 테이블에 쓰기
table_name = 'webtoon2' # 생성할 테이블 이름

try:
    df.to_sql(name=table_name, con=engine, if_exists="replace", index=False)
    print(f'데이터가 {table_name} 테이블에 저장되었습니다.')
except Exception as e:
    print(f'에러 발생 : {str(e)}')



###################### 2~3 합하고 csv 파일 생성하지 않고 바로 DB에 테이블 생성