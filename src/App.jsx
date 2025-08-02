import "./App.css";

import { usePage } from "./layout/PageContext";

import Register from "./auth/Register";
import Login from "./auth/Login";
import DepartmentsPage from "./department/DepartmentsPage";
import FacultiesPage from "./faculty/FacultiesPage";
import HomePage from "./home/HomePage";
import Error404 from "./Error404.jsx";

export default function App() {
  const { page } = usePage();

  if (page === "register") return <Register />;
  if (page === "login") return <Login />;
  if (page === "departments") return <DepartmentsPage />;
  if (page === "faculties") return <FacultiesPage />;
  if (page === "home") return <HomePage />;

  return <Error404 />;
}
