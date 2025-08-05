import { useAuth } from "../auth/AuthContext";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";

export default function DepartmentList() {
  // const {
  //   data: departments,
  //   loading,
  //   error,
  // } = useQuery("/departments", "departments");

  // if (loading || !departments) return <p>Loading...</p>;
  // if (error) return <p>Sorry! {error}</p>;

  /* TEMPORARY HARD CODING */
const departments = [
    {
      id: 1,
      name: "Fire Nation",
      description: "Driven by ambition and passion, the Fire Nation department empowers students to harness their inner flame with discipline and purpose. Here, raw energy becomes refined power, shaped through leadership training, strategy, and self-mastery. The department encourages calculated risk-taking, innovation, and the courage to spark change where it’s needed most.",
    },
    {
      id: 2,
      name: "Water Tribe",
      description: "With a focus on adaptability and healing, the Water Tribe department teaches students to flow with life’s currents while nurturing both community and self. Through studies in cultural preservation, spiritual practices, and emotional intelligence, students are trained to restore, connect, and evolve. Empathy and flexibility are at the core of every lesson.",
    },
    {
      id: 3,
      name: "Earth Kingdom",
      description: "Rooted in endurance and tradition, the Earth Kingdom department values resilience, discipline, and a steady mind. Students learn to stand firm in their beliefs, navigate challenges with inner strength, and ground their decisions in reality. From seismic detection to diplomacy, our curriculum is designed to cultivate balance and unwavering resolve in both thought and action.",
    },
    {
      id: 4,
      name: "Air Nomads",
      description: "Dedicated to spiritual growth and freedom of thought, the Air Nomads department nurtures curiosity, peace, and non-attachment. Students explore philosophy, nonviolent intervention, and creativity through experiential learning. Light-hearted but wise, this department emphasizes personal enlightenment, harmony with nature, and the pursuit of joy.",
    },
  ];

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

      <div className="button-group">
        <button className="view-btn">View Info</button>
        {token && (
          <>
            <button className="edit-btn">Edit Information</button>
            <button className="delete-btn" onClick={deleteDepartment}>
              {loading ? "Deleting..." : error ? error : "Delete Information"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
