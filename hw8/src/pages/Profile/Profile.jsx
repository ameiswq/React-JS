import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext.jsx";
import "../Login/Login.css"; 

export default function Profile() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  if (loading) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <p>Checking auth...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; 
  }

  const { email, uid } = user;

  async function handleLogout() {
    try {
      await signOut(auth);      
      navigate("/login");      
    } catch (err) {
      console.error("Logout error:", err);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Profile</h1>

        <div style={{ marginBottom: "16px", fontSize: "14px" }}>
          <p><b>Email:</b> {email}</p>
          <p><b>UID:</b> {uid}</p>
          <p><b>Verified:</b> {user.emailVerified ? "Yes" : "No"}</p>
        </div>

        <button className="auth-button" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  );
}
