// products.js
import express from 'express';

const router = express.Router();

router.get('/home-products', async (req, res) => {
  try {
    // O Node faz a requisição para a API externa
    const resposta = await fetch("https://fakestoreapi.com/products?limit=10");
    
    if (!resposta.ok) {
      throw new Error("API failed");
    }
    
    const dadosBrutos = await resposta.json();
    
    // Opcional: Aqui você pode mapear os dados para entregar ao React 
    // apenas o que ele precisa, economizando banda.
    
    res.json(dadosBrutos);
  } catch (erro) {
    console.error("Erro interno:", erro);
    res.status(500).json({ erro: "Erro ao buscar catálogo de produtos." });
  }
});

export default router;