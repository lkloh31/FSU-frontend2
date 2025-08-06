import useQuery from "../api/useQuery";

export default function DepartmentDetails({ id }) {
  const {
    data: department,
    loading: deptLoading,
    error: deptError,
  } = useQuery(`/departments/${id}`, `department-${id}`);

  const {
    data: faculty,
    loading: facLoading,
    error: facError,
  } = useQuery(`/departments/${id}/faculties`, `faculty-${id}`);

  if (deptLoading || facLoading) return <p>Loading...</p>;
  if (deptError || facError) return <p>Error loading department info.</p>;
  if (!department) return <p>Department not found.</p>;

  return (
    <div className="department-details">
      <h2>{department.name}</h2>
      <img
        src={`/images/${department.name.toLowerCase().replace(" ", "")}.png`}
        alt={`${department.name} icon`}
        className="department-banner"
      />
      <p className="department-description">{department.description}</p>

      <h3>Faculty</h3>
      <div className="faculty-list">
        {faculty?.map((prof) => (
          <div key={prof.id} className="faculty-card">
            <img src={prof.profile_img} alt={prof.name} className="faculty-img" />
            <div className="faculty-info">
              <strong>{prof.name}</strong>
              <p>{prof.title}</p>
              <p>{prof.sub_department}</p>
              <p>{prof.bio}</p>
              <p>{prof.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
