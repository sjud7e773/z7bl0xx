export function formatPrice(value: number | undefined | null, currency = 'BRL'): string {
  if (value === undefined || value === null || isNaN(value) || !isFinite(value)) {
    return 'R$ 0,00'
  }

  const safeValue = typeof value === 'string' ? parseFloat(value as unknown as string) : value

  if (isNaN(safeValue)) return 'R$ 0,00'

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(safeValue)
}

export function calcDiscount(price: number | undefined | null, originalPrice: number | undefined | null): number {
  if (!price || !originalPrice || originalPrice <= price) return 0
  if (isNaN(price) || isNaN(originalPrice)) return 0
  return Math.round(((originalPrice - price) / originalPrice) * 100)
}

export function calcSavings(price: number | undefined | null, originalPrice: number | undefined | null): number {
  if (!price || !originalPrice || originalPrice <= price) return 0
  if (isNaN(price) || isNaN(originalPrice)) return 0
  return originalPrice - price
}

export function calcularPrecoComLucro(precoBase: number | undefined | null, percentualLucro = 0.5): number {
  if (!precoBase || isNaN(precoBase) || !isFinite(precoBase)) return 0
  return precoBase * (1 + percentualLucro)
}

export function converterUSDparaBRL(valorUSD: number | undefined | null, taxaCambio: number): number {
  if (!valorUSD || isNaN(valorUSD) || !taxaCambio || isNaN(taxaCambio)) return 0
  return valorUSD * taxaCambio
}
