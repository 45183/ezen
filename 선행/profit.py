# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""

# 당기 순이익 계산 식 = 매출 - 배달비 - 세금 - 주주배당 이라 할 경우
# a = revenue - delivery - tax - dividend

def my_profit(revenue, delivery, tax, dividend) :
    x = (revenue - delivery) * (1- tax) - dividend
    return x

my_profit(10000, 1000, 0.22, 400)