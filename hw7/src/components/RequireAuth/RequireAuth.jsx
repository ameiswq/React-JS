import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "../../firebase"; 

export default function RequireAuth({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false); 
    });

    return () => unsubscribe(); 
  }, []);

  if (loading) {
    return (
      <div className="container">
        <section className="card">
          <p>Checking authentication...</p>
        </section>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />; 
  }

  return children; 
}
