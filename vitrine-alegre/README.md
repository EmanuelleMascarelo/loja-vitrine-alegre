# 🛒 Vitrine Alegre - E-commerce SPA

Projeto desenvolvido para a disciplina de Desenvolvimento Front-End (IFES). A aplicação é um e-commerce Single Page Application (SPA) integrado à API pública DummyJSON, construído com React e Vite.

## 🚀 Tecnologias Utilizadas

- **React** (Biblioteca principal)
- **Vite** (Build tool e ambiente de desenvolvimento)
- **React Router DOM v6** (Gerenciamento de rotas e navegação)
- **Context API** (Gerenciamento de estado global do carrinho)
- **CSS Variables** (Estilização centralizada e temas)

## 📋 Regras de Negócio Implementadas

- **Cotação Fixa do Dólar:** R$ 5,20 por produto.
- **Desconto Ativo:** Aplicado apenas para produtos com desconto `discountPercentage >= 5%`.
- **Frete Grátis:** Concedido para compras a partir de R$ 250,00 (subtotal). Taxa fixa de R$ 15,00 caso contrário.
- **Cupom de Desconto:** Aceita o cupom `IFES10` aplicando 10% de desconto adicional sobre o subtotal.
- **Persistência de Dados:** Carrinho salvo automaticamente no `localStorage`.

## 🛠️ Como Executar o Projeto Localmente

1. **Os repositório:**
   ```bash
   https://github.com/EmanuelleMascarelo/loja-vitrine-alegre
   https://loja-vitrine-alegre.vercel.app/
