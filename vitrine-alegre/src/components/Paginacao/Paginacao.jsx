import './Paginacao.css';

export default function Paginacao({ paginaAtual, totalPaginas, aoMudarPagina }) {
  if (totalPaginas <= 1) return null;

  // Gerar array de páginas para exibição
  const gerarPaginas = () => {
    const paginas = [];
    const maxVisiveis = 5;

    let inicio = Math.max(1, paginaAtual - 2);
    let fim = Math.min(totalPaginas, inicio + maxVisiveis - 1);

    if (fim - inicio + 1 < maxVisiveis) {
      inicio = Math.max(1, fim - maxVisiveis + 1);
    }

    if (inicio > 1) {
      paginas.push(1);
      if (inicio > 2) paginas.push('...');
    }

    for (let i = inicio; i <= fim; i++) {
      paginas.push(i);
    }

    if (fim < totalPaginas) {
      if (fim < totalPaginas - 1) paginas.push('...');
      paginas.push(totalPaginas);
    }

    return paginas;
  };

  return (
    <div className="paginacao-container">
      <button
        className="paginacao-btn"
        disabled={paginaAtual === 1}
        onClick={() => aoMudarPagina(paginaAtual - 1)}
      >
        ‹
      </button>

      {gerarPaginas().map((item, index) => (
        typeof item === 'number' ? (
          <button
            key={index}
            className={`paginacao-item ${item === paginaAtual ? 'ativo' : ''}`}
            onClick={() => aoMudarPagina(item)}
          >
            {item}
          </button>
        ) : (
          <span key={index} className="paginacao-reticencias">
            {item}
          </span>
        )
      ))}

      <button
        className="paginacao-btn"
        disabled={paginaAtual === totalPaginas}
        onClick={() => aoMudarPagina(paginaAtual + 1)}
      >
        ›
      </button>
    </div>
  );
}