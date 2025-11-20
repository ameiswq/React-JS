import { useState, useEffect } from "react";
import { signOut } from "../../firebase";  
import { useNavigate } from "react-router-dom"; 
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase"; 
import './Profile.css';


export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);  
      } else {
        navigate("/login");
      }
    });

    return unsubscribe;  
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);  
    navigate("/login");   
  };

  return (
    <div className="container">
      <section className="card">
        <h1>Profile</h1>
        {user ? (
          <div>
            <p>Email: {user.email}</p>
            <p>UID: {user.uid}</p>
            <button onClick={handleLogout} className="auth-logout-btn">Logout</button>
          </div>) : (<p>Loading...</p>)}
      </section>
    </div>
  );
}
