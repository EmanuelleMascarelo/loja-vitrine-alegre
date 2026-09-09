import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { formatarMoeda } from '../../utils/formatters';
import './MeusPedidos.css';

export default function MeusPedidos() {
  const { usuario } = useAuth();
  const [pedidos, setPedidos] = useState([]);

  // Pedidos iniciais ajustados com os valores exatos da sua imagem
  const pedidosPadrao = [
    {
      id: 'PED-9842',
      data: '08/09/2026',
      status: 'Entregue',
      statusClasse: 'sucesso',
      total: 1507.48,
      itens: [
        { id: 1, nome: 'Fone de Ouvido Sem Fio Bluetooth', qtd: 1, preco: 987.48 },
        { id: 2, nome: 'Carregador Rápido USB-C', qtd: 1, preco: 520.00 }
      ]
    },
    {
      id: 'PED-9102',
      data: '01/09/2026',
      status: 'Em Trânsito',
      statusClasse: 'alerta',
      total: 754.00,
      itens: [
        { id: 3, nome: 'Mochila Esportiva Impermeável', qtd: 1, preco: 754.00 }
      ]
    }
  ];

  useEffect(() => {
    // Carrega do LocalStorage ou define os valores de exemplo se não houver registros
    const salvos = JSON.parse(localStorage.getItem('@vitrine:pedidos'));
    if (salvos && salvos.length > 0) {
      setPedidos(salvos);
    } else {
      setPedidos(pedidosPadrao);
      localStorage.setItem('@vitrine:pedidos', JSON.stringify(pedidosPadrao));
    }
  }, []);

  if (!usuario) {
    return (
      <div className="pedidos-container vazio">
        <h2>Acesso não autorizado</h2>
        <p>Faça login para visualizar o seu histórico de pedidos.</p>
        <Link to="/login" className="btn-voltar">Ir para Login</Link>
      </div>
    );
  }

  return (
    <div className="pedidos-container">
      <h1 className="pedidos-titulo">Meus Pedidos</h1>

      {pedidos.length === 0 ? (
        <div className="pedidos-vazio">
          <p>Você ainda não realizou nenhum pedido.</p>
          <Link to="/" className="btn-voltar">Ir às compras</Link>
        </div>
      ) : (
        <div className="pedidos-lista">
          {pedidos.map((ped) => (
            <div key={ped.id} className="pedido-card">
              <div className="pedido-header">
                <div>
                  <span className="pedido-codigo">{ped.id}</span>
                  <span className="pedido-data">Realizado em {ped.data}</span>
                </div>
                <span className={`pedido-badge ${ped.statusClasse}`}>
                  {ped.status}
                </span>
              </div>

              <div className="pedido-corpo">
                {ped.itens.map((item, index) => (
                  <div key={item.id || index} className="pedido-item-linha">
                    <span>{item.qtd}x {item.nome}</span>
                    <span>{formatarMoeda ? formatarMoeda(item.preco) : `R$ ${item.preco.toFixed(2)}`}</span>
                  </div>
                ))}
              </div>

              <div className="pedido-footer">
                <span>Total: <strong>{formatarMoeda ? formatarMoeda(ped.total) : `R$ ${ped.total.toFixed(2)}`}</strong></span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}