import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import '../css/purchase.css'

export default function Purchase() {
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(location.state?.product || null);
  const [loading, setLoading] = useState(!product);
  const [error, setError] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  useEffect(() => {
    if (product) return;

    let cancelled = false;
    async function fetchProduct() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error("Produto não encontrado");
        const data = await res.json();
        if (!cancelled) setProduct(data);
      } catch (err) {
        if (!cancelled) setError(err.message || "Erro ao carregar produto");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchProduct();
    return () => {
      cancelled = true;
    };
  }, [id, product]);

 if (loading)
    return (
      <div className="pd-container">
        <p>Loading product...</p>
      </div>
    );
  if (error)
    return (
      <div className="pd-container">
        <div className="pd-alert pd-alert-danger">{error}</div>
      </div>
    );
  if (!product)
    return (
      <div className="pd-container">
        <p>No product found.</p>
      </div>
    );

  // Basic client-side validation
  const validate = () => {
    if (!name.trim()) return "Name required";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid address.";
    if (!address.trim()) return "Home address required";
    if (!Number.isInteger(Number(quantity)) || quantity <= 0) return "Invalid quantity";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setError(null);
    setSubmitting(true);

    // Simulated API request (replace with real backend call)
    try {
      // Example real request:
      // const res = await fetch("/api/purchase", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ productId: product.id, name, email, address, quantity }),
      // });
      // if (!res.ok) throw new Error("Erro na compra");
      // const result = await res.json();

      // Simulate network + server processing
      await new Promise((r) => setTimeout(r, 900));

      const orderId = `ORD-${Date.now().toString(36).toUpperCase().slice(-8)}`;
      setSuccess({
        orderId,
        productId: product.id,
        total: product.price * Number(quantity),
      });

      // Optional: clear form or keep data as needed
      setName("");
      setEmail("");
      setAddress("");
      setQuantity(1);
    } catch (err) {
      setError(err.message || "Failed to purchase");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="pd-container">
        <div className="purchase-success-card">
          <h2>Purchase confirmed</h2>
          <p>Purchase id: <strong>{success.orderId}</strong></p>
          <p>Product: <strong>{product.title}</strong></p>
          <p>Total: <strong>{formatCurrency(success.total)}</strong></p>
          <p>It will be send a email to you.</p>
          <div className="purchase-success-actions">
            <Link to="/" className="pd-btn pd-btn-primary">Back to store</Link>
            <Link to={`/product/${product.id}`} state={{ product }} className="pd-btn pd-btn-outline">
              View product
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pd-container">
      <div className="purchase-grid">
        <div className="purchase-summary">
          <img src={product.image} alt={product.title} className="purchase-image" />
          <h3 className="purchase-title">{product.title}</h3>
          <p className="purchase-price">{formatCurrency(product.price)}</p>
          {product.description && <p className="purchase-desc">{product.description}</p>}
        </div>

        <form className="purchase-form" onSubmit={handleSubmit}>
          <h3>Insert your data</h3>

          <label className="form-label">
            Full name
            <input
              type="text"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={submitting}
              required
            />
          </label>

          <label className="form-label">
            E-mail
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={submitting}
              required
            />
          </label>

          <label className="form-label">
            Address
            <textarea
              className="form-input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={submitting}
              rows={3}
              required
            />
          </label>

          <label className="form-label">
            Quantity
            <input
              type="number"
              min="1"
              className="form-input"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              disabled={submitting}
              required
            />
          </label>

          <div className="form-row">
            <button type="submit" className="pd-btn pd-btn-primary" disabled={submitting}>
              {submitting ? "Processing" : `Buy ${formatCurrency(product.price * Number(quantity))}`}
            </button>

            <Link to={`/product/${product.id}`} state={{ product }} className="pd-btn pd-btn-outline">
              Back to product
            </Link>
          </div>

          {error && <div className="pd-alert pd-alert-danger" role="alert">{error}</div>}
          <p className="purchase-note">Simulated purchase</p>
        </form>
      </div>
    </div>
  );
}
