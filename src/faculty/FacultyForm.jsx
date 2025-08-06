import useMutation from "../api/useMutation";

export default function FacultyForm({ onClose, onSuccess }) {
  const {
    mutate: add,
    loading,
    error,
  } = useMutation("POST", "/faculties", ["faculties"]);

  const addFaculty = async (formData) => {
    const name = formData.get("name");
    const title = formData.get("title");
    const sub_department = formData.get("sub_department");
    const bio = formData.get("bio");
    const email = formData.get("email");
    const department_id = parseInt(formData.get("department_id"), 10);
    const profile_img = "https://placeholdit.com/400x400/dddddd/999999";
    // add({
    //   name,
    //   title,
    //   sub_department,
    //   profile_img,
    //   bio,
    //   email,
    //   department_id,
    // });
    console.log("Sending data:", {
      name,
      title,
      sub_department,
      profile_img,
      bio,
      email,
      department_id,
    });

    try {
      await add({
        name,
        title,
        sub_department,
        profile_img,
        bio,
        email,
        department_id,
      });
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error("Add faculty error:", err);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose} type="button">
          <img
            src="/images/close-button.png"
            alt="Close"
            className="modal-close-icon"
          />
        </button>

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
              <input type="number" name="department_id" required />
            </label>
            <button>{loading ? "Adding..." : "Add faculty"}</button>
            {error && <output>{error}</output>}
          </form>
        </div>
      </div>
    </div>
  );
}
