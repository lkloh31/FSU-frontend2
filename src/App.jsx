import "./App.css";

import { usePage } from "./layout/PageContext";

import Register from "./auth/Register";
import Login from "./auth/Login";
import DepartmentsPage from "./department/DepartmentsPage";
import FacultiesPage from "./faculty/FacultiesPage";
import HomePage from "./home/HomePage";
import Error404 from "./Error404.jsx";
import DepartmentDetails from "./department/DepartmentDetails";



export default function App() {
  const { page } = usePage();

  if (page === "register") return <Register />;
  if (page === "login") return <Login />;
  if (page === "departments") return <DepartmentsPage />;
  if (page === "faculties") return <FacultiesPage />;
  if (page === "home") return <HomePage />;

  if (page === "firenation") return <DepartmentDetails id={1} />;
  if (page === "watertribe") return <DepartmentDetails id={2} />;
  if (page === "airnomads") return <DepartmentDetails id={3} />;
  if (page === "earthkingdom") return <DepartmentDetails id={4} />;


  return <Error404 />;
}

