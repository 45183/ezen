# -*- coding: utf-8 -*-
"""
Created on Tue Oct 17 09:22:38 2023

@author: EZEN-211T
"""

def profit_calc(revenue, cost, tax, dividend):
    x = (revenue - cost) * (1 - tax) - dividend
    return x

def revenue_breakdown(revenue, chicken, pizza, sause):
    y = chicken / revenue
    z = pizza / revenue
    r = sause / revenue
    error_chk = (chicken + pizza + sause) / revenue
    return y, z, r, error_chk


if __name__ == "__main__": 
    #이 파일이 메인으로 돌아갈 때만 if아래를 실행   
    print(profit_calc(10000, 1000, 0.22, 400))
    print(revenue_breakdown(10000, 5000, 4000, 1000))
else:
    print(profit_calc(1000000, 100000, 0.22, 400000))
    print(revenue_breakdown(10000000, 500000, 400000, 100000))

