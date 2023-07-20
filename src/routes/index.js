import React, { lazy } from "react";
import { WrapperElement } from "./WrapperElement";

const Posts = WrapperElement(lazy(() => import("../views/posts/index")));
const Login = WrapperElement(lazy(() => import("../views/pages/login/Login")));
const Register = WrapperElement(lazy(() => import("../views/pages/register/Register")));

export const authenticatedRoutes = [
  { path: '/', exact: true, name: 'Dashboard' },
  { path: '/post', name: 'Post', element: <Posts /> },
]

export const unAuthenticatedRoutes = [
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
];