import { useAuth } from "../auth/AuthContext";

import FacultyList from "./FacultyList";
import FacultyForm from "./FacultyForm";

export default function FacultiesPage() {
  const { token } = useAuth();

  return (
    <>
      <h1>Faculties</h1>
      <FacultyList />
      {token && <FacultyForm />}
    </>
  );
}
