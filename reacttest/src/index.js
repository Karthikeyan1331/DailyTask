import React from 'react'
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import Mainpage from './pagination/Mainpage';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    createBrowserRouter,
    RouterProvider
  } from "react-router-dom";
const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>
    },
    {
        path:"/Pagination",
        element:<Mainpage/>
    },
    
])
const root = createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router}/>
);
