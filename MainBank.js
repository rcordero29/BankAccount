'use strict';

class BankAccount {
  constructor(accountNumber, owner) {
    this.accountNumber = accountNumber;
    this.owner = owner;
    this.transactions = [];
  }

  deposit(amt) {
    if (amt > 0) {
      let newTransaction = new Transaction('Deposit', amt);
      this.transactions.push(newTransaction);
    }
  }

  balance() {
    let sum = 0;
    for (let i = 0; i < this.transactions.length; i++) {
      sum += this.transactions[i].amount;
    }
    return sum;
  }

  charge(payee, amt) {
    if (amt < 0 || this.balance() >= amt) {
      let newCharge = new Transaction(payee, -amt);
      this.transactions.push(newCharge);
    }
  }
}

class Transaction {
  constructor(payee, amount) {
    this.payee = payee;
    this.amount = amount;
    this.date = new Date();
  }
}

class SavingsAccount extends BankAccount {
  constructor(accountNumber, owner, interestRate) {
    super(accountNumber, owner);
    this.interestRate = interestRate;
  }

  accruedInterest() {
    let interestAmount = this.balance() * this.interestRate;
    let interestTransaction = new Transaction('Interest', interestAmount);
    this.transactions.push(interestTransaction);
  }
}

let accountNum = 'xxx123',
  owner = 'DavidC';
let b1 = new BankAccount(accountNum, owner);
b1.deposit(50);
b1.deposit(25);
console.log(b1.balance());
b1.charge('Amazon', 25);
console.log(b1.balance());
console.log(b1.transactions);
let s1 = new SavingsAccount(accountNum, owner, 0.1);
s1.deposit(100);

console.log(s1.balance());
s1.accruedInterest();
console.log(s1.balance());
console.log(s1.transactions);
