export const COTACAO_DOLAR = 5.20;

/**
 * Formata um valor numérico em Real (BRL).
 */
export function formatarMoeda(valorEmDolar) {
  const valorEmReal = (valorEmDolar || 0) * COTACAO_DOLAR;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valorEmReal);
}

/**
 * Calcula o preço final com o desconto aplicado.
 */
export function calcularPrecoFinal(precoOriginal, percentualDesconto) {
  if (!percentualDesconto || percentualDesconto <= 0) {
    return precoOriginal;
  }
  return precoOriginal * (1 - percentualDesconto / 100);
}