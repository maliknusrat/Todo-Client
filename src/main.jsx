import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Main from "./Layout/Main";
import SignIn from "./Pages/Authentication/SignIn/SignIn";
import SignUp from "./Pages/Authentication/SignUp/SignUp";
import AuthProvider from "./Pages/Provider/AuthProvider";
import HomePage from "./Pages/Home/HomePage";

import ProfileLayout from './Layout/ProfileLayout';
import MyToDo from './Pages/Profile/MyToDo/MyToDo';
import AddTODO from './Pages/Profile/AddTODO/AddTODO';
import UserProfile from "./Pages/Profile/UserProfile/UserProfile";
import UpdateTask from "./Pages/Profile/UpadateTask/UpdateTask";
import TodayTask from "./Pages/Profile/TodayTask/TodayTask";
import Upcomming from "./Pages/Profile/Upcomming/Upcomming";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        path: "/signIn",
        element: <SignIn></SignIn>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
    ],
  },
  {
    path: "/profile",
    element: <ProfileLayout></ProfileLayout>,
    children:[
      {
        path: "mytodo",
        element:<MyToDo></MyToDo> ,
      },
      {
        path: "addTodo",
        element:<AddTODO></AddTODO> ,
      },
      {
        path: "today",
        element:<TodayTask></TodayTask> ,
      },
      {
        path: "upcomming",
        element:<Upcomming></Upcomming> ,
      },
      {
        path: "userProfile/:email",
        element:<UserProfile></UserProfile> ,
      },
      {
        path: "updateTask/:id",
        element:<UpdateTask></UpdateTask> ,
      },
    ],
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </AuthProvider>
);
