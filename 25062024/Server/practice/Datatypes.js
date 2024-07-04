console.log("\nObject\n")
console.log("European computer manufacturers Association script")
let billion = 1e9;
console.log(billion)
console.log(1e3 === 1 * 1000)
console.log(300000e-5)
console.log("\nDifference between the var and let")
function exampleVar() {
    let x = 10;
    if (true) {
        let x = 20;
        console.log(x); //20
    }
    console.log(x);//if it is var ans is 20 or if it is let ans 10
}
exampleVar();
console.log("\nDifferent type of conversion")
function floattoInt(num) {
    console.log(`Floor ${num} to ${Math.floor(num)}`)
    console.log(`Ceil ${num} to ${Math.ceil(num)}`)
    console.log(`Round ${num} to ${Math.round(num)}`)
    console.log(`Trunc ${num} to ${Math.trunc(num)}`)
    console.log(`ToFixed ${num} to ${num.toFixed(2)}\n`)
}
floattoInt(3.1)
floattoInt(3.6)
floattoInt(-1.1)
floattoInt(-1.6)
console.log(isNaN("12"))
console.log(6.35.toFixed(1) == 6.3)
function random(min, max) {
    return min + Math.random() * (max - min);
}
// for(let i=0;i<100;i++)
console.log(Math.ceil(random(1, 5)))
//string
str = "kArThiKeyan"
console.log(str.at(-1))
console.log(str.toUpperCase(), str.toLowerCase(), str[0].toUpperCase() + str.slice(1,).toLowerCase())
str = "European computer manufactures script"
console.log(str.indexOf("computer"), str.includes("computer"), str.startsWith("Euro"), str.endsWith("script"))
console.log(str.slice(-6,))
console.log(str.substr(-19, 12), "Z".codePointAt(0));

// Write a function checkSpam(str) that returns true if str contains ‘viagra’ or ‘XXX’, otherwise false.
const checkSpam = (str => {
    let regex = /viagra|xxx/gi
    console.log(regex.test(str))
})
checkSpam('buy ViAgRA now')
checkSpam('free xxxxx')
checkSpam("innocent rabbit")
// Create a function truncate(str, maxlength) that checks the length of the str and, if it exceeds maxlength – replaces the end of str with the ellipsis character "…", to make its length equal to maxlength.
const truncate = (str, num) => {
    return str.substr(0, num)
}
console.log(truncate("What I'd like to tell on this topic is:", 20))
console.log(truncate("Hi everyone!", 20))
//Array
let fruits = ["Apple", "Orange", "Plum"];
console.log(fruits.unshift("likes"), fruits, fruits.push("Banana"));
console.log(fruits.concat([3, 4], [5, 6], 2, 3, 4, 5, 6))
str = "European";
Array.from(str).map((char, index) => {
    console.log(char, index);
});
let users = [
    { id: 1, name: "John" },
    { id: 2, name: "Pete" },
    { id: 3, name: "Mary" },
    { id: 4, name: "Mary" }
];
console.log(users.find(users => users.id === 1))
console.log(users.findIndex(users => users.name === "John"))
console.log(users.findLastIndex(user => user.name === "Mary"))
console.log(users.findIndex((item, index, array) => {
    console.log(item, index, array)
    return true
}))
console.log(users.filter(item => item.id > 2))
console.log(users.sort((a, b) => b.id - a.id))
console.log(users.reverse())

console.log("\n")