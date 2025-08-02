import { useAuth } from "../auth/AuthContext";

import DepartmentList from "./DepartmentList";
import DepartmentForm from "./DepartmentForm";

export default function DepartmentsPage() {
  const { token } = useAuth();

  return (
    <>
      <h1>Departments</h1>
      <DepartmentList />
      {token && <DepartmentForm />}
    </>
  );
}
