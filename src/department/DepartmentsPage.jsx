import { useAuth } from "../auth/AuthContext";

import DepartmentList from "./DepartmentList";
import DepartmentForm from "./DepartmentForm";

export default function DepartmentsPage() {
  const { token } = useAuth();

  return (
  <div className="departments-page">
    <div className="departments-header">
      <h1 className="departments-title">Departments</h1>
      <div className="element-icons">
        <img src="/images/earth.png" alt="Earth" />
        <img src="/images/fire.png" alt="Fire" />
        <img src="/images/water.png" alt="Water" />
        <img src="/images/air.png" alt="Air" />
      </div>
    </div>

    <DepartmentList />
    {token && <DepartmentForm />}
  </div>
);
}