import pandas as pd
from sqlalchemy import create_engine


engine = create_engine('mysql+pymysql://root:hyun45183@localhost/practice6')
csv_file = "webtoon.csv"
df = pd.read_csv(csv_file)

# 데이터 프레임을 MySQL 테이블에 쓰기
table_name = 'webtoon' # 생성할 테이블 이름

try:
    df.to_sql(name=table_name, con=engine, if_exists="replace", index=False)
    print(f'데이터가 {table_name} 테이블에 저장되었습니다.')
except Exception as e:
    print(f'에러 발생 : {str(e)}')