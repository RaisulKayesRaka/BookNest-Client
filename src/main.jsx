import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import { HelmetProvider } from "react-helmet-async";
import Home from "./pages/Home.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import AllBooks from "./pages/AllBooks.jsx";
import BorrowedBooks from "./pages/BorrowedBooks.jsx";
import LogIn from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AuthProvider from "./provider/AuthProvider.jsx";
import PrivateRoute from "./PrivateRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/categories/:category",
        element: <CategoryPage />,
      },
      {
        path: "/all-books",
        element: (
          <PrivateRoute>
            <AllBooks />
          </PrivateRoute>
        ),
      },
      {
        path: "/borrowed-books",
        element: (
          <PrivateRoute>
            <BorrowedBooks />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>,
);
