import useMutation from "../api/useMutation";

export default function DepartmentForm() {
  const {
    mutate: add,
    loading,
    error,
  } = useMutation("POST", "/departments", ["departments"]);

  const addDepartment = (formData) => {
    const name = formData.get("name");
    const description = formData.get("description");
    add({ name, description });
  };

  return (
    <>
      <h2>Add a new department</h2>
      <form action={addDepartment}>
        <label>
          Name
          <input type="text" name="name" />
        </label>
        <label>
          Description
          <input type="text" name="description" />
        </label>
        <button>{loading ? "Adding..." : "Add department"}</button>
        {error && <output>{error}</output>}
      </form>
    </>
  );
}
