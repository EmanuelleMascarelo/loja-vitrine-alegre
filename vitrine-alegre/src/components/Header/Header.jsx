import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCarrinho } from '../../context/CarrinhoContext';
import { useAuth } from '../../context/AuthContext';
import { notificar } from '../../utils/notificacoes';
import './Header.css';

export default function Header({ termoBusca, setTermoBusca }) {
  const [menuAberto, setMenuAberto] = useState(false);
  const { carrinho = [] } = useCarrinho();
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const totalItens = Array.isArray(carrinho)
    ? carrinho.reduce((acc, item) => acc + (item.quantidade || 0), 0)
    : 0;

  // Fecha o dropdown se o usuário clicar fora dele
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuAberto(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleLogout() {
    setMenuAberto(false);
    logout();
    notificar.info('Sessão encerrada com sucesso.');
    navigate('/login');
  }

  return (
    <header className="header-container">
      <div className="header-conteudo">
        <div className="header-esquerda">
          <button className="header-btn-hamburguer" aria-label="Abrir menu">
            <span></span>
            <span></span>
            <span></span>
          </button>

          <Link to="/" className="header-logo">
            <span className="header-logo-badge">V</span> Vitrine Alegre
          </Link>
        </div>

        {/* Campo de Busca Funcional */}
        <div className="header-busca">
          <span className="header-busca-icone">🔍</span>
          <input 
            type="text" 
            placeholder="Buscar produtos..." 
            value={termoBusca || ''}
            onChange={(e) => setTermoBusca && setTermoBusca(e.target.value)}
          />
        </div>

        <div className="header-acoes">
          {usuario ? (
            <div className="usuario-dropdown-container" ref={menuRef}>
              <button 
                className="usuario-btn" 
                onClick={() => setMenuAberto(!menuAberto)}
              >
                Olá, <strong>{usuario.nome}</strong>
                <span className={`seta ${menuAberto ? 'aberto' : ''}`}>▾</span>
              </button>

              {menuAberto && (
                <div className="dropdown-menu">
                  <Link 
                    to="/minha-conta" 
                    className="dropdown-item"
                    onClick={() => setMenuAberto(false)}
                  >
                    👤 Minha Conta
                  </Link>
                  <Link 
                    to="/pedidos" 
                    className="dropdown-item"
                    onClick={() => setMenuAberto(false)}
                  >
                    📦 Meus Pedidos
                  </Link>
                  <div className="dropdown-divisor" />
                  <button 
                    className="dropdown-item btn-sair-dropdown" 
                    onClick={handleLogout}
                  >
                    🚪 Sair
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="header-btn-entrar">
              Entrar
            </Link>
          )}

          <Link to="/carrinho" className="header-carrinho-link">
            <span>🛒 Carrinho</span>
            {totalItens > 0 && <span className="header-badge">{totalItens}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
}