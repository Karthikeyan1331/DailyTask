import React from 'react'
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import Mainpage from './pagination/Mainpage';
import NavbarContent from './NavbarContent';
import CommanBtn from './button/CommanBtn';
import Registration from './ChatApp/Registration';
import Login from './ChatApp/Login'
import ChatWindow from './ChatApp/Home'
import Product from './Product/Home';
import AddToCart from './Product/AddToCart';
import Grab from './Experiment/FunGame';
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
    {
        path: "/ChatRegistration",
        element: <Registration />
    },
    {
        path: "/ChatLogin",
        element: <Login />
    },
    {
        path: "/ChatWindow",
        element: <ChatWindow />
    },
    {
        path: "/Product",
        element: <Product />
    },
    {
        path: "/AddToCart",
        element: <AddToCart />
    },
    {
        path: "/Grab",
        element: <Grab />
    },

])
const root = createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <NavbarContent />
        <RouterProvider router={router} />
    </React.StrictMode>
);
