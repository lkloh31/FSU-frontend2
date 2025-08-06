import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";
import { useAuth } from "../auth/AuthContext";
import { usePage } from "../layout/PageContext";

export default function FacultyDetails() {
  const { token } = useAuth();
  const { pageData } = usePage();

  const facultyId = pageData;

  const {
    data: faculties,
    loading,
    error,
  } = useQuery("/faculties", "faculties");

  const faculty = faculties?.find((fac) => fac.id === facultyId);

  const {
    mutate: deleteFaculty,
    loading: deleteLoading,
    error: deleteError,
  } = useMutation("DELETE", `/faculties/${facultyId}`, ["faculties"]);

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

  const handleEdit = () => {
    console.log("Edit faculty:", faculty.name);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Sorry! {error}</p>;
  if (!facultyId) return <p>No faculty selected</p>;
  if (!faculty) return <p>Faculty not found</p>;

  return (
    <div className="faculty-details">
      <div
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
        {token && (
          <button
            className="delete-faculty-btn close-button"
            onClick={handleDelete}
            disabled={deleteLoading}
          >
            <img
              src="/images/close-button.png"
              alt="Delete"
              className="close-button-icon"
            />
          </button>
        )}
        <div className="faculty-avatar">
          {faculty.department_id ? (
            <img
              src={`/images/${
                faculty.department_id === 1
                  ? "fire"
                  : faculty.department_id === 2
                  ? "water"
                  : faculty.department_id === 3
                  ? "air"
                  : faculty.department_id === 4
                  ? "earth"
                  : ""
              }.png`}
              alt={`${
                faculty.department_id === 1
                  ? "Fire Nation"
                  : faculty.department_id === 2
                  ? "Water Tribe"
                  : faculty.department_id === 3
                  ? "Air Nomads"
                  : faculty.department_id === 4
                  ? "Earth Kingdom"
                  : "Department"
              } Avatar`}
              className="avatar-image"
            />
          ) : (
            getInitials(faculty.name)
          )}
        </div>
        <div className="faculty-info">
          <h3 className="faculty-name">{faculty.name}</h3>
          <p className="faculty-department">{faculty.sub_department}</p>
          <p className="faculty-title">{faculty.title}</p>
          <p className="faculty-bio">{faculty.bio}</p>
          <p className="faculty-contact">{faculty.email}</p>
        </div>
        {token && (
          <button className="edit-faculty-btn edit-button" onClick={handleEdit}>
            <img
              src="/images/edit-icon.png"
              alt="Edit"
              className="edit-button-icon"
            />
          </button>
        )}
      </div>
    </div>
  );
}
