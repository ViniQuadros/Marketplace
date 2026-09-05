import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import ProductCarousel from "../components/productsCarousel";

export default function Home() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchProducts() {
      try {
        const baseUrl = import.meta.env.VITE_URL;
        const response = await fetch(`${baseUrl}/api/products/home-products`, {
          signal: abortController.signal,
        });

        if (!response.ok)
          throw new Error("Faield to fetch products");

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
    return () => abortController.abort();
  }, []);

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
          <p>
            Welcome back,{" "}
            <strong>{currentUser.displayName || currentUser.email}</strong>!
          </p>
        </div>
      ) : (
        <div>
          <p>You are browsing as a guest.</p>
          <p>
            <Link to="/login">Log in</Link> or <Link to="/signup">Sign up</Link>
          </p>
        </div>
      )}

      <section style={{ marginTop: "40px" }}>
        <h2>For you</h2>
        <ProductCarousel products={products} loading={loading} error={error} />
      </section>
    </div>
  );
}
