// Navbar routing
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navBar";
import { AuthProvider } from "./context/authContext";

// Pages
import Home from "./pages/home";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Product from "./pages/product";

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}