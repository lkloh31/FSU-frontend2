import { useAuth } from "../auth/AuthContext";
import { usePage } from "./PageContext";

export default function Navbar() {
  const { token, logout } = useAuth();
  const { setPage } = usePage();
  return (
    <header>
      <p>Elemental Academy</p>
      <nav>
        <a onClick={() => setPage("departments")}>Departments</a>
        <a onClick={() => setPage("faculties")}>Faculties</a>
        {token ? (
          <a onClick={() => logout()}>Log out</a>
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
