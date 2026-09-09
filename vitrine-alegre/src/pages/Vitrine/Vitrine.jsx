import { useState, useEffect } from 'react';
import CardProduto from '../../components/CardProduto/CardProduto';
import FiltroCategorias from '../../components/FiltroCategorias/FiltroCategorias';
import Paginacao from '../../components/Paginacao/Paginacao';
import './Vitrine.css';

export default function Vitrine({ termoBusca = '', setTermoBusca }) {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState('');
  const [ordenacao, setOrdenacao] = useState('');
  const [carregando, setCarregando] = useState(true);

  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalProdutos, setTotalProdutos] = useState(0);
  const itensPorPagina = 12;

  // 1. Buscar categorias
  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then((res) => res.json())
      .then((data) => setCategorias(data))
      .catch((err) => console.error('Erro ao buscar categorias:', err));
  }, []);

  // 2. Buscar produtos (por Busca, Categoria ou Geral)
  useEffect(() => {
    setCarregando(true);
    const skip = (paginaAtual - 1) * itensPorPagina;
    let url = '';

    if (termoBusca.trim() !== '') {
      url = `https://dummyjson.com/products/search?q=${encodeURIComponent(termoBusca)}&limit=${itensPorPagina}&skip=${skip}`;
    } else if (categoriaAtiva) {
      url = `https://dummyjson.com/products/category/${categoriaAtiva}?limit=${itensPorPagina}&skip=${skip}`;
    } else {
      url = `https://dummyjson.com/products?limit=${itensPorPagina}&skip=${skip}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProdutos(data.products || []);
        setTotalProdutos(data.total || 0);
        setCarregando(false);
      })
      .catch((err) => {
        console.error('Erro ao buscar produtos:', err);
        setCarregando(false);
      });
  }, [categoriaAtiva, paginaAtual, termoBusca]);

  const handleSelecionarCategoria = (cat) => {
    setCategoriaAtiva(cat);
    setPaginaAtual(1);
  };

  const handleLimparFiltros = () => {
    if (setTermoBusca) setTermoBusca('');
    setCategoriaAtiva('');
    setPaginaAtual(1);
  };

  const produtosOrdenados = [...produtos].sort((a, b) => {
    if (ordenacao === 'price-asc') return a.price - b.price;
    if (ordenacao === 'price-desc') return b.price - a.price;
    if (ordenacao === 'title-asc') return a.title.localeCompare(b.title);
    return 0;
  });

  const totalPaginas = Math.ceil(totalProdutos / itensPorPagina);

  return (
    <main className="vitrine-container">
      <FiltroCategorias
        categorias={categorias}
        categoriaAtiva={categoriaAtiva}
        aoSelecionarCategoria={handleSelecionarCategoria}
        ordenacao={ordenacao}
        aoMudarOrdenacao={setOrdenacao}
      />

      <div className="vitrine-conteudo">
        <p className="vitrine-contador">
          <strong>{totalProdutos} produtos</strong> {termoBusca && `encontrados para "${termoBusca}"`}
        </p>

        {carregando ? (
          <p className="vitrine-carregando">Carregando produtos...</p>
        ) : produtosOrdenados.length === 0 ? (
          /* Estado Vazio - Busca sem resultados */
          <div className="estado-vazio">
            <div className="icone-circulo">
              🔍
            </div>
            <h2>Nenhum produto encontrado</h2>
            <p>Tente outro termo ou limpe os filtros.</p>
            <button className="btn-limpar-busca" onClick={handleLimparFiltros}>
              Limpar busca
            </button>
          </div>
        ) : (
          <>
            <div className="vitrine-grid">
              {produtosOrdenados.map((produto) => (
                <CardProduto key={produto.id} produto={produto} />
              ))}
            </div>

            <Paginacao
              paginaAtual={paginaAtual}
              totalPaginas={totalPaginas}
              aoMudarPagina={setPaginaAtual}
            />
          </>
        )}
      </div>
    </main>
  );
}