import React from 'react'
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import Mainpage from './pagination/Mainpage';
import NavbarContent from './NavbarContent';
import CommanBtn from './button/CommanBtn';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/Pagination",
        element: <Mainpage />
    },
    {
        path: "/button",
        element: <CommanBtn />
    },

])
const root = createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <NavbarContent />
        <RouterProvider router={router} />
    </React.StrictMode>
);
