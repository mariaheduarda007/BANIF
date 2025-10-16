// React Router
import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Error from "./pages/error";
import Home from "./pages/home";
import Transfer from './pages/transaction'
import Savings from './pages/savings'
import Investments from './pages/investments'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/error",
    element: <Error />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/transfer",
    element: <Transfer />,
  },
  {
    path: "/savings",
    element: <Savings />,
  },
  {
    path: "/investments",
    element: <Investments/>,
  },
]);

export default router;
