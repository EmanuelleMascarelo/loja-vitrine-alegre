# 🛍️ Vitrine Alegre - E-commerce SPA

### 🔗 Links Rápidos
* **Repositório GitHub:** https://github.com/EmanuelleMascarelo/loja-vitrine-alegre
* **Site Publicado (Vercel):** https://loja-vitrine-alegre.vercel.app/

---

## 🎯 Extensões Implementadas (Seção 4.3)
1. **Deploy na Vercel** (Obrigatório)
2. **Carrinho com Persistência no `localStorage`** (Armazenamento e recuperação automática dos itens do carrinho e histórico de pedidos no navegador)

---

## 📖 Sobre o Projeto
Projeto desenvolvido para a disciplina de Desenvolvimento Front-End (IFES - Campus Alegre). A aplicação é um e-commerce do tipo *Single Page Application* (SPA) integrado à API pública [DummyJSON](https://dummyjson.com/), construído com **React** e **Vite**.

### ⚙️ Regras de Negócio e Funcionalidades
* **Cotação Fixa do Dólar:** R$ 5,20 por produto.
* **Desconto Ativo:** Aplicado apenas para produtos com desconto de no mínimo 5% (`discountPercentage >= 5%`).
* **Regra de Frete:** Frete grátis para compras a partir de R$ 250,00 (subtotal). Taxa fixa de R$ 15,00 para valores inferiores.
* **Cupom de Desconto:** Aceita o cupom `IFES10`, aplicando 10% de desconto adicional sobre o subtotal.
* **Filtro de Categorias:** Navegação dinâmica por categorias da API com expansão de pílulas (`+17`).
* **Persistência de Dados:** Carrinho e pedidos salvos e sincronizados via `localStorage`.

---

## 📁 Estrutura de Documentação da IA

Acompanhe o processo de desenvolvimento e o histórico de uso das ferramentas de IA nos arquivos dedicados:
* [`PROMPTS.md`](./PROMPTS.md) — Registros dos prompts organizados por etapas de desenvolvimento.
* [`DIARIO-DA-IA.md`](./DIARIO-DA-IA.md) — Diagnóstico de erros cometidos pela IA e soluções aplicadas no código.

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
* **Node.js** (versão 18 ou superior)
* **npm** ou **yarn**

### Passo a Passo

1. **Clonar o repositório:**
   ```bash
   git clone [https://github.com/EmanuelleMascarelo/loja-vitrine-alegre.git](https://github.com/EmanuelleMascarelo/loja-vitrine-alegre.git)
