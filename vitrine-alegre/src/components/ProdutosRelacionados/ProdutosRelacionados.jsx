import { useEffect, useState } from 'react';
import CardProduto from '../CardProduto/CardProduto';
import './ProdutosRelacionados.css';

export default function ProdutosRelacionados({ categoria, produtoAtualId }) {
  const [relacionados, setRelacionados] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (!categoria) return;

    setCarregando(true);
    fetch(`https://dummyjson.com/products/category/${categoria}?limit=5`)
      .then((res) => res.json())
      .then((data) => {
        // Exclui o produto que o usuário já está visualizando
        const filtrados = (data.products || []).filter(
          (p) => p.id !== Number(produtoAtualId)
        );
        setRelacionados(filtrados.slice(0, 4));
        setCarregando(false);
      })
      .catch((err) => {
        console.error('Erro ao buscar produtos relacionados:', err);
        setCarregando(false);
      });
  }, [categoria, produtoAtualId]);

  if (carregando || relacionados.length === 0) return null;

  return (
    <section className="relacionados-container">
      <h2 className="relacionados-titulo">Produtos Relacionados</h2>
      <div className="relacionados-grid">
        {relacionados.map((produto) => (
          <CardProduto key={produto.id} produto={produto} />
        ))}
      </div>
    </section>
  );
}