import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './app/store'
import TodoList from './ToDoList/TodoList';
import { Provider } from 'react-redux'

import {
  createBrowserRouter,
  RouterProvider,
  Route
} from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/ToDoList",
    element: <TodoList />
  },
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
