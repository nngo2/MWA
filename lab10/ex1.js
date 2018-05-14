function deposit(value) {
    return this.money += value;
}
var myself = {
    name: 'Asaad',
    bankAccount: {
        money: 2000,
        deposit: deposit
    },
    hobbies: ["Violin", "Cooking"]
};
myself.bankAccount.deposit(3000);
myself.bankAccount.deposit(2000);
console.log(myself);
