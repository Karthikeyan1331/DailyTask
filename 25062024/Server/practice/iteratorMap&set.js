const range = (a, b, op = 1) => {
    return {
        start: a,
        to: b,
        op: op,
        [Symbol.iterator]() {
            let current = this.start;
            let last = this.to;
            let op = this.op;
            return {
                next() {
                    let ch = op >= 0 ? current < last : current > last
                    if (ch) {
                        let value = current;
                        current += op;
                        return { done: false, value: value };
                    } else {
                        return { done: true };
                    }
                },
            };
        },
    };
};

for (let k of range(6, 1, -8)) {
    console.log(k); // 1, 2, 3, 4, 5
}
//Maps&Set
// Create a function unique(arr) that should return an array with unique items of arr.
function unique(arr) {
    let uni = new Set()
    for (let k of arr) uni.add(k)
    return Array.from(uni)
}

let values = ["Hare", "Krishna", "Hare", "Krishna",
    "Krishna", "Krishna", "Hare", "Hare", "Karthikeyan"
];
console.log(`Create a function unique(arr) that should return an array with unique items of arr\n${unique(values)}`);

// Anagrams are words that have the same number of same letters, but in different order.

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];
let anagrams = new Set()
let aclearn = []
for (let k of arr) {
    let temp = k.split('').sort().join('').toLowerCase()
    if (!anagrams.has(temp))
        aclearn.push(k)
    anagrams.add(temp)
}
console.log(aclearn)

let messages = [
    { text: "Hello", from: "John" },
    { slo: "How goes?", from: "John" },
    { text: "See you soon", from: "Alice" }
];
let currentM = new WeakMap()

currentM.set(messages[0])
console.log(currentM.has(messages[0]))
currentM.set(messages[1])
console.log(currentM.has(messages[0]))
messages.shift();

