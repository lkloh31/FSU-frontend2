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
    <>
      <h2>Add a new faculty</h2>
      <form action={addFaculty}>
        <label>
          Name
          <input type="text" name="name" />
        </label>
        <label>
          Description
          <input type="text" name="description" />
        </label>
        <button>{loading ? "Adding..." : "Add faculty"}</button>
        {error && <output>{error}</output>}
      </form>
    </>
  );
}
