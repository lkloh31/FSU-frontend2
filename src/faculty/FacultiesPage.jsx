import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

import FacultyList from "./FacultyList";
import FacultyForm from "./FacultyForm";

export default function FacultiesPage() {
  const { token } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);

  const handleOpenAddForm = () => {
    setShowAddForm(true);
  };

  const handleCloseAddForm = () => {
    setShowAddForm(false);
  };

  return (
    <>
      <h1>Faculties</h1>
      <FacultyList onAddFaculty={handleOpenAddForm} />
      {token && showAddForm && (
        <FacultyForm
          onClose={handleCloseAddForm}
          onSuccess={handleCloseAddForm}
        />
      )}
    </>
  );
}
