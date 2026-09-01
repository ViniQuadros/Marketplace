import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Home Page</h1>

      {currentUser ? (
        <div>
          <p>Welcome back, <strong>{currentUser.displayName || currentUser.email}</strong>!</p>
        </div>
      ) : (
        <div>
          <p>You are browsing as a guest.</p>
          <p>
            <Link to="/login">Log in</Link> or <Link to="/signup">Sign up</Link>
          </p>
        </div>
      )}
    </div>
  );
}