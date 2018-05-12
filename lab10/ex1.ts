function deposit(value: number) {
    return this.money += value;
}

// let myself : {
//     name: string,
//     bankAccount: {money: number, deposit: (value : number) => number},
//     hobbies: string[]
// } = {
//     name: 'Asaad',
//     bankAccount: {
//         money: 2000,
//         deposit: deposit
//     },
//     hobbies: ["Violin", "Cooking"]
// };

interface DepositFunc {
    (value: number) : number;
}

interface BankAccount {
    money: number;
    deposit: DepositFunc
}

interface Customer {
    name: string,
    bankAccount: BankAccount,
    hobbies: string[]    
}

let myself : Customer = {
    name: 'Asaad',
    bankAccount: {
        money: 2000,
        deposit: deposit
    },
    hobbies: ["Violin", "Cooking"]
}

myself.bankAccount.deposit(3000);
myself.bankAccount.deposit(2000);
console.log(myself);