import './Rodape.css';

export default function Rodape() {
  return (
    <footer className="rodape-container">
      <div className="rodape-conteudo">
        <div>
          <div className="rodape-logo">
            <span>V</span> Vitrine Alegre
          </div>
          <p className="rodape-subtitulo">Projeto acadêmico - Ifes Câmpus de Alegre - TADS</p>
        </div>
        <div className="rodape-creditos">
          Dados: dummyjson.com<br />
          Imagens e marcas são fictícias
        </div>
      </div>
    </footer>
  );
}