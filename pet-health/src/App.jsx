
// import {createBrowserRouter, RouterProvider} from 'react-router-dom';
// import Layout from './pages/Layout';
// import './App.css'
// import Home from './routes/Home'
// import About from './routes/About';
// import AddUser, {action as addUserAction} from './routes/AddUser';
// import Profile, {action as addPetAction} from './routes/Profile';
// import Login, {action as loginAction} from './routes/Login';
// import PetProfile1 from './routes/PetProfile1';


// const router = createBrowserRouter([
//   {

//     element: <Layout/>,
//     children:[

//       {

//       path: '/',
//       element: <Home/>
//       },
//       {

//       path: '/about',
//       element: <About/>,
//       },
//       {
//         path: '/users/add',
//         element: <AddUser/>,
//         action: addUserAction,
//       },
//       {
//         path: '/profile',
//         element: <Profile/>,
//         action: addPetAction,
//       },
//       {
//         path: '/login',
//         element: <Login/>,
//         action: loginAction,
//       },
//         {
//           path: '/petprofile1',
//           element: <PetProfile1/>,
//         }

     
//     ]
//   }
// ])


// function App() {
//   return <RouterProvider router = {router}/>

 
// }

// export default App




import Routes from './routes/Routes'


import './App.css'

function App() {
  return(
    <Routes/>
  );
}

export default App