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
    <ul className="faculty-list">
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

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${faculty.name}?`)) {
      deleteFaculty();
    }
  };

  return (
    <li className="faculty-card">
      <div className="faculty-avatar">{getInitials(faculty.name)}</div>
      <div className="faculty-info">
        <h3 className="faculty-name">{faculty.name}</h3>
        <p className="faculty-department">{faculty.department}</p>
        <p className="faculty-title">{faculty.bio}</p>
        <p className="faculty-contact">{faculty.contact}</p>
      </div>
      {token && (
        <button onClick={() => deleteFaculty()}>
          {loading ? "Deleting" : error ? error : "Delete"}
        </button>
      )}
    </li>
  );
}
