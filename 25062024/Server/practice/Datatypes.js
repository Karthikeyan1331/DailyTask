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
console.log(Math.ceil(random(1,5)))
//string
str = "kArThiKeyan"
console.log(str.at(-1))
console.log(str.toUpperCase(),str.toLowerCase(),str[0].toUpperCase()+str.slice(1,).toLowerCase())
str = "European computer manufactures script"
console.log(str.indexOf("computer"),str.includes("computer"),str.startsWith("Euro"),str.endsWith("script"))
console.log(str.slice(-6,))
console.log("\n")