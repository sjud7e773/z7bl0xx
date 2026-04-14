'use client'

import { useState, useEffect } from 'react'

export interface Produto {
  id: string
  nome: string
  nomeTraducido: string
  descricao: string
  descricaoTraduzida: string
  imagem: string
  precoOriginalUSD: number
  precoBRL: number
  precoFinalBRL: number
  categoria: string
  disponivel: boolean
}

interface RawProduto {
  id: string
  nome?: string
  nomeTraducido?: string
  descricao?: string
  descricaoTraduzida?: string
  imagem?: string
  precoOriginal?: number
  precoOriginalUSD?: number
  precoBRL?: number
  precoFinalBRL?: number
  categoria?: string
  disponivel?: boolean
}

export function useProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function carregar() {
      try {
        const resProdutos = await fetch('/api/produtos', {
          signal: AbortSignal.timeout(15000),
        })

        if (!resProdutos.ok) {
          if (isMounted) setErro('Erro ao carregar produtos. Tente novamente.')
          return
        }

        const dadosProdutos = await resProdutos.json()

        if (!Array.isArray(dadosProdutos)) {
          if (isMounted) setProdutos([])
          return
        }

        const processados: Produto[] = dadosProdutos.map((item: RawProduto) => ({
          id: String(item.id || Math.random().toString(36).substring(7)),
          nome: item.nome || item.nomeTraducido || '',
          nomeTraducido: item.nomeTraducido || item.nome || '',
          descricao: item.descricao || item.descricaoTraduzida || '',
          descricaoTraduzida: item.descricaoTraduzida || item.descricao || '',
          imagem: item.imagem || '',
          precoOriginalUSD: Number(item.precoOriginalUSD ?? item.precoOriginal ?? 0),
          precoBRL: Number(item.precoBRL ?? 0),
          precoFinalBRL: Number(item.precoFinalBRL ?? 0),
          categoria: item.categoria || 'outros',
          disponivel: item.disponivel ?? true,
        }))

        if (isMounted) {
          setProdutos(processados)
          setErro(null)
        }
      } catch {
        if (isMounted) {
          setErro('Erro ao carregar produtos. Tente novamente.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    carregar()
    const interval = setInterval(carregar, 300000)

    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, [])

  return { produtos, loading, erro }
}
