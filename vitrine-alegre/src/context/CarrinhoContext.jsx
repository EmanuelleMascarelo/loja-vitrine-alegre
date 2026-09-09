import { createContext, useContext, useState, useEffect } from 'react';
import { notificar } from '../utils/notificacoes';

const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
  // Inicializa tentando ler do localStorage ou começa com array vazio
  const [carrinho, setCarrinho] = useState(() => {
    const dadosSalvos = localStorage.getItem('@vitrine-alegre:carrinho');
    return dadosSalvos ? JSON.parse(dadosSalvos) : [];
  });

  // Salva no localStorage sempre que o carrinho for alterado (Persistência no F5)
  useEffect(() => {
    localStorage.setItem('@vitrine-alegre:carrinho', JSON.stringify(carrinho));
  }, [carrinho]);

  function adicionarAoCarrinho(produto, quantidade = 1) {
    setCarrinho((itensAtuais) => {
      const itemExiste = itensAtuais.find((item) => item.id === produto.id);

      if (itemExiste) {
        return itensAtuais.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + quantidade }
            : item
        );
      }

      return [...itensAtuais, { ...produto, quantidade }];
    });

    // Notificação elegante via Toast
    notificar.sucesso(`${produto.title} adicionado ao carrinho!`);
  }

  function atualizarQuantidade(id, novaQuantidade) {
    if (novaQuantidade <= 0) {
      removerDoCarrinho(id);
      return;
    }

    setCarrinho((itensAtuais) =>
      itensAtuais.map((item) =>
        item.id === id ? { ...item, quantidade: novaQuantidade } : item
      )
    );
  }

  function removerDoCarrinho(id) {
    const itemRemovido = carrinho.find((item) => item.id === id);
    setCarrinho((itensAtuais) => itensAtuais.filter((item) => item.id !== id));

    if (itemRemovido) {
      notificar.info(`${itemRemovido.title} removido do carrinho!`);
    }
  }

  function limparCarrinho() {
    setCarrinho([]);
    notificar.info('Carrinho esvaziado.');
  }

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho: carrinho || [], // Garantia de que nunca será undefined
        adicionarAoCarrinho,
        atualizarQuantidade,
        removerDoCarrinho,
        limparCarrinho,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  const context = useContext(CarrinhoContext);
  if (!context) {
    throw new Error('useCarrinho deve ser usado dentro de um CarrinhoProvider');
  }
  return context;
}