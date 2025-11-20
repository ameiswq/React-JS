import { useEffect, useState } from "react";
import "./ItemDetails.css";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

export default function ItemDetails() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const path = window.location.pathname;
  const id = path.split("/").filter(Boolean).pop();

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setErr(null);
        setLoading(true);
        const res = await fetch(`${USERS_URL}/${id}`);

        if (!res.ok) {
          if (res.status === 404) {
            if (!cancelled) setUser(null);
            return;
          }
          throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();
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
    window.history.back();
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
