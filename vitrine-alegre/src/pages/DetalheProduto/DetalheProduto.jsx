import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCarrinho } from '../../context/CarrinhoContext';
import ProdutosRelacionados from '../../components/ProdutosRelacionados/ProdutosRelacionados';
import './DetalheProduto.css';

export default function DetalheProduto() {
  const { id } = useParams();
  const { adicionarAoCarrinho } = useCarrinho();

  const [produto, setProduto] = useState(null);
  const [imagemSelecionada, setImagemSelecionada] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    setCarregando(true);
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduto(data);
        setImagemSelecionada(data.thumbnail || (data.images && data.images[0]));
        setCarregando(false);
      })
      .catch((err) => {
        console.error('Erro ao buscar detalhes do produto:', err);
        setCarregando(false);
      });
  }, [id]);

  if (carregando) return <div className="detalhe-carregando">Carregando detalhes...</div>;
  if (!produto) return <div className="detalhe-carregando">Produto não encontrado.</div>;

  const percentualDesconto = Math.round(produto.discountPercentage || 0);
  const precoOriginal = (produto.price / (1 - percentualDesconto / 100)).toFixed(2);
  const economia = (precoOriginal - produto.price).toFixed(2);
  const valorParcela = (produto.price / 12).toFixed(2);

  const handleAdicionar = () => {
    for (let i = 0; i < quantidade; i++) {
      adicionarAoCarrinho(produto);
    }
  };

  return (
    <div className="detalhe-container">
      <div className="detalhe-conteudo">
        {/* Breadcrumb */}
        <nav className="detalhe-breadcrumb">
          <Link to="/">Início</Link> › <span className="breadcrumb-cat">{produto.category}</span> › <span className="breadcrumb-ativo">{produto.title}</span>
        </nav>

        {/* Card Principal do Produto */}
        <div className="detalhe-card-principal">
          {/* Lado Esquerdo - Galeria de Imagens */}
          <div className="detalhe-galeria">
            <div className="detalhe-imagem-destaque">
              <img src={imagemSelecionada} alt={produto.title} />
            </div>
            <div className="detalhe-miniaturas">
              {(produto.images && produto.images.length > 0 ? produto.images : [produto.thumbnail]).map((img, idx) => (
                <button
                  key={idx}
                  className={`miniatura-btn ${imagemSelecionada === img ? 'ativa' : ''}`}
                  onClick={() => setImagemSelecionada(img)}
                >
                  <img src={img} alt="" />
                </button>
              ))}
            </div>
          </div>

          {/* Lado Direito - Informações de Compra */}
          <div className="detalhe-info">
            <span className="detalhe-categoria-tag">{produto.category}</span>
            <h1 className="detalhe-titulo">{produto.title}</h1>
            <p className="detalhe-meta">
              Marca: <strong>{produto.brand || 'N/A'}</strong> · SKU: <strong>{produto.sku || `SKU-${produto.id}`}</strong>
            </p>

            <div className="detalhe-rating">
              <span className="estrelas">★★★★☆</span>
              <span className="rating-num">{produto.rating?.toFixed(2)}</span> · 
              <span className="qtd-avaliacoes">{produto.reviews?.length || 0} avaliações</span>
            </div>

            <hr className="detalhe-divisor" />

            <div className="detalhe-precos-wrapper">
              <div className="linha-preco-antigo">
                <span className="preco-antigo">R$ {precoOriginal.replace('.', ',')}</span>
                <span className="tag-economia">economize R$ {economia.replace('.', ',')}</span>
              </div>
              <div className="linha-preco-atual">
                <span className="preco-final">R$ {produto.price?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                {percentualDesconto > 0 && <span className="badge-desconto">-{percentualDesconto}%</span>}
              </div>
              <p className="parcelamento">em até 12x de R$ {valorParcela.replace('.', ',')} sem juros</p>
            </div>

            <div className="detalhe-estoque">
              <span className="ponto-verde"></span>
              <strong>{produto.stock} em estoque</strong> · {produto.availabilityStatus || 'In Stock'}
            </div>

            {/* Seletor de Quantidade e Botão */}
            <div className="detalhe-acoes">
              <div className="seletor-quantidade">
                <button onClick={() => setQuantidade(Math.max(1, quantidade - 1))}>-</button>
                <span>{quantidade}</span>
                <button onClick={() => setQuantidade(quantidade + 1)}>+</button>
              </div>
              <button className="btn-adicionar-carrinho" onClick={handleAdicionar}>
                Adicionar ao carrinho
              </button>
            </div>

            {/* Badges de Garantia e Envio */}
            <div className="detalhe-badges">
              <div className="badge-card">
                <span className="badge-label">ENVIO</span>
                <span className="badge-valor">{produto.shippingInformation || 'Ships in 1 month'}</span>
              </div>
              <div className="badge-card">
                <span className="badge-label">GARANTIA</span>
                <span className="badge-valor">{produto.warrantyInformation || 'Lifetime warranty'}</span>
              </div>
              <div className="badge-card">
                <span className="badge-label">DEVOLUÇÃO</span>
                <span className="badge-valor">{produto.returnPolicy || '60 days return policy'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Seção Descrição e Especificações */}
        <div className="detalhe-grid-tecnico">
          <div className="card-secao">
            <h3>Descrição</h3>
            <p className="descricao-texto">{produto.description}</p>
            <div className="tags-wrapper">
              <span className="tag-item">#{produto.category}</span>
              <span className="tag-item">#{produto.brand || 'produto'}</span>
            </div>
          </div>

          <div className="card-secao">
            <h3>Especificações</h3>
            <table className="tabela-especificacoes">
              <tbody>
                <tr>
                  <td>Peso</td>
                  <td><strong>{produto.weight || 2} kg</strong></td>
                </tr>
                <tr>
                  <td>Dimensões</td>
                  <td><strong>{produto.dimensions ? `${produto.dimensions.width} x ${produto.dimensions.height} x ${produto.dimensions.depth} cm` : '5.29 x 18.38 x 17.72 cm'}</strong></td>
                </tr>
                <tr>
                  <td>Estoque</td>
                  <td><strong>{produto.stock} unidades</strong></td>
                </tr>
                <tr>
                  <td>Pedido mínimo</td>
                  <td><strong>{produto.minimumOrderQuantity || 1} unidades</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Seção Avaliações */}
        <div className="detalhe-avaliacoes-secao">
          <h3>Avaliações ({produto.reviews?.length || 0})</h3>
          <div className="avaliacoes-grid">
            {produto.reviews && produto.reviews.length > 0 ? (
              produto.reviews.map((rev, idx) => (
                <div key={idx} className="card-avaliacao-item">
                  <div className="avaliacao-header">
                    <div className="avaliacao-avatar">{rev.reviewerName?.charAt(0) || 'U'}</div>
                    <div className="avaliacao-autor">
                      <strong>{rev.reviewerName}</strong>
                      <div className="estrelas-pequenas">★★★★★</div>
                    </div>
                    <span className="avaliacao-data">
                      {new Date(rev.date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <p className="avaliacao-comentario">{rev.comment}</p>
                </div>
              ))
            ) : (
              <p className="sem-avaliacoes">Nenhuma avaliação cadastrada.</p>
            )}
          </div>
        </div>

        {/* Seção de Produtos Relacionados */}
        <ProdutosRelacionados 
          categoria={produto.category} 
          produtoAtualId={produto.id} 
        />
      </div>
    </div>
  );
}