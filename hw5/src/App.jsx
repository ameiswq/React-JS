import UsersList from "./components/UserList/UserList.jsx";

export default function App() {
  return (
    <main style={{ fontFamily: "system-ui", padding: 24 }}>
      <h1>API Demo (JSX)</h1>
      <p>Нажми “Load”, чтобы загрузить список пользователей с JSONPlaceholder.</p>
      <UsersList />
    </main>
  );
}