import { useState } from "react";
import UserCard from "../UserCard/UserCard.jsx";
import "./UserList.css";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  async function handleLoad() {
    setLoading(true);
    const res = await fetch(USERS_URL);
    const data = await res.json(); 
    setUsers(data);
    setLoaded(true);
    setLoading(false);
  }

  return (
    <section className="users-list">
      <header className="users-list__header">
        <h2 className="users-list__title">Users</h2>
        <button
          className="users-list__btn"
          onClick={handleLoad}
          disabled={loading}
        >
          {loading ? "Loading..." : "Load"}
        </button>
      </header>

      <ul className="users-list__grid">
        {users.map((u) => (
          <li className="users-list__item">
            <UserCard user={u} />
          </li>
        ))}
      </ul>
    </section>
  );
}
