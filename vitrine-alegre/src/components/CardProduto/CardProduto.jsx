import { Link } from 'react-router-dom';
import { useCarrinho } from '../../context/CarrinhoContext';
import './CardProduto.css';

export default function CardProduto({ produto }) {
  const { carrinho, adicionarAoCarrinho } = useCarrinho();

  // Verifica se o item já está no carrinho
  const noCarrinho = carrinho.some((item) => item.id === produto.id);

  const percentualDesconto = Math.round(produto.discountPercentage || 0);
  const precoOriginal = (produto.price / (1 - percentualDesconto / 100)).toFixed(2);

  return (
    <div className="card-produto">
      {/* Topo do Card - Imagem, Selos e Badge do Carrinho */}
      <Link to={`/produtos/${produto.id}`} className="card-topo">
        {percentualDesconto > 0 && (
          <span className="card-selo-desconto">-{percentualDesconto}%</span>
        )}

        {/* Badge para produto que já está no carrinho */}
        {noCarrinho && (
          <span className="card-badge-no-carrinho">✓ No carrinho</span>
        )}

        <div className="card-imagem-wrapper">
          <img src={produto.thumbnail} alt={produto.title} className="card-imagem" />
        </div>
      </Link>

      {/* Conteúdo do Card - Informações e Botão */}
      <div className="card-conteudo">
        <span className="card-categoria">{produto.category}</span>
        <Link to={`/produtos/${produto.id}`} className="card-titulo-link">
          <h3 className="card-titulo">{produto.title}</h3>
        </Link>

        <div className="card-avaliacao">
          <span className="card-estrelas">★★★★★</span>
          <span className="card-rating-texto">{produto.rating?.toFixed(2)}</span>
        </div>

        <div className="card-precos">
          <span className="card-preco-antigo">R$ {precoOriginal.replace('.', ',')}</span>
          <span className="card-preco-final">
            R$ {produto.price?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        </div>

        <button
          className={`card-btn-adicionar ${noCarrinho ? 'no-carrinho' : ''}`}
          onClick={() => adicionarAoCarrinho(produto)}
        >
          {noCarrinho ? 'Adicionar mais' : 'Adicionar'}
        </button>
      </div>
    </div>
  );
}