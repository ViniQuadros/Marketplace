//Navbar routing
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navBar";

//Pages
import Home from "./pages/home"
import Login from "./pages/login"
import SignUp from "./pages/signup"

const myLinks = [
  { path: "/", label: "Home" },
  { path: "/login", label: "Login" },
  { path: "/signup", label: "SignUp" }
]

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && <Navbar links={myLinks} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
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