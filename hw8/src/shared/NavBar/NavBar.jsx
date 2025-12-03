import { NavLink, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

export default function NavBar() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await signOut(auth);
      navigate("/login");       
    } catch (err) {
      console.error("Logout error:", err);
    }
  }
  return (
    <nav className="nav">
      <div className="nav__inner">
        <ul className="nav__links">
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/users">Users</NavLink></li>
          {loading ? (null) : user ? (
            <>
              <li><NavLink to="/profile">Profile</NavLink></li>
              <li>
                <button type="button" className="nav__logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><NavLink to="/login">Login</NavLink></li>
              <li><NavLink to="/signup">Signup</NavLink></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
