import AddTask from "../Component/AddTask";
import CompletedTasks from "../Component/CompletedTasks";
import Error from "../Component/Error";
import Login from "../Component/Login";
import Main from "../Component/Main";
import MyTask from "../Component/MyTask";
import Signup from "../Component/Signup";
import Update from "../Component/Update";
import PrivateRouter from "./PrivateRouter";

const { createBrowserRouter } = require("react-router-dom");

export const Router = createBrowserRouter([
    {
        path: '*',
        element: <Error></Error>
    },
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <PrivateRouter><AddTask></AddTask></PrivateRouter>
            },
            {
                path: '/mytask',
                element: <PrivateRouter><MyTask /></PrivateRouter>
            },
            {
                path: '/completedtask',
                element: <PrivateRouter><CompletedTasks /></PrivateRouter>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },
            {
                path: '/edit/:id',
                element: <Update></Update>
            }
        ]
    }
])