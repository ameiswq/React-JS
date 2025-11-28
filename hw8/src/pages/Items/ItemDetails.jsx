import { useEffect, useState } from "react";
import "./ItemDetails.css";
import { fetchUserById } from "../../services/fetchService.js";
import { useParams, useNavigate } from "react-router-dom";

export default function ItemDetails() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const {id} = useParams(); 
  const navigate = useNavigate(); 

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setErr(null);
        setLoading(true);
        const data = await fetchUserById(id);
        if (!cancelled) setUser(data);
      } catch (e) {
        if (!cancelled) setErr(e?.message || "Fetch failed");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    if (id) {
      load();
    }

    return () => {
      cancelled = true;
    };
  }, [id]);

  function handleBack() {
    navigate(-1);
  }

  if (loading) {
    return (
      <div className="container">
        <section className="card">
          <p>Loading details...</p>
        </section>
      </div>
    );
  }

  if (err) {
    return (
      <div className="container">
        <section className="card">
          <p>Error: {err}</p>
          <button onClick={handleBack}>← Back</button>
        </section>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container">
        <section className="card">
          <p>Not found.</p>
          <button onClick={handleBack}>← Back</button>
        </section>
      </div>
    );
  }

  const { name, username, email, phone, website, address, company } = user;

  return (
    <div className="container">
      <section className="card details">
        <button className="details__back" onClick={handleBack}>
          ← Back
        </button>

        <h1>{name}</h1>

        <ul className="details__list">
          <li><b>Username:</b> {username}</li>
          <li><b>Email:</b> {email}</li>
          <li><b>Phone:</b> {phone}</li>
          <li><b>Website:</b> {website}</li>
          <li><b>City:</b> {address?.city}</li>
          <li><b>Street:</b> {address?.street}</li>
          <li><b>Company:</b> {company?.name}</li>
        </ul>
      </section>
    </div>
  );
}
