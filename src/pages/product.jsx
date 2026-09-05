import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import "../css/productDetail.css";

export default function Product() {
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(location.state?.product || null);
  const [loading, setLoading] = useState(!product);
  const [error, setError] = useState(null);

  const formatCurrency = (value) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
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
        <p>Carregando produto...</p>
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
        <p>Produto não encontrado.</p>
      </div>
    );

  return (
    <main className="pd-container">
      <div className="pd-back-wrap">
        <Link to="/" className="pd-back">
          ← Voltar
        </Link>
      </div>

      <div className="pd-card">
        <div className="pd-row">
          <div className="pd-image-col">
            <img src={product.image} alt={product.title} className="pd-image" />
          </div>

          <div className="pd-info-col">
            <h1 className="pd-title">{product.title}</h1>

            <div className="pd-price-row">
              <span className="pd-price">{formatCurrency(product.price)}</span>
              {product.oldPrice && (
                <small className="pd-oldPrice">
                  <del>{formatCurrency(product.oldPrice)}</del>
                </small>
              )}
            </div>

            {product.description && (
              <p className="pd-desc">{product.description}</p>
            )}

            <div className="pd-actions">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="pd-btn pd-btn-primary"
                //onClick={}
              >
                Comprar agora
              </a>

              <button
                type="button"
                className="pd-btn pd-btn-outline"
                //onClick={}
              >
                Adicionar ao carrinho
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
