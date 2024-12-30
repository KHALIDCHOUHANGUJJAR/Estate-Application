import About from "../Pages/About";
import Dashboard from "../Pages/Dashboard";
import Home from "../Pages/Home";
import Profile from "../Pages/Profile";
import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";

export const My_routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/SingIn",
    element: <SignIn />,
  },
  {
    path: "/SignUp",
    element: <SignUp />,
  },
  {
    path: "/About",
    element: <About />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
];
