# 📓 Diário do Uso de IA (DIARIO-DA-IA.md)

## 1. Colocação de código de componente direto no App.jsx
* **Erro da IA/Arquitetura:** O código de exibição das pílulas e ordenação do filtro estava sendo considerado para inserção direta no arquivo principal `App.jsx`.
* **Diagnóstico:** Manter componentes específicos de interface no `App.jsx` quebra a organização em componentes reutilizáveis do React e polui o gerenciador de rotas.
* **Correção:** O código foi isolado em seu próprio componente em `src/components/FiltroCategorias/FiltroCategorias.jsx` e importado no componente de página (`Vitrine.jsx`).

## 2. Ocultação das categorias expandidas por overflow: hidden e white-space: nowrap no CSS
* **Erro da IA:** O arquivo CSS gerado pela IA continha `overflow: hidden` no `.filtros-container` e `white-space: nowrap` junto com `overflow-x: auto` no `.pilulas-wrapper`.
* **Diagnóstico:** Quando o usuário clicava no botão para expandir (+17), os botões das categorias adicionais eram renderizados no DOM do React, mas ficavam ocultos fora da área visível por falta de permissão de quebra de linha.
* **Correção:** Atualizado o CSS removendo o `overflow: hidden` e aplicando `flex-wrap: wrap` no `.pilulas-wrapper`, permitindo que as categorias extras apareçam em novas linhas abaixo.

## 3. Falha ao tratar a estrutura de objetos { slug, name } da API DummyJSON
* **Erro da IA:** O mapeamento `.map()` tentava usar a variável da categoria diretamente como chave/texto (`cat`), mas a API da DummyJSON podia retornar tanto objetos `{ slug, name }` quanto strings.
* **Diagnóstico:** O React exibia textos indevidos ou falhava ao associar a chave única do elemento (`key`) e a filtragem da categoria ativa.
* **Correção:** Adicionada verificação de tipo para extrair o slug correto para o evento e o name legível para o botão: `const slug = typeof cat === 'object' ? (cat.slug || cat.name) : cat;`.

## 4. +17 renderizado como texto simples em vez de botão interativo
* **Erro da IA:** O botão de contagem de categorias restantes (+17) foi estruturado com estilos ou tags que não garantiam a aparência e o comportamento claro de um botão clicável.
* **Diagnóstico:** O usuário não identificava o +17 como um elemento clicável de expansão devido à falta de indicação visual de botão e feedback de ponteiro (`cursor: pointer`).
* **Correção:** O elemento foi explicitamente configurado com a classe de botão `.pilula-btn-mais` e estilizado com background destacado, borda e estado `:hover` para indicar interatividade.

## 5. Desalinhamento do Select de Ordenação ao expandir a lista
* **Erro da IA:** O contêiner pai `.filtros-conteudo` utilizava `align-items: center`.
* **Diagnóstico:** Quando as categorias expandiam e ocupavam várias linhas, o menu suspenso de ordenação (`<select>`) no lado direito se deslocava para o centro vertical do contêiner em vez de ficar alinhado ao topo.
* **Correção:** Alterado o alinhamento para `align-items: flex-start` no `.filtros-conteudo`, mantendo o seletor fixado na parte superior direita da tela.

## 6. Ausência da propriedade type="button" nos botões do filtro
* **Erro da IA:** Os botões criados dentro do `.map()` no componente `FiltroCategorias` foram definidos usando apenas a tag `<button>` sem especificar o atributo `type`.
* **Diagnóstico:** Em navegadores web, o comportamento padrão do elemento `<button>` dentro ou próximo de um formulário é agir como `type="submit"`, o que causava o recarregamento indesejado da página ao selecionar uma categoria.
* **Correção:** Adicionado explicitamente o atributo `type="button"` em todos os botões de pílula e no botão de expansão (+17).

## 7. Uso de chaves duplicadas (key) no mapeamento das categorias
* **Erro da IA:** O parâmetro `key` do `.map()` usava o nome direto da categoria (`key={nomeCategoria}`).
* **Diagnóstico:** Caso a API retornasse duas categorias com slugs parecidos ou valores nulos/indefinidos no carregamento inicial, o React emitia um aviso no console de *Warning: Encountered two children with the same key*, afetando o desempenho da re-renderização.
* **Correção:** Atualizado a propriedade `key` para usar o slug tratado combinando com o índice como fallback: `key={slug || index}`.
