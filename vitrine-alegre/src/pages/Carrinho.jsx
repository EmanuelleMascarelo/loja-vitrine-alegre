import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCarrinho } from '../context/CarrinhoContext';
import { formatarMoeda, calcularPrecoFinal } from '../utils/formatters';
import { notificar } from '../utils/notificacoes';
import './Carrinho.css';

export default function Carrinho() {
  const { carrinho, atualizarQuantidade, removerDoCarrinho, limparCarrinho } = useCarrinho();
  const [cupom, setCupom] = useState('');
  const [cupomAplicado, setCupomAplicado] = useState(false);
  const navigate = useNavigate();

  // Cálculo do subtotal calculando o preço com desconto original de cada produto
  const subtotal = carrinho.reduce((acc, item) => {
    const precoUnitarioComDesconto = calcularPrecoFinal(item.price, item.discountPercentage);
    return acc + precoUnitarioComDesconto * item.quantidade * 5.20; // Em BRL
  }, 0);

  // Regra de Frete Grátis acima de R$ 250,00
  const valorFrete = subtotal >= 250 || subtotal === 0 ? 0 : 15;

  // Aplicação do Cupom IFES10 (10% sobre o subtotal)
  const valorDescontoCupom = cupomAplicado ? subtotal * 0.10 : 0;
  const valorTotal = subtotal - valorDescontoCupom + valorFrete;

  function handleAplicarCupom(e) {
    e.preventDefault();
    if (cupom.trim().toUpperCase() === 'IFES10') {
      setCupomAplicado(true);
      notificar.sucesso('Cupom "IFES10" aplicado com sucesso! (10% OFF)');
    } else {
      notificar.erro('Cupom inválido. Tente "IFES10".');
    }
  }

  function handleFinalizarCompra() {
    if (carrinho.length === 0) return;

    // 1. Criar o objeto do novo pedido
    const novoPedido = {
      id: `PED-${Math.floor(1000 + Math.random() * 9000)}`,
      data: new Date().toLocaleDateString('pt-BR'),
      status: 'Em Trânsito',
      statusClasse: 'alerta',
      total: valorTotal,
      itens: carrinho.map(item => {
        const precoUnitario = calcularPrecoFinal(item.price, item.discountPercentage) * 5.20;
        return {
          id: item.id,
          nome: item.title,
          qtd: item.quantidade,
          preco: precoUnitario * item.quantidade
        };
      })
    };

    // 2. Gravar no LocalStorage junto com os pedidos antigos
    const pedidosSalvos = JSON.parse(localStorage.getItem('@vitrine:pedidos')) || [];
    const listaAtualizada = [novoPedido, ...pedidosSalvos];
    localStorage.setItem('@vitrine:pedidos', JSON.stringify(listaAtualizada));

    // 3. Limpar o carrinho, notificar e ir para /pedidos
    limparCarrinho();
    notificar.sucesso('Pedido finalizado com sucesso!');
    navigate('/pedidos');
  }

  function handleEsvaziarCarrinho() {
    limparCarrinho();
    notificar.info('O carrinho foi esvaziado.');
  }

  function handleRemoverProduto(id, titulo) {
    removerDoCarrinho(id);
    notificar.info(`"${titulo}" removido do carrinho.`);
  }

  /* Estado Vazio - Carrinho sem produtos */
  if (carrinho.length === 0) {
    return (
      <div className="carrinho-pagina-container">
        <h1 className="carrinho-titulo">Seu carrinho</h1>
        <div className="estado-vazio">
          <div className="icone-circulo">
            🛒
          </div>
          <h2>Seu carrinho está vazio</h2>
          <p>Escolha um produto na vitrine para começar.</p>
          <Link to="/" className="btn-ir-vitrine">
            Ir para a vitrine
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="carrinho-container">
      <h1 className="carrinho-titulo">Carrinho de Compras</h1>

      <div className="carrinho-grid">
        {/* COLUNA 1: LISTA DE PRODUTOS */}
        <div className="carrinho-lista">
          {carrinho.map((item) => {
            const precoUnitario = calcularPrecoFinal(item.price, item.discountPercentage) * 5.20;

            return (
              <div key={item.id} className="carrinho-item">
                <img src={item.thumbnail} alt={item.title} className="carrinho-item-img" />

                <div className="carrinho-item-info">
                  <h3 className="carrinho-item-titulo">{item.title}</h3>
                  <span className="carrinho-item-preco">
                    {formatarMoeda(precoUnitario)}
                  </span>
                </div>

                <div className="carrinho-item-acoes">
                  <button
                    className="btn-qtd"
                    onClick={() => atualizarQuantidade(item.id, item.quantidade - 1)}
                  >
                    -
                  </button>
                  <span>{item.quantidade}</span>
                  <button
                    className="btn-qtd"
                    onClick={() => atualizarQuantidade(item.id, item.quantidade + 1)}
                  >
                    +
                  </button>
                  <button
                    className="carrinho-btn-remover"
                    title="Remover produto"
                    onClick={() => handleRemoverProduto(item.id, item.title)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* COLUNA 2: RESUMO DO PEDIDO */}
        <div className="carrinho-resumo">
          <h2>Resumo do Pedido</h2>

          <div className="carrinho-resumo-linha">
            <span>Subtotal:</span>
            <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(subtotal)}</span>
          </div>

          <div className="carrinho-resumo-linha">
            <span>Frete:</span>
            <span style={{ color: valorFrete === 0 ? 'var(--cor-sucesso)' : 'inherit', fontWeight: valorFrete === 0 ? 'bold' : 'normal' }}>
              {valorFrete === 0 ? 'GRÁTIS' : `R$ ${valorFrete},00`}
            </span>
          </div>

          {cupomAplicado && (
            <div className="carrinho-resumo-linha" style={{ color: 'var(--cor-sucesso)' }}>
              <span>Cupom (IFES10 - 10%):</span>
              <span>
                -{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valorDescontoCupom)}
              </span>
            </div>
          )}

          {/* CAMPO DE CUPOM */}
          <form onSubmit={handleAplicarCupom} className="carrinho-cupom-box">
            <input
              type="text"
              placeholder="Cupom de desconto"
              value={cupom}
              onChange={(e) => setCupom(e.target.value)}
              className="carrinho-cupom-input"
            />
            <button type="submit" className="carrinho-cupom-btn">
              Aplicar
            </button>
          </form>

          <div className="carrinho-resumo-total">
            <span>Total:</span>
            <span>
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valorTotal)}
            </span>
          </div>

          <button
            type="button"
            className="carrinho-btn-finalizar"
            onClick={handleFinalizarCompra}
          >
            Finalizar Compra
          </button>

          {/* BOTÃO ESVAZIAR CARRINHO */}
          <button
            type="button"
            onClick={handleEsvaziarCarrinho}
            style={{
              width: '100%',
              background: 'none',
              border: 'none',
              color: 'var(--cor-alerta)',
              cursor: 'pointer',
              marginTop: '12px',
              fontSize: '0.85rem',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Esvaziar carrinho
          </button>
        </div>
      </div>
    </div>
  );
}