# -*- coding: utf-8 -*-
"""
Created on Wed Nov  8 15:37:06 2023

@author: hsb97
"""

class BankAccount :
    def __init__(self, balance) :
        self.__balance = balance # __ 은닉변수
        
    def balance_show(self):
        k = self.__balance
        return k
    
    def deposit(self, amount):
        if amount > 0 :
            self.__balance += amount
    
    def withdraw(self, amount):
        if amount > 0 and amount <= self.__balance :
            self.__balance -= amount
        else :
            print("Insufficient funds!")
    
    def get_balance(self) :
        return self.__balance
    
    if __name__ == "__main__" :
        
        account = BankAccount(1000)
        account.deposit(5000)
        account.withdraw(2000)
        account.get_balance()