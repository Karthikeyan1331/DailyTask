console.log("\n")

word = "We Will We Will Rock Y|o_u!(3)"
let reg = new RegExp(`We`, `gi`)
let tag = "I love pdf"
let regexp = new RegExp(`<${tag}>`);
console.log(regexp)
let result = word.replace(reg, "we")
console.log(result)
reg = new RegExp(`\\b\\w+\\b`,'g')
console.log(word.replace(reg, '($&)'))
str = "+7(90_3)-1ae23 4ioq5-67"
console.log(str.match(/\s|\d|[aeiou]/g).join(""))
str = "+7(903)-123-45-67"
console.log(str.replace(/\W/g,","),"A\nB A\nB".match(/A.B/gs))
console.log("A\n\n\nB".match(/A.*B/gs))
//character match using the unicode
str = "A ბ ₹ $ 123 123452 #124236";
console.log(str.match(/\p{L}|\p{Sc}|#\p{Hex_Digit}{6}\b|\d{3}/gu))
let goodInput = "12:34";
let badInput = "12:34";
//full matched ^-start $-end
console.log(badInput.match(/^\d\d:\d\d$/))
// multiline (m)
str = `1st place: Winnie
2nd place: Piglet
3rd place: Eeyore`;
console.log(str.match(/^\d/gm))
//word bountry \b\b
str = "@gh gh WW qs!@"
console.log(str.match(/@$/g))
//Find the time as hh:mm or hh-mm
regexp = /\d{2}[-:]\d{2}/g
console.log("Breakfast at 09:00 . Dinner at 21-30@#".match(regexp))
regexp = /.{3,}/g;
console.log( "Hello!... How goes?.....".match(regexp) );
str = "color:#121212; background-color:#AA00ef bad-colors:f#fddee #fd2 #12345678";
regexp = /#\p{Hex_Digit}{6}\b/gu;
console.log( str.match(regexp) );
console.log("\n")

console.log("02/07/2024\n")
str = 'a `witch` and her broom` with is one \n a `witch` and her broom` with is one';
regexp = /\`.*\`/g
console.log(str.match(regexp))
regexp = /\<.+?\>/gs;
str = `... <!-- My -- comment 
 test --> ..  <!----> ..`;
console.log( str.match(regexp) )

regexp = /<[^<>]+>/gs;
str = '<> <a href="/"> <input type="radio" checked> <b>';
console.log( str.match(regexp) )

let arr=["karthikeyansrinivasalu@gamil.com", "gmail.com","@gmail.com","karthi@gmail.in"]
regexp = /(.{3,}?)+@(.{3,}?)+.(\w{2,}?)/g
arr.forEach(element => {
    if(regexp.test(element))
        console.log(element)
});

regexp = /[0-9a-f]{2}(:[0-9a-f]{2}){5}/gi;
console.log( regexp.test('01:32:54:67:89:AB') ); // true

regexp = /(#\p{Hex_Digit}{3}\b)|(#\p{Hex_Digit}{6}\b)/gu;
str = "color: #3f3; background-color: #AA00ef; and: #wertye;";
console.log( str.match(regexp) );

regexp = /([-|+]*(\d*[.]\d+))|[-|+]*(\d+)/g;
str = "-1.5 0 2 -123.4 -.5";
console.log( str.match(regexp) );

regexp=/\-?\d+(\.\d+)?|[-+*/]/g
let [a, op, b] = "-3 / -6".match(regexp);
console.log(a,op,b)

regexp = /\[(url|b|quote|div)\].*?\[\/\1\]/gs;
str = `[div][div]text[/div][/div]`;
console.log( str.match(regexp) );

regexp = /<style(>|\s.*?>)/gs;
str = `<style> <styler> <style test="...">`;
console.log( str.match(regexp) );

regexp = /(?<![-\d+])\d+/gs;
str = `0 12 -5 123 -18 `;
console.log( str.match(regexp) );
// Write a JavaScript program to check a credit card numbe
regexp = /([0-9]{4})\s([0-9]{4})\s([0-9]{4})\s([0-9]{4})/gs;
str = `5415 9052 3492 1234 `;
console.log( str.match(regexp) );
// Write a pattern that matches e-mail addresses.
regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g
str = `k-arthikeyan@gmail.com`;
console.log( str.match(regexp) );
// Write a JavaScript program to search a date within a string.
regexp = /\b(3[01]|[12][0-9]|0?[1-9])[\/\-\:](1[0-2]|0?[1-9])[\/\-\:]([0-9]{4})\b/g
str = `Extrating the date in the sentence 31/02/2024 01-01-1970 01:01:1970`;
console.log( str.match(regexp) );
// Write a JavaScript program that works as a regular expression trim function (string).
regexp = /^\s+|\s$/g
str = ` w3res ource  `;
console.log( str.replace(regexp,'')+"test" );
console.log("\n") 