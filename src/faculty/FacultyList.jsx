import { useAuth } from "../auth/AuthContext";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";

export default function FacultyList() {
  const {
    data: faculties,
    loading,
    error,
  } = useQuery("/faculties", "faculties");

  if (loading || !faculties) return <p>Loading...</p>;
  if (error) return <p>Sorry! {error}</p>;

  return (
    <ul>
      {faculties.map((faculty) => (
        <FacultyListItem key={faculty.id} faculty={faculty} />
      ))}
    </ul>
  );
}

function FacultyListItem({ faculty }) {
  const { token } = useAuth();
  const {
    mutate: deleteFaculty,
    loading,
    error,
  } = useMutation("DELETE", "/faculties/" + faculty.id, ["faculties"]);

  return (
    <li>
      <p>{faculty.name}</p>
      {token && (
        <button onClick={() => deleteFaculty()}>
          {loading ? "Deleting" : error ? error : "Delete"}
        </button>
      )}
    </li>
  );
}
