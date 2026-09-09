import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

export default function Login() {
  const [modoCadastro, setModoCadastro] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const { login, cadastrar } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (modoCadastro) {
      if (!nome || !email || !senha) return;
      const sucesso = cadastrar(nome, email, senha);
      if (sucesso) setModoCadastro(false);
    } else {
      if (!email || !senha) return;
      const sucesso = login(email, senha);
      if (sucesso) navigate('/');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>{modoCadastro ? 'Criar Conta' : 'Entrar na Conta'}</h2>

        <form onSubmit={handleSubmit} className="login-form">
          {modoCadastro && (
            <div className="form-group">
              <label>Nome Completo</label>
              <input
                type="text"
                placeholder="Seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>E-mail</label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            {modoCadastro ? 'Cadastrar' : 'Entrar'}
          </button>
        </form>

        <p className="login-troca">
          {modoCadastro ? 'Já tem uma conta?' : 'Ainda não tem conta?'}
          <button
            type="button"
            onClick={() => setModoCadastro(!modoCadastro)}
            className="link-toggle"
          >
            {modoCadastro ? ' Entrar' : ' Cadastre-se'}
          </button>
        </p>
      </div>
    </div>
  );
}