import { useState, useEffect } from "react";
import UserCard from "../UserCard/UserCard.jsx";
import "./UserList.css";
import { useSearchParams, Link } from "react-router-dom";
import { loadItems, setQuery } from "../../features/items/itemSlice.js";
import { useDispatch, useSelector } from "react-redux";

export default function UsersList() {
  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [loaded, setLoaded] = useState(false);
  // const [error, setError] = useState(null);
  // const [searchParams, setSearchParams] = useSearchParams();
  // const search = searchParams.get("q") || ""; 
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const {list, loadingList, errorList, query,} = useSelector((state) => state.users);

  async function handleLoad() {
    // try {
    //   setError(null);
    //   setLoading(true);
    //   const data = await fetchUsers(); 
    //   setUsers(data);
    //   setLoaded(true);
    // } catch (err) {
    //   console.error(err);
    //   setError("Failed to load users");
    // } finally {
    //   setLoading(false);
    // }
    dispatch(loadItems());
  }

  useEffect(() => {
    const q = searchParams.get("q") || "";
    if (q !== query) {
      dispatch(setQuery(q));
    }
  }, [searchParams, query, dispatch]);

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
  
  const q = query.trim().toLowerCase();
  const filteredUsers = q? list.filter(u => {
      const name = u.name.toLowerCase();
      const email = u.email.toLowerCase();
      const city = u.address.city.toLowerCase();
      return name.includes(q) || email.includes(q) || city.includes(q);
    }): list;


    useEffect(() => {
        function onKeyDown(e) {
            if (e.key === "Escape" && search) {
                setSearchParams({});
            }
        }
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [query, setSearchParams]);

    useEffect(() => {
        const count = filteredUsers.length;
        document.title = count ? `${"Users"} (${count})` : `${"No found"}`;
    }, [filteredUsers]);

  return (
    <section className="users-list">
      <header className="users-list__header">
        <h2 className="users-list__title">Users</h2>
        <button className="users-list__btn" onClick={handleLoad} disabled={loadingList}>
            {loadingList ? "Loading..." : "Load"}
        </button>
      </header>

      {errorList && (<p className="users-list__error">{errorList}</p>)}
      
      <div className="users-list__search">
        <input type="text" className="users-list__search-input" placeholder="Search by name..." value={query} onChange={handleSearchChange}/>
        <button className="users-list__clear-btn" onClick={handleClear} disabled={!query}>Clear</button>
      </div>

      {!loadingList && filteredUsers.length === 0 && list.length > 0 && (
        <p className="users-list__empty">
          {query
            ? "No matches for your search."
            : "No users found."}
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