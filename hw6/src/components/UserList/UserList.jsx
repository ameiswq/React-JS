import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";  
import UserCard from "../UserCard/UserCard.jsx";
import "./UserList.css";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchRaw = searchParams.get("q") || "";         
  const q = searchRaw.trim().toLowerCase();           

  async function handleLoad() {
    setLoading(true);
    const res = await fetch(USERS_URL);
    const data = await res.json();
    setUsers(data);
    setLoaded(true);
    setLoading(false);
  }

  function handleSearchChange(e) {
    const value = e.target.value;
    if (value) {
      setSearchParams({ q: value }); 
    } else {
      setSearchParams({});         
    }
  }

  function handleClear() {
    setSearchParams({});            
  }
  
  const filteredUsers = q
    ? users.filter((u) => {
        const name = u.name.toLowerCase();
        const email = u.email.toLowerCase();
        const city = u.address.city.toLowerCase();
        return (
          name.includes(q) ||
          email.includes(q) ||
          city.includes(q)
        );
      })
    : users;

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape" && searchRaw) {
        setSearchParams({});
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [searchRaw, setSearchParams]);

  useEffect(() => {
    const count = filteredUsers.length;
    document.title = count ? `Users (${count})` : `No found`;
  }, [filteredUsers]);

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

      <div className="users-list__search">
        <input
          type="text"
          className="users-list__search-input"
          placeholder="Search by name..."
          value={searchRaw}                
          onChange={handleSearchChange}
        />
        <button
          className="users-list__clear-btn"
          onClick={handleClear}
          disabled={!searchRaw}
        >
          Clear
        </button>
      </div>

      {loaded && filteredUsers.length === 0 && (
        <p className="users-list__empty">
          {q ? "No matches for your search." : "No users found."}
        </p>
      )}

      <ul className="users-list__grid">
        {filteredUsers.map((u) => (
          <li key={u.id} className="users-list__item">
            <Link to={`/users/${u.id}`} className="users-list__link">
              <UserCard user={u} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
