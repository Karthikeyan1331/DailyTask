import React from 'react'
import './App.css';
import Car from './Car';
import NavbarContent from './NavbarContent';

function App() {
  var person = {
    name: "Jason",
    talk() {
      setTimeout(function () {
        console.log("this", this)
      }, 1000);
    },
  };
  person.talk()
  // let vs var vs const
  const Test = () => {
    if (true) {
      var i = 2
      console.log(`Inside ${i}`)
    }
    console.log(`Outside ${i}`)
  }
  Test()
  if (true) {
    var test = true; // use "var" instead of "let"
  }

  console.log(test);
  const Person = {
    name: "karthikeyan", age: 22,
    hiFunc() {
      console.log(this)
    }
  }
  const hi = Person.hiFunc.bind(Person)
  hi()

  return (
    <React.Fragment>
      <NavbarContent />
      <main className="container">
        <h1>Hello guys!</h1>
        <Car />
      </main>
    </React.Fragment>
  );
}

export default App;
