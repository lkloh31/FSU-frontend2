import { useAuth } from "../auth/AuthContext";
import { usePage } from "../layout/PageContext";
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
     <div className="departments-list">
      {departments.map((department) => (
        <DepartmentListItem key={department.id} department={department} />
      ))}
    </div>
  );
}

function DepartmentListItem({ department }) {
  const { token } = useAuth();
  const { setPage } = usePage();
  
  const {
    mutate: deleteDepartment,
    loading,
    error,
  } = useMutation("DELETE", "/departments/" + department.id, ["departments"]);

  const iconMap = {
    "Earth Kingdom": "/images/earth.png",
    "Fire Nation": "/images/fire.png",
    "Water Tribe": "/images/water.png",
    "Air Nomads": "/images/air.png",
  };
  const icon = iconMap[department.name] || null;

  const className =
    "department-card " + department.name.toLowerCase().replace(/\s+/g, "-");

const handleViewInfo = () => {
    const pageKey = department.name.toLowerCase().replace(/\s+/g, "");
    setPage(pageKey); 
  };

  return (
    <div className={className}>
      <div className="department-header">
        {icon && (
          <img
            src={icon}
            alt={`${department.name} symbol`}
            className="department-icon"
          />
        )}
        <h3 className="department-title">{department.name}</h3>
      </div>

      <p className="department-description">{department.description}</p>

      <div className="button-row">
        <div className="view-button-wrapper">
          <button
            onClick={handleViewInfo} 
            className={`view-btn ${department.name.toLowerCase().replace(" ", "-")}-btn`}
          >
            View Info
          </button>
        </div>

        {token && (
          <div className="admin-button-group">
            <button
              className="edit-btn"
              onClick={() =>
                alert(`Edit form for ${department.name} (not implemented)`)
              }
            >
              Edit Information
            </button>
            <button className="delete-btn" onClick={deleteDepartment}>
              {loading
                ? "Deleting..."
                : error
                ? error
                : "Delete Information"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}