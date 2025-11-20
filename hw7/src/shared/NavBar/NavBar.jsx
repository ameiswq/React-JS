import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth, signOut } from "../../firebase";
import "./NavBar.css";

export default function NavBar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser); 
    });
    return unsubscribe;
  }, []);

  
  const handleLogout = async () => {
    try {
      await signOut(auth);  
      navigate("/login");  
    } catch (error) {
      console.error("Error during logout: ", error);
    }
  };

  return (
    <nav className="nav">
      <div className="nav__inner">
        <div className="nav__brand">Homework 7</div>

        <ul className="nav__links">
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/users">Users</NavLink></li>

          {!user && (
            <>
              <li><NavLink to="/login">Login</NavLink></li>
              <li><NavLink to="/signup">Signup</NavLink></li>
            </>
          )}

          {user && (
            <>
              <li><NavLink to="/profile">Profile</NavLink></li>
              <li>
                <button type="button" onClick={handleLogout} className="nav__logout-btn">
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
