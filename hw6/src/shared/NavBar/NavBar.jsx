import { NavLink } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <nav className="nav">
      <div className="nav__inner">
        <ul className="nav__links">
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/users">Users</NavLink></li>
          <li><NavLink to="/login">Login</NavLink></li>

        </ul>
      </div>
    </nav>
  );
}
