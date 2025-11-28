import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout/RootLayout.jsx";
import Home from "./pages/Home/Home.jsx";
import About from "./pages/About/About.jsx";  
import Login from "./pages/Login/Login.jsx";
import ItemDetails from "./pages/Items/ItemDetails.jsx";
import UsersList from "./components/UserList/UserList.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users/:id" element={<ItemDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}