class SLinkedList {
    constructor(val, next = null) {
        this.val = val
        this.next = next
    }
}

class SinglyLinkedList {
    constructor() {
        this.head = null
        this.size = 0
    }
    createLinkedList(data) {
        this.head = new SLinkedList(data[0])
        this.size++
        let cur = this.head
        for (let k of data.slice(1)) {
            let node = new SLinkedList(k)
            cur.next = node
            cur = cur.next
            this.size++
        }
        return
    }
    display() {
        let node = this.head
        while (node) {
            console.log(node.val)
            node = node.next
        }
    }
    deleteValue() {

    }
    delete(index = this.size - 1) {
        if (index == 0) {
            this.head = this.head.next
            this.size--
            return
        }
        if (index >= this.size)
            return
        let cur = this.head
        if (this.size - 1 == index) {
            while (cur.next.next)
                cur = cur.next
            cur.next = null
            this.size--
            return
        }
        while (--index)
            cur = cur.next
        cur.next = cur.next.next
        this.size--
        return
    }
    insert(data, index = this.size - 1) {
        let node = new SLinkedList(data)
        let cur = this.head
        if (index == 0) {
            insertFirst(data)
            return
        }
        if (index == this.size - 1) {
            while (cur.next)
                cur = cur.next
            cur.next = node
            this.size++
            return
        }
        if (index >= this.size) {
            console.log("Sorry it not possible"); return
        }
        while (--index)
            cur = cur.next;
        [node.next, cur.next] = [cur.next, node]
        this.size++;
        return
    }
    insertFirst(data) {
        let node = new SLinkedList(data)
        node.next = this.head
        this.head = node
        this.size++
        return
    }
    updateIndex(data, index) {
        if (index >= this.size) {
            console.log("Sorry it not possible"); return
        }
        let cur = this.head
        while (index--)
            cur = cur.next
        cur.val = data
        return
    }

}


let linkList = new SinglyLinkedList
linkList.createLinkedList([1, 2, 3, 4, 5, 6])
linkList.display()
linkList.insert(34, 4)
linkList.insert(36)
linkList.insert(31, 1)
linkList.insertFirst(-12)
linkList.display()
console.log("\n")
linkList.delete(0)
linkList.insert(69)
linkList.insert(69)
linkList.insert(69)
linkList.insert(69)
linkList.delete()
linkList.display()
console.log("\n")
linkList.updateIndex(2323, 11)
linkList.display()
console.log("\n")

// Regex 
const fs = require("fs");

const string_output = fs.readFileSync("./practice/readFile.txt", 'utf8');

console.log(string_output.match(/\b(the)\s+\w+\b/gim));
console.log(string_output.match(/(I(\'|\s)(am|m)?)|(We)|(You)|(They)|(them)|(their)|(that)/gim));
let [one, two, three] = new Set([1, 2, 3]);
console.log(one, two, three)
let arr = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
let [name1, name2, ...rest] = arr
console.log(name1, name2, rest, arr)
let user = { name: "John", years: 30 };
let { name, years: age, isAdmin = false } = user;

console.log(name); // John
console.log(age); // 30
console.log(isAdmin); // false
let salaries = { "John": 100, "Pete": 300, "Mary": 250 };
console.log(Object.entries(salaries).reduce((acc, item) => Math.max(acc, item[1]), 0))
let Jan01_1970 = new Date(0);
console.log(Jan01_1970)
let Jan26_2017 = new Date("2017-01-26");
console.log(Jan26_2017)


let today = new Date();

// Define options for formatting date in IST
const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Asia/Kolkata'
};

// Format the current date to IST string
const formattedISTDate = new Intl.DateTimeFormat('en-GB', options).format(today);
const [datePart, timePart] = formattedISTDate.split(', ');
const [day, month, year] = datePart.split(' ');
const [hours, minutes, seconds] = timePart.split(':');
const monthIndex = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(month);
const istDate = new Date(Date.UTC(year, monthIndex, day, hours , minutes , seconds));
console.log(formattedISTDate);
console.log(istDate-new Date()); 