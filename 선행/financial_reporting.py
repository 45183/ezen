# -*- coding: utf-8 -*-
"""
Created on Tue Oct 17 09:23:11 2023

@author: hsb97
"""

# library 생성 예제

def profit_calc(revenue, cost, tax, dividend) :
    x = (revenue - cost) * (1 - tax) - dividend
    return x

def revenue_breakdown(revenue, chicken, pizza, sauce) :
    y = chicken / revenue
    z = pizza / revenue
    r = sauce / revenue
    error_chk = (chicken + pizza + sauce) / revenue
    return y, z, r, error_chk

if __name__ == "__main__" : 
    # 이 파일이 메인으로 돌아갈 때만 if 아래를 실행
    print(profit_calc(10000, 1000, 0.22, 400))
    print(revenue_breakdown(10000, 5000, 4000, 1000))
    
else :
    # 이 파일이 메인이 아닐 때만 실행
    print(profit_calc(1000000, 60000, 0.22, 46000))
    print(revenue_breakdown(120000, 51000, 40000, 1000))
