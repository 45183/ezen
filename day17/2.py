from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import pandas as pd

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


# 아래의 출력된 결과를 pandas 라이브러리를 사용해서 csv에 결과 저장
df = pd.Series(title_list)
# df = pd.DataFrame(title_list, columns=['title']) # Series는 열 하나, DataFrame으로 하려면 columns=['title'] 사용해서 추가해줘야함
df.to_csv("webtoon.csv", encoding='utf-8-sig')



