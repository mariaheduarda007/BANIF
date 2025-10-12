// React Router
import { createBrowserRouter, Navigate} from "react-router-dom"
import Login from './pages/login'
import Error from './pages/error'
import Home from './pages/home'

const router = createBrowserRouter([
    { 
        path: "/", 
        element: <Navigate to="/login" replace />
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
    
])

export default router