import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../pages/Layout";
// import "../App.css";
import Home from "./Home";
import ProtectedRoutesLayout from "../pages/ProtectedRoutesLayout";
import About from "./About";
import AddUser from "../routes/AddUser";
import Profile, { action as addPetAction } from "../routes/Profile";
import Login, { action as loginAction } from "../routes/Login";
import PetProfile1 from "../routes/PetProfile1";
import Error from "../pages/Error";
import Logout, {loader as logoutLoader} from "./Logout";
import { useAuth } from "../AuthContext";
import AddHistory from "../components/AddHistory";
import History from "../pages/History";

const Routes = () => {
  const { isAuth } = useAuth();

  const publicRoutes = [
    {
      element: <Layout />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/users/add",
          element: <AddUser />,
          // action: addUserAction,
        },
        {
          path: "/login",
          element: <Login />,
          action: loginAction,
          
        },
        {
            path: "/logout",
            element: <Logout/>,
            loader: logoutLoader,
        },
     
        {
          path: '/history',
          element: <History/>,
        },
        {
          path: '/addhistory',
          element: <AddHistory/>
        }
      
      
      ],
    },
  ];

  const protectedRoutes = [
    {
      element: <ProtectedRoutesLayout />,
      errorElement: <Error />,
      children: [
        {
          path: "/profile",
          element: <Profile  />,
          action: addPetAction,
        },

        {
          path: "/petprofile1",
          element: <PetProfile1 />,
        },
      ],
    },
  ];

  const router = createBrowserRouter([
    ...publicRoutes,
    ...(!isAuth ? protectedRoutes : []),
    ...protectedRoutes,
  ]);
  return <RouterProvider router={router} />;
};

export default Routes;
