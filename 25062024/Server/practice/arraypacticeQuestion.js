const camelize = (str) => {
    console.log(
        str
            .split('-')
            .map((w, i) => (i == 0 ? w : w[0].toUpperCase() + w.slice(1)))
            .join('')
    );
};
camelize('background-color');
camelize('list-style-image');
camelize('-webkit-transition');
const filterRange = (arr, s, e) => {
    return arr.filter((item) => s <= item && e >= item);
};
let arr = [5, 3, 8, 1];

let filtered = filterRange(arr, 1, 4);
console.log(filtered);
arr.filter((item) => 1 <= item && 4 >= item);
arr.sort((a, b) => b - a);
console.log(arr);
const copySorted = (arr1) => {
    return [...arr1].sort();
};
arr = ['RustAPI', 'Rust', 'HTML', 'JavaScript', 'CSS', 'PHP'];
let sorted = copySorted(arr);
console.log(arr, sorted);
let calculator = (str) => {
    let regex = /(-?\d+(?:\.\d+)?)\s*([-+*\/])\s*(-?\d+(:?\.\d+)?)/;
    let result = str.match(regex);
    console.log(result);
    if (!result) return [];
    result.shift();
    let [a, op, b] = result;
    a = Number(a);
    b = Number(b);
    return op == '+' ? a + b : op == '-' ? a - b : op == '*' ? a * b : a / b;
    return result;
};
console.log(calculator('-1 / 2'));
let john = { name: 'John', age: 25 };
let pete = { name: 'Pete', age: 30 };
let mary = { name: 'Mary', age: 28 };

let users = [john, pete, mary];
let names = users.reduce((acc, item) => {
    acc.push(item.name);
    return acc;
}, []);
console.log(names);
john = { name: 'John', surname: 'Smith', id: 1, age: 25 };
pete = { name: 'Pete', surname: 'Hunt', id: 2, age: 30 };
mary = { name: 'Mary', surname: 'Key', id: 3, age: 28 };

users = [john, pete, mary];
let usersMapped = users.map((item) => ({
    fullName: `${item.name} ${item.surname}`,
    id: item.id,
}));
let userArray = users.map((item) => item.name);
console.log(usersMapped, userArray);
console.log(users.sort((a, b) => b.age - a.age));
arr = [1, 2, 3, 6, 2, 1, 4, 2, 5];
console.log(arr.sort((a, b) => Math.random() - 0.5));
console.log(
    (users.reduce((acc, item) => (acc += item.age), 0) / users.length).toFixed(
        2
    )
);
function unique(arr) {
    return arr.reduce((acc, item) => {
        if (!acc.includes(item)) {
            acc.push(item);
        }
        return acc;
    }, []);
}
let strings = [
    'Hare',
    'Krishna',
    'Hare',
    'Krishna',
    'Krishna',
    'Krishna',
    'Hare',
    'Hare',
    ':-O',
];
console.log(unique(strings));
let usersById = users.reduce(
    (acc, item) => Object.assign(acc, { [item.name]: item }),
    {}
);
console.log(usersById);
