import { Outlet } from "react-router-dom";
import NavBar from "../../shared/NavBar/NavBar.jsx";
import "./RootLayout.css";

export default function RootLayout() {
  return (
    <div className="root">
      <NavBar />
      <main className="root__main">
        <Outlet />
      </main>
    </div>
  );
}
