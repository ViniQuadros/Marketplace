import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../css/productCarousel.css";

export default function ProductCarousel({ products, loading, error }) {
  const carouselRef = useRef(null);
  const navigate = useNavigate();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  // 3. Função responsável por calcular e executar a rolagem
  const scroll = (direction) => {
    if (carouselRef.current) {
      // offsetWidth avança exatamente a largura visível na tela atual do usuário
      const scrollAmount = carouselRef.current.offsetWidth;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const goToProduct = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  // Tratamento de estados de interface
  if (loading)
    return <p className="carousel-message">Carregando produtos...</p>;
  if (error) return <p className="carousel-error">{error}</p>;
  if (!products || products.length === 0)
    return <p className="carousel-message">Nenhum produto encontrado.</p>;

  // 4. Renderização principal com o wrapper e os botões adicionados
  return (
    <div className="carousel-wrapper">
      {/* Botão de voltar */}
      <button type="button" aria-label="Scroll left" className="carousel-btn left" onClick={() => scroll("left")}>
        &#10094;
      </button>

      {/* O contêiner recebe a prop 'ref' para ser manipulado pela função scroll */}
      <div className="carousel-container" ref={carouselRef}>
        {products.map((product) => (
          <div key={product.id} className="carousel-item">
            <img
              src={product.image}
              alt={product.title}
              className="carousel-image"
            />
            <div className="carousel-info">
              <h3 className="carousel-title">{product.title}</h3>
              <p className="carousel-price">{formatCurrency(product.price)}</p>
            </div>
            <button className="buy-btn" onClick={() => goToProduct(product)}>
              Comprar
            </button>
          </div>
        ))}
      </div>

      <button type="button" aria-label="Scroll right" className="carousel-btn right" onClick={() => scroll("right")}>
        &#10095;
      </button>
    </div>
  );
}