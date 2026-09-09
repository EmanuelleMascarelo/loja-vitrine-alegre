import './FiltroCategorias.css';

export default function FiltroCategorias({
  categorias = [],
  categoriaAtiva = '',
  aoSelecionarCategoria,
  ordenacao = '',
  aoMudarOrdenacao
}) {
  return (
    <div className="filtros-container">
      <div className="filtros-conteudo">
        {/* Pílulas de Categorias */}
        <div className="pilulas-wrapper">
          <button
            className={`pilula-item ${categoriaAtiva === '' ? 'ativa' : ''}`}
            onClick={() => aoSelecionarCategoria('')}
          >
            Todas
          </button>

          {categorias.slice(0, 7).map((cat) => {
            const nomeCategoria = typeof cat === 'object' ? cat.slug || cat.name : cat;
            return (
              <button
                key={nomeCategoria}
                className={`pilula-item ${categoriaAtiva === nomeCategoria ? 'ativa' : ''}`}
                onClick={() => aoSelecionarCategoria(nomeCategoria)}
              >
                {nomeCategoria}
              </button>
            );
          })}

          {categorias.length > 7 && (
            <span className="pilulas-mais">+{categorias.length - 7}</span>
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