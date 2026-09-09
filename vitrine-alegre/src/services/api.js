const BASE_URL = 'https://dummyjson.com/products';

/**
 * Busca a lista de produtos com suporte a paginação, busca por texto,
 * filtragem por categoria e ordenação.
 */
export async function listarProdutos({ pagina = 1, busca = '', categoria = '', ordenacao = '' } = {}) {
  try {
    const limite = 12;
    const skip = (pagina - 1) * limite;
    let url = `${BASE_URL}?limit=${limite}&skip=${skip}`;

    if (busca.trim()) {
      url = `${BASE_URL}/search?q=${encodeURIComponent(busca.trim())}&limit=${limite}&skip=${skip}`;
    } else if (categoria.trim()) {
      url = `${BASE_URL}/category/${encodeURIComponent(categoria.trim())}?limit=${limite}&skip=${skip}`;
    }

    if (ordenacao) {
      const [sortBy, order] = ordenacao.split('-');
      url += `&sortBy=${sortBy}&order=${order}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data; // Devolve { products: [], total: number, skip: number, limit: number }
  } catch (error) {
    console.error('[API listarProdutos Error]:', error);
    throw new Error('Não foi possível carregar a lista de produtos. Tente novamente mais tarde.');
  }
}

/**
 * Busca os detalhes de um único produto pelo ID.
 */
export async function buscarProdutoPorId(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Produto não encontrado.');
      }
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`[API buscarProdutoPorId Error - ID ${id}]:`, error);
    throw error;
  }
}

/**
 * Retorna todas as categorias disponíveis na API.
 */
export async function listarCategorias() {
  try {
    const response = await fetch(`${BASE_URL}/category-list`);

    if (!response.ok) {
      throw new Error('Não foi possível carregar as categorias.');
    }

    return await response.json();
  } catch (error) {
    console.error('[API listarCategorias Error]:', error);
    throw error;
  }
}