import { useState } from 'react';
import './FiltroCategorias.css';

export default function FiltroCategorias({
  categorias = [],
  categoriaAtiva = '',
  aoSelecionarCategoria,
  ordenacao = '',
  aoMudarOrdenacao
}) {
  const [menuAberto, setMenuAberto] = useState(false);
  const LIMITE_INICIAL = 7;

  // As primeiras 7 ficam na barra principal
  const categoriasPrincipais = categorias.slice(0, LIMITE_INICIAL);
  // As restantes vão para o menu/tabela
  const categoriasRestantes = categorias.slice(LIMITE_INICIAL);

  const handleSelecionarEMeFechar = (nomeCat) => {
    aoSelecionarCategoria(nomeCat);
    setMenuAberto(false); // Fecha a tabelinha ao escolher uma categoria
  };

  return (
    <div className="filtros-container">
      <div className="filtros-conteudo">
        {/* Pílulas de Categorias Principais */}
        <div className="pilulas-wrapper" style={{ position: 'relative' }}>
          <button
            className={`pilula-item ${categoriaAtiva === '' ? 'ativa' : ''}`}
            onClick={() => handleSelecionarEMeFechar('')}
          >
            Todas
          </button>

          {categoriasPrincipais.map((cat) => {
            const nomeCategoria = typeof cat === 'object' ? cat.slug || cat.name : cat;
            return (
              <button
                key={nomeCategoria}
                className={`pilula-item ${categoriaAtiva === nomeCategoria ? 'ativa' : ''}`}
                onClick={() => handleSelecionarEMeFechar(nomeCategoria)}
              >
                {nomeCategoria}
              </button>
            );
          })}

          {/* Botão +X que abre/fecha a tabelinha */}
          {categoriasRestantes.length > 0 && (
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <button
                type="button"
                className="pilulas-mais"
                onClick={() => setMenuAberto(!menuAberto)}
                style={{ cursor: 'pointer' }}
              >
                {menuAberto ? 'Fechar ▲' : `+${categoriasRestantes.length} ▼`}
              </button>

              {/* Tabelinha / Dropdown de Categorias Restantes */}
              {menuAberto && (
                <div className="tabela-categorias-dropdown">
                  <div className="tabela-categorias-grid">
                    {categoriasRestantes.map((cat) => {
                      const nomeCategoria = typeof cat === 'object' ? cat.slug || cat.name : cat;
                      return (
                        <button
                          key={nomeCategoria}
                          className={`item-tabela ${categoriaAtiva === nomeCategoria ? 'ativo' : ''}`}
                          onClick={() => handleSelecionarEMeFechar(nomeCategoria)}
                        >
                          {nomeCategoria}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Select de Ordenação */}
        <div className="ordenacao-wrapper">
          <select
            value={ordenacao}
            onChange={(e) => aoMudarOrdenacao(e.target.value)}
            className="select-ordenacao"
          >
            <option value="">Ordenar: Relevância</option>
            <option value="price-asc">Menor Preço</option>
            <option value="price-desc">Maior Preço</option>
            <option value="title-asc">Nome (A-Z)</option>
          </select>
        </div>
      </div>
    </div>
  );
}