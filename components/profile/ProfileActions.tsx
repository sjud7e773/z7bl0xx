'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut, Edit2, Check, X, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

interface Profile {
  id: string
  email: string | null
  roblox_username: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

interface Props {
  user: User
  profile: Profile | null
}

export default function ProfileActions({ user, profile }: Props) {
  const router = useRouter()
  const [editingRoblox, setEditingRoblox] = useState(false)
  const [robloxInput, setRobloxInput] = useState(profile?.roblox_username ?? '')
  const [robloxDisplay, setRobloxDisplay] = useState(profile?.roblox_username ?? '')
  const [saving, setSaving] = useState(false)
  const [signingOut, setSigningOut] = useState(false)
  const [saveError, setSaveError] = useState('')

  const initial = (user.email ?? 'U').charAt(0).toUpperCase()

  const handleSignOut = async () => {
    setSigningOut(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const handleSaveRoblox = async () => {
    setSaving(true)
    setSaveError('')
    const supabase = createClient()
    const trimmed = robloxInput.trim() || null
    const { error } = await supabase
      .from('profiles')
      .upsert(
        { id: user.id, email: user.email, roblox_username: trimmed, updated_at: new Date().toISOString() },
        { onConflict: 'id' }
      )
    if (error) {
      setSaveError('Erro ao salvar. Tente novamente.')
      setSaving(false)
      return
    }
    setRobloxDisplay(trimmed ?? '')
    setEditingRoblox(false)
    setSaving(false)
    router.refresh()
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Avatar + Email */}
      <div className="flex items-center gap-4">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-black flex-shrink-0"
          style={{ background: 'var(--accent)', color: '#fff', fontFamily: 'Inter' }}
        >
          {initial}
        </div>
        <div className="min-w-0">
          <p
            className="font-bold text-base truncate"
            style={{ color: 'var(--text-primary)', fontFamily: 'Inter' }}
          >
            {user.email}
          </p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--accent-green)', fontFamily: 'Inter' }}>
            Conta ativa
          </p>
        </div>
      </div>

      {/* Roblox Username */}
      <div
        className="rounded-xl p-4"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
      >
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-2"
          style={{ color: 'var(--text-muted)', fontFamily: 'Inter', letterSpacing: '0.1em' }}
        >
          Username do Roblox
        </p>
        {editingRoblox ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <input
                value={robloxInput}
                onChange={(e) => setRobloxInput(e.target.value)}
                placeholder="SeuUserRoblox"
                className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
                style={{
                  background: 'var(--bg-surface)',
                  border: '2px solid var(--accent)',
                  color: 'var(--text-primary)',
                  fontFamily: 'Inter',
                }}
                maxLength={20}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveRoblox()
                  if (e.key === 'Escape') {
                    setEditingRoblox(false)
                    setRobloxInput(robloxDisplay)
                    setSaveError('')
                  }
                }}
              />
              <button
                onClick={handleSaveRoblox}
                disabled={saving}
                style={{ color: 'var(--accent-green)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                aria-label="Salvar"
              >
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
              </button>
              <button
                onClick={() => {
                  setEditingRoblox(false)
                  setRobloxInput(robloxDisplay)
                  setSaveError('')
                }}
                style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                aria-label="Cancelar"
              >
                <X size={16} />
              </button>
            </div>
            {saveError && (
              <p className="text-xs" style={{ color: 'var(--accent-red)', fontFamily: 'Inter' }}>
                {saveError}
              </p>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2">
            <span
              className="text-sm font-medium"
              style={{
                color: robloxDisplay ? 'var(--text-primary)' : 'var(--text-muted)',
                fontFamily: 'Inter',
              }}
            >
              {robloxDisplay || 'Nao definido â€” defina para ver seus pedidos'}
            </span>
            <button
              onClick={() => setEditingRoblox(true)}
              style={{
                color: 'var(--accent)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                flexShrink: 0,
              }}
              aria-label="Editar username"
            >
              <Edit2 size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Sign out */}
      <button
        onClick={handleSignOut}
        disabled={signingOut}
        className="btn-secondary w-full justify-center"
        style={{ padding: '10px 24px', fontSize: '14px' }}
      >
        {signingOut ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <LogOut size={16} />
        )}
        {signingOut ? 'Saindo...' : 'Sair da conta'}
      </button>
    </div>
  )
}
