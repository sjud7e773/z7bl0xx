'use client'

import { useState } from 'react'
import Image from 'next/image'
import { CheckCircle, Search, Loader2 } from 'lucide-react'

interface RobloxUser {
  id: string
  name: string
  displayName: string
  avatarUrl: string | null
}

export default function RobloxUsernameForm({ sessionId }: { sessionId: string }) {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [foundUser, setFoundUser] = useState<RobloxUser | null>(null)
  
  const [linking, setLinking] = useState(false)
  const [success, setSuccess] = useState(false)

  const searchUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim() || username.length < 3) return

    setLoading(true)
    setError('')
    setFoundUser(null)

    try {
      const res = await fetch(`/api/roblox/user?username=${encodeURIComponent(username.trim())}`)
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Erro ao buscar usuí¡rio.')
        return
      }

      setFoundUser(data)
    } catch {
      setError('Erro de conexão ao buscar usuí¡rio.')
    } finally {
      setLoading(false)
    }
  }

  const confirmLink = async () => {
    if (!foundUser) return
    setLinking(true)
    setError('')
    
    try {
      const res = await fetch('/api/checkout/link-roblox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          robloxUsername: foundUser.name
        })
      })
      const data = await res.json()
      
      if (!res.ok) {
        setError(data.error || 'Erro ao vincular conta.')
        return
      }
      
      setSuccess(true)
    } catch {
      setError('Erro de conexão ao salvar usuí¡rio.')
    } finally {
      setLinking(false)
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center gap-4 text-center animate-in fade-in zoom-in duration-300">
        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[#22c55e]/10">
          <CheckCircle size={36} color="#22c55e" />
        </div>
        <div>
          <h2 className="font-black text-xl mb-1 text-white">Pronto, {foundUser?.name}!</h2>
          <p className="text-sm text-[#b8a9d9]">
            Seu pedido foi associado e vocíª receberí¡ o item via trade em breve!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col gap-4 text-left">
      <h2 className="font-bold text-lg text-white font-['Inter']">Conta de Entrega</h2>
      
      {!foundUser ? (
        <form onSubmit={searchUser} className="flex flex-col gap-3">
          <p className="text-sm text-[#b8a9d9]">
            Para receber seus itens MM2, por favor confirme seu nome de usuí¡rio exato do Roblox:
          </p>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b5f85]">@</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Seu usuí¡rio (não exibição)"
                className="w-full h-12 bg-[#080010] border border-[rgba(139,92,246,0.2)] rounded-lg pl-8 pr-4 text-white text-sm outline-none focus:border-[#E91E8C] transition-colors"
                required
                disabled={loading}
              />
            </div>
            <button 
              type="submit" 
              disabled={loading || username.length < 3}
              className="h-12 w-12 flex items-center justify-center bg-[#E91E8C] rounded-lg text-white hover:bg-[#C2177A] disabled:opacity-50 transition-colors shrink-0"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
            </button>
          </div>
          {error && <p className="text-xs text-[#ef4444] font-medium">{error}</p>}
        </form>
      ) : (
        <div className="flex flex-col gap-4 animate-in fade-in duration-300">
          <div className="bg-[#0f0020] border border-[rgba(139,92,246,0.2)] rounded-xl p-4 flex items-center gap-4">
            <div className="w-16 h-16 shrink-0 rounded-full bg-[#1a0535] overflow-hidden flex items-center justify-center border-2 border-[rgba(139,92,246,0.3)]">
              {foundUser.avatarUrl ? (
                <Image src={foundUser.avatarUrl} alt={foundUser.name} width={64} height={64} unoptimized />
              ) : (
                <span className="font-bold text-[#E91E8C]">?</span>
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <p className="font-bold text-white truncate">{foundUser.displayName}</p>
              <p className="text-xs text-[#b8a9d9] truncate">@{foundUser.name}</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => setFoundUser(null)}
              disabled={linking}
              className="flex-1 h-11 rounded-lg border border-[rgba(139,92,246,0.2)] text-[#b8a9d9] font-semibold text-sm hover:bg-[#080010] transition-colors"
            >
              Alterar
            </button>
            <button 
              onClick={confirmLink}
              disabled={linking}
              className="flex-1 h-11 rounded-lg bg-[#E91E8C] text-white font-semibold text-sm hover:bg-[#C2177A] transition-colors flex items-center justify-center gap-2"
            >
              {linking ? <Loader2 size={16} className="animate-spin" /> : 'Confirmar Conta'}
            </button>
          </div>
          {error && <p className="text-xs text-[#ef4444] text-center font-medium">{error}</p>}
        </div>
      )}
    </div>
  )
}
