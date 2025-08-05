import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { usePage } from "./PageContext";

export default function Navbar() {
  const { token, logout } = useAuth();
  const { setPage } = usePage();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <p className="logo" onClick={() => setPage("home")}>
        Elemental Academy
      </p>

      <button
        className="menubutton"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle Menu"
      >
        <img src="/images/hamburger-icon.png" alt="menu icon" />
      </button>

  
      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <a onClick={() => setPage("home")}>Home</a>
        <a onClick={() => setPage("departments")}>Departments</a>
        <a onClick={() => setPage("faculties")}>Faculties</a>
        {token ? (
          <a onClick={logout}>Log out</a>
        ) : (
          <>
            <a onClick={() => setPage("register")}>Register</a>
            <a onClick={() => setPage("login")}>Login</a>
          </>
        )}
      </nav>
    </header>
  );
}
