const USERS_URL = "https://jsonplaceholder.typicode.com/users";

export async function fetchUsers() {
  const res = await fetch(USERS_URL);

  if (!res.ok) {
    throw new Error("Failed to load users");
  }

  const data = await res.json();
  return data;
}
export async function fetchUserById(id) {
  const res = await fetch(`${USERS_URL}/${id}`);
  if (res.status === 404) {
    return null; 
  }
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  return res.json();
}