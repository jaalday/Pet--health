// import { useState } from 'react'


import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Layout from './pages/Layout';
import './App.css'
import Home from './routes/Home'
import About from './routes/About';
import AddUser, {action as addUserAction} from './routes/AddUser';
import Profile from './routes/Profile';
import Login from './routes/Login';


const router = createBrowserRouter([
  {

    element: <Layout/>,
    children:[

      {

      path: '/',
      element: <Home/>
      },
      {

      path: '/about',
      element: <About/>,
      },
      {
        path: '/users/add',
        element: <AddUser/>,
        action: addUserAction,
      },
      {
        path: '/profile',
        element: <Profile/>,
      },
      {
        path: '/login',
        element: <Login/>,
      }

     
    ]
  }
])









function App() {
  return <RouterProvider router = {router}/>

 
}

export default App
