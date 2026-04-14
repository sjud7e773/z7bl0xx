
'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { ArrowLeft, AlertTriangle, Check, Lock } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

interface RobloxUser {
  id: number
  name: string
  displayName: string
  avatarUrl: string | null
}

interface RobloxVerificationProps {
  onConfirm: (username: string) => void
  onBack: () => void
}

export function RobloxVerification({ onConfirm, onBack }: RobloxVerificationProps) {
  const { robloxUsername, setRobloxUsername } = useCartStore()
  const [input, setInput] = useState(robloxUsername)
  const [user, setUser] = useState<RobloxUser | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  const searchUser = useCallback(async (username: string) => {
    if (!username || username.length < 3) {
      setUser(null)
      setError('')
      return
    }

    setLoading(true)
    setError('')
    setUser(null)
    setConfirmed(false)

    try {
      const res = await fetch(`/api/roblox/user?username=${encodeURIComponent(username)}`)
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Usuí¡rio não encontrado no Roblox.')
        setUser(null)
      } else {
        setUser(data)
      }
    } catch {
      setError('Erro ao conectar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!input.trim()) {
      setUser(null)
      setError('')
      return
    }
    const timer = setTimeout(() => searchUser(input.trim()), 600)
    return () => clearTimeout(timer)
  }, [input, searchUser])

  const handleConfirm = () => {
    if (!user) return
    setRobloxUsername(user.name)
    setConfirmed(true)
    setTimeout(() => onConfirm(user.name), 400)
  }

  return (
    <div className="roblox-verify-container">
      <button className="roblox-verify-back" onClick={onBack}>
        <ArrowLeft size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
        Voltar ao carrinho
      </button>

      <h2 className="roblox-verify-title">Para onde enviaremos o trade?</h2>
      <p className="roblox-verify-subtitle">
        Digite seu username do Roblox. Vamos buscar seu perfil para confirmar.
      </p>

      <div className="roblox-input-wrap">
        <input
          type="text"
          className="roblox-input"
          placeholder="Ex: SeuUserRoblox123"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={20}
          autoFocus
          autoComplete="off"
          spellCheck={false}
        />
        {loading && <span className="roblox-input-spinner" />}
      </div>

      {error && (
        <div className="roblox-error" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertTriangle size={14} style={{ flexShrink: 0 }} /> {error}
        </div>
      )}

      {user && !loading && (
        <div className={`roblox-profile-card${confirmed ? ' confirmed' : ''}`}>
          <div className="roblox-avatar-wrap">
            {user.avatarUrl ? (
              <Image
                src={user.avatarUrl}
                alt={user.displayName}
                width={88}
                height={88}
                className="roblox-avatar"
                unoptimized
              />
            ) : (
              <div className="roblox-avatar-placeholder">
                {user.displayName.charAt(0).toUpperCase()}
              </div>
            )}
            {confirmed && (
              <div className="roblox-avatar-check">
                <Check size={14} />
              </div>
            )}
          </div>

          <div className="roblox-profile-info">
            <span className="roblox-display-name">{user.displayName}</span>
            <span className="roblox-username">@{user.name}</span>
            <span className="roblox-confirm-hint">
              í‰ esta a conta correta?
            </span>
          </div>

          <div className="roblox-confirm-actions">
            <button
              className="btn-roblox-confirm"
              onClick={handleConfirm}
              disabled={confirmed}
            >
              {confirmed ? <><Check size={14} /> Confirmado!</> : 'Sim, e esta conta'}
            </button>
            <button
              className="btn-roblox-wrong"
              onClick={() => { setInput(''); setUser(null); setConfirmed(false) }}
            >
              Não í© esta conta
            </button>
          </div>
        </div>
      )}

      <div className="roblox-security-note" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
        <Lock size={13} style={{ flexShrink: 0 }} /> Nunca compartilhamos sua senha. O trade e enviado diretamente no jogo.
      </div>
    </div>
  )
}
