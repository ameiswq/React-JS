import { useState, useEffect } from "react";
import UserCard from "../UserCard/UserCard.jsx";
import "./UserList.css";
import { useSearchParams, Link } from "react-router-dom";
import { fetchUsers } from "../../services/fetchService.js";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("q") || ""; 

  async function handleLoad() {
    try {
      setError(null);
      setLoading(true);
      const data = await fetchUsers(); 
      setUsers(data);
      setLoaded(true);
    } catch (err) {
      console.error(err);
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
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
  
  const q = search.trim().toLowerCase();
  const filteredUsers = q? users.filter(u => {
      const name = u.name.toLowerCase();
      const email = u.email.toLowerCase();
      const city = u.address.city.toLowerCase();
      return name.includes(q) || email.includes(q) || city.includes(q);
    }): users;


    useEffect(() => {
        function onKeyDown(e) {
            if (e.key === "Escape" && search) {
                setSearchParams({});
            }
        }
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [search, setSearchParams]);

    useEffect(() => {
        const count = filteredUsers.length;
        document.title = count ? `${"Users"} (${count})` : `${"No found"}`;
    }, [filteredUsers]);

  return (
    <section className="users-list">
      <header className="users-list__header">
        <h2 className="users-list__title">Users</h2>
        <button className="users-list__btn" onClick={handleLoad} disabled={loading}>
            {loading ? "Loading..." : "Load"}
        </button>
      </header>

      {error && (<p className="users-list__error">{error} </p>
)}
      
      <div className="users-list__search">
        <input type="text" className="users-list__search-input" placeholder="Search by name..." value={search} onChange={handleSearchChange}/>
        <button className="users-list__clear-btn" onClick={handleClear} disabled={!search}>Clear</button>
      </div>

      {loaded && filteredUsers.length === 0 && (
        <p className="users-list__empty">
          {search ? "No matches for your search." : "No users found."}
        </p>
      )}

      <ul className="users-list__grid">
        {filteredUsers.map((u) => (
           <li className="users-list__item" key={u.id}>
              <Link to={`/users/${u.id}`} className="users-list__link">
                <UserCard user={u} />
              </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}