import useMutation from "../api/useMutation";

export default function FacultyForm() {
  const {
    mutate: add,
    loading,
    error,
  } = useMutation("POST", "/faculties", ["faculties"]);

  const addFaculty = (formData) => {
    const name = formData.get("name");
    const description = formData.get("description");
    add({ name, description });
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
          Bio
          <input type="text" name="bio" required />
        </label>
        <label>
          Department
          <input type="text" name="departmentt" required />
        </label>
        <label>
          Contact
          <input type="text" name="contact" required />
        </label>
        <button>{loading ? "Adding..." : "Add faculty"}</button>
        {error && <output>{error}</output>}
      </form>
    </div>
  );
}
