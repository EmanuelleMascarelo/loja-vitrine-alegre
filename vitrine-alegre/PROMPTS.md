# 💬 Registro de Prompts 
## 📌 Etapa 1: Configuração das Páginas do Usuário e Persistência de Dados
Nesta etapa, o foco foi a criação da estrutura de navegação do perfil e armazenamento do histórico de compras.

* **Prompt 1.1 (Criação de Páginas):**
  > *"Crie os componentes e rotas em React para as páginas 'Meus Pedidos' e 'Minha Conta', integrando com o AuthContext para validar se o usuário está autenticado."*
* **Prompt 1.2 (Checkout e Status do Pedido):**
  > *"Atualize a lógica de checkout no Carrinho.jsx para salvar os novos pedidos no localStorage sob a chave '@vitrine:pedidos' e defina o status inicial como 'Pedido em andamento'."*
* **Prompt 1.3 (Sincronização de Status em MeusPedidos):**
  > *"Atualize o componente MeusPedidos.jsx para carregar os pedidos do localStorage e definir o status padrão da lista de exemplo para 'Pedido em andamento'."*

## 📌 Etapa 2: Desenvolvimento do Componente de Filtro por Categoria (+N)
Nesta etapa, foi implementada a funcionalidade de expansão dinâmica para exibir todas as opções de categorias vindas da API DummyJSON.

* **Prompt 2.1 (Componente Base de Filtro):**
  > *"Crie o componente FiltroCategorias.jsx para renderizar pílulas de categorias, recebendo como props as categorias da API, a categoria ativa e o callback de seleção."*
* **Prompt 2.2 (Lógica do Botão de Expansão +17):**
  > *"Como fazer o elemento +17 funcionar no React para expandir e mostrar as outras 17 opções de categorias quando clicado?"*

## 📌 Etapa 3: Depuração e Ajustes de Layout (CSS e API)
Etapa focada na resolução de problemas visuais e de manipulação de dados onde o clique no botão `+17` não exibia as novas categorias na tela.

* **Prompt 3.1 (Tratamento dos Dados da API):**
  > *"A API da DummyJSON retorna categorias como objetos { slug, name, url }. Atualize o FiltroCategorias.jsx para enviar o slug no clique e exibir o name no botão."*
* **Prompt 3.2 (Ajuste das Regras de Estilo em CSS):**
  > *"O botão +17 ainda não está expandindo as categorias na tela. Atualize o arquivo FiltroCategorias.css para permitir quebra de linha com flex-wrap: wrap e alinhar o select de ordenação ao topo."*
* **Prompt 3.3 (Validação Visual do Erro):**
  > *"O +17 ainda não está aparecendo como botão interativo na tela [imagem anexada]. Atualize o componente e o CSS para resolver este problema."*
