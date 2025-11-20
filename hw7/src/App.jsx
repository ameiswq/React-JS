import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout/RootLayout.jsx";
import Home from "./pages/Home/Home.jsx";
import About from "./pages/About/About.jsx";
import Items from "./pages/Items/Items.jsx";    
import ItemDetails from "./pages/Items/ItemDetails.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/signup.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import RequireAuth from "./components/RequireAuth/RequireAuth.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/users" element={<Items />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users/:id" element={<ItemDetails />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/profile"
            element={<RequireAuth> <Profile /></RequireAuth>}
          />


        </Route>
      </Routes>
    </BrowserRouter>
  );
}