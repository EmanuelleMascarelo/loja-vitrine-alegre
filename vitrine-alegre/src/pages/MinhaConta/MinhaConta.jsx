import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { notificar } from '../../utils/notificacoes';
import './MinhaConta.css';

export default function MinhaConta() {
  const { usuario } = useAuth();

  const [nome, setNome] = useState(usuario?.nome || 'Lais Souza');
  const [email, setEmail] = useState(usuario?.email || 'lais@email.com');
  const [telefone, setTelefone] = useState('(27) 99999-8888');

  function handleSalvar(e) {
    e.preventDefault();
    notificar.sucesso('Dados atualizados com sucesso!');
  }

  return (
    <div className="conta-container">
      <h1 className="conta-titulo">Minha Conta</h1>

      <div className="conta-card">
        <form onSubmit={handleSalvar} className="conta-form">
          <div className="campo-grupo">
            <label htmlFor="nome">Nome Completo</label>
            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className="campo-grupo">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="campo-grupo">
            <label htmlFor="telefone">Telefone / WhatsApp</label>
            <input
              id="telefone"
              type="text"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-salvar-conta">
            Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
}