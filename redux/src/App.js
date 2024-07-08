import React from 'react';
import logo from './logo.svg';
import { Counter } from './app/Counter';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className='relative w-full'>
          <div
            className='absolute top-0 right-0 translate-y-[-10vh] mx-10 text-white font-bold text-center 
          bg-blue-400 px-[1vw] py-[1vh] rounded-lg shadow-xl w-fit 
          cursor-pointer hover:bg-blue-500 transition-all' onClick={()=>{window.location.href="/ToDoList"}}>
            To Do List</div>
        </div>
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
      </header>
    </div>
  );
}

export default App;
