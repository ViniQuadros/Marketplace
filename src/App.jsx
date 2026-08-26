//Navbar routing
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navBar";

//Pages
import Home from "./pages/home"
import Login from "./pages/login"

const myLinks = [
  { path: "/", label: "Home" },
  { path: "/login", label: "Login" }
]

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login";

  return (
    <>
      {!hideNavbar && <Navbar links={myLinks} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}