// React Router
import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Error from "./pages/error";
import Home from "./pages/home";
import Transfer from './pages/transaction'
import NewClient from './pages/newClient'
import ListClients from "./pages/listClients";
import ViewClient from "./pages/viewClient";


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
    path: "/newClient",
    element: <NewClient />,
  },
   {
    path: "/listClients",
    element: <ListClients />,
  },
  {
    path: "/viewClient",
    element: <ViewClient />,
  },
]);

export default router;
