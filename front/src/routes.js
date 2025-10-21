// React Router
import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Error from "./pages/error";
import Savings from "./pages/savings";
import GetSavings from "./pages/savings/get";
import Investments from "./pages/investments";
import GetInvestments from "./pages/investments/get";
import Transfer from "./pages/transaction";
import NewClient from "./pages/newClient";
import ListClients from "./pages/listClients";
import ViewClient from "./pages/viewClient";
import Statement from "./pages/statement";

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
    path: "/viewClient",
    element: <ViewClient />,
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
    path: "/savings/get",
    element: <GetSavings />,
  },
  {
    path: "/investments",
    element: <Investments />,
  },
  {
    path: "/investments/get",
    element: <GetInvestments />,
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
  {
    path: "/statement",
    element: <Statement />,
  },
]);

export default router;
