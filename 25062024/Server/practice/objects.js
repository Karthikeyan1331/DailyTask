const readline = require('readline');
console.log("\nObjects\n")
let user = new Object()
user.name = "John"
user.surname = "Smith"//create
console.log(user)
user.name = "Pete"//change
console.log(user)
delete user.name//delete
console.log(user)
user = {}
function isEmpty(obj) {
    return Object.keys(obj).length === 0
}
console.log(isEmpty(user), user)
// Write the code to sum all salaries and store in the variable sum. Should be 390 in the example above.
let salaries = {
    John: 100,
    Ann: 160,
    Pete: 130
}
let tot = 0
Object.keys(salaries).forEach(elements => {
    tot += salaries[elements]
})
console.log(tot)
// Create a function multiplyNumeric(obj) that multiplies all numeric property values of obj by 2.
let menu = {
    width: 200,
    height: 300,
    title: "My menu"
};
const multiplyNumeric = (() => {
    for (let key in menu) {
        if (typeof menu[key] === 'number')
            menu[key] *= 2
    }
})

multiplyNumeric();
console.log(menu)
user = {
    name: "John"
};
let admin = user;
user = null
console.log(admin)

// let calculator = {
//     a: 0,
//     b: 0,
//     read(callback) {
//         const rl = readline.createInterface({
//             input: process.stdin,
//             output: process.stdout
//         });

//         rl.question('Enter value for a: ', (inputA) => {
//             this.a = parseFloat(inputA);
//             rl.question('Enter value for b: ', (inputB) => {
//                 this.b = parseFloat(inputB);
//                 rl.close();
//                 callback();
//             });
//         }); 1
//     },
//     sum() {
//         return this.a + this.b;
//     },
//     mul() {
//         return this.a * this.b;
//     }
// };

// calculator.read(() => {
//     console.log('Sum:', calculator.sum());
//     console.log('Product:', calculator.mul());
// });
// There’s a ladder object that allows you to go up and down:
let ladder = {
    step: 0,
    up() {
        this.step++;
        return this
    },
    down() {
        this.step--;
        return this
    },
    showStep: function () { // shows the current step
        console.log(this.step);
        return this
    }
};
ladder.up().up().down().showStep().down().showStep();
console.log("\n")