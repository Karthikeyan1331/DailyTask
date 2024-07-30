import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { GET_USERS_FETCH } from "./actions";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Read from './curd/Read';
import Create from './curd/Create';
import Update from './curd/Update';
function App() {
  const myDispatch = useDispatch();
  const [datas, setData] = useState()
  const retrivedData = useSelector((state) => {
    return state.myReducer;
  });
  useEffect(()=>{
    setData(retrivedData)
  },[retrivedData])
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Read />}></Route>
          <Route path='/Create' element={<Create />}></Route>
          <Route path='/Update/:id' element={<Update />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
