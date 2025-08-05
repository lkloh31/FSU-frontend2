import useMutation from "../api/useMutation";

export default function FacultyForm() {
  const {
    mutate: add,
    loading,
    error,
  } = useMutation("POST", "/faculties", ["faculties"]);

  const addFaculty = (formData) => {
    const name = formData.get("name");
    const title = formData.get("title");
    const sub_department = formData.get("sub_department");
    const bio = formData.get("bio");
    const email = formData.get("email");
    const department_id = formData.get("department_id");
    add({ name, title, sub_department, bio, email, department_id });
  };

  return (
    <div className="add-faculty">
      <h2 className="faculty-form-heading">Add a new faculty</h2>
      <form className="faculty-form" action={addFaculty}>
        <label>
          Name
          <input type="text" name="name" required />
        </label>
        <label>
          Title
          <input type="text" name="title" required />
        </label>
        <label>
          Sub-Department
          <input type="text" name="sub_department" required />
        </label>
        <label>
          Bio
          <input type="text" name="bio" required />
        </label>
        <label>
          Contact
          <input type="text" name="email" required />
        </label>
        <label>
          Department ID
          <input type="text" name="department_id" required />
        </label>
        <button>{loading ? "Adding..." : "Add faculty"}</button>
        {error && <output>{error}</output>}
      </form>
    </div>
  );
}
