import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const salvo = localStorage.getItem('@vitrine-alegre:usuario');
    return salvo ? JSON.parse(salvo) : null;
  });

  const [usuariosCadastrados, setUsuariosCadastrados] = useState(() => {
    const salvos = localStorage.getItem('@vitrine-alegre:usuarios-registrados');
    return salvos ? JSON.parse(salvos) : [];
  });

  useEffect(() => {
    localStorage.setItem('@vitrine-alegre:usuario', JSON.stringify(usuario));
  }, [usuario]);

  useEffect(() => {
    localStorage.setItem('@vitrine-alegre:usuarios-registrados', JSON.stringify(usuariosCadastrados));
  }, [usuariosCadastrados]);

  function cadastrar(nome, email, senha) {
    const existe = usuariosCadastrados.some((u) => u.email === email);
    if (existe) {
      toast.error('E-mail já cadastrado!');
      return false;
    }

    const novoUsuario = { nome, email, senha };
    setUsuariosCadastrados([...usuariosCadastrados, novoUsuario]);
    toast.success('Cadastro realizado com sucesso! Faça login.');
    return true;
  }

  function login(email, senha) {
    const user = usuariosCadastrados.find((u) => u.email === email && u.senha === senha);
    if (!user) {
      toast.error('E-mail ou senha incorretos.');
      return false;
    }

    setUsuario({ nome: user.nome, email: user.email });
    toast.success(`Bem-vindo(a), ${user.nome}!`);
    return true;
  }

  function logout() {
    setUsuario(null);
    toast.error('Sessão encerrada.');
  }

  return (
    <AuthContext.Provider value={{ usuario, login, cadastrar, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return context;
}