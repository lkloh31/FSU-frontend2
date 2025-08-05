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
    <li
      className={`faculty-card ${
        faculty.department_id === 1
          ? "fire-nation"
          : faculty.department_id === 2
          ? "water-tribe"
          : faculty.department_id === 3
          ? "air-nomads"
          : faculty.department_id === 4
          ? "earth-kingdom"
          : ""
      }`}
    >
      <div className="faculty-avatar">{getInitials(faculty.name)}</div>
      <div className="faculty-info">
        <h3 className="faculty-name">{faculty.name}</h3>
        <p className="faculty-department">{faculty.sub_department}</p>
        <p className="faculty-title">{faculty.title}</p>
        <p className="faculty-bio">{faculty.bio}</p>
        <p className="faculty-contact">{faculty.email}</p>
      </div>
      {token && (
        <button className="delete-faculty-btn" onClick={handleDelete}>
          {loading ? "Deleting" : error ? error : "Delete"}
        </button>
      )}
    </li>
  );
}
