import { useAuth } from "../auth/AuthContext";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";

export default function DepartmentList() {
  const {
    data: departments,
    loading,
    error,
  } = useQuery("/departments", "departments");

  if (loading || !departments) return <p>Loading...</p>;
  if (error) return <p>Sorry! {error}</p>;

  return (
    <ul>
      {departments.map((department) => (
        <DepartmentListItem key={department.id} department={department} />
      ))}
    </ul>
  );
}

function DepartmentListItem({ department }) {
  const { token } = useAuth();
  const {
    mutate: deleteDepartment,
    loading,
    error,
  } = useMutation("DELETE", "/departments/" + department.id, ["departments"]);

  return (
    <li>
      <p>{department.name}</p>
      {token && (
        <button onClick={() => deleteDepartment()}>
          {loading ? "Deleting" : error ? error : "Delete"}
        </button>
      )}
    </li>
  );
}