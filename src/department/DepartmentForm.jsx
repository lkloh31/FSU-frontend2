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
    const banner_img = "https://placeholdit.com/400x400/dddddd/999999";
    add({ name, banner_img, description });
  };

  return (
    <>
      <h2 className="form-heading">Add a new department</h2>
      <form action={addDepartment} className="department-form">
        <div className="department-form-fields">
          <label>
            Name
            <input type="text" name="name" />
          </label>
          <label>
            Description
            <input type="text" name="description" />
          </label>
          <button>{loading ? "Adding..." : "Add department"}</button>
        </div>
        {error && <output className="form-error">{error}</output>}
      </form>
    </>
  );
}
