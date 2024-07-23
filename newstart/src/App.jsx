
import React from 'react';
import './App.css';
import Create from './Create';
import Home from './Home';
import Update from './Update';
import ExampleComponent from './Testing';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TanStackTable from './TableS/TanStackTable';
export const Context = React.createContext();
function App() {
  const [signedIn, setSignedIn] = React.useState(false)
  return (
    <Context.Provider value={[signedIn, setSignedIn]}>
      <h1>{signedIn ? "SignIn" : "SignOut"}</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/Create' element={<Create />}></Route>
          <Route path='/Update' element={<Update />}></Route>
          <Route path='/TanStackTable' element={<TanStackTable />}></Route>
          <Route path='/SagaTest' element={<ExampleComponent />}></Route>
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
