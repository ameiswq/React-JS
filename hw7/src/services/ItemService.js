const USERS_URL = "https://jsonplaceholder.typicode.com/users";

export async function getById(id) {
  const res = await fetch(`${USERS_URL}/${id}`);

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  return res.json();
}
