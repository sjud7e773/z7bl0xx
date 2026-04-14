'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Eye, EyeOff, Lock, Mail, User, ArrowLeft, Check, AlertTriangle } from 'lucide-react'

type AuthMode = 'login' | 'register' | 'forgot'

interface PasswordStrength {
  score: 0 | 1 | 2 | 3 | 4
  label: string
  color: string
  percent: number
  feedback: string[]
}

function evaluatePassword(password: string): PasswordStrength {
  if (!password) return { score: 0, label: '', color: '', percent: 0, feedback: [] }

  const feedback: string[] = []
  let score = 0

  if (password.length >= 8) score++; else feedback.push('Mí­nimo 8 caracteres')
  if (password.length >= 12) score++
  if (/[A-Z]/.test(password)) score++; else feedback.push('Adicione letras maiíºsculas')
  if (/[0-9]/.test(password)) score++; else feedback.push('Adicione níºmeros')
  if (/[^A-Za-z0-9]/.test(password)) score++; else feedback.push('Adicione sí­mbolos (!@#$...)')

  const common = ['123456', 'password', 'senha123', 'qwerty', '111111', 'abc123']
  if (common.some(c => password.toLowerCase().includes(c))) {
    score = Math.max(1, score - 2)
    feedback.push('Evite sequíªncias e palavras óbvias')
  }

  const clampedScore = Math.min(4, score) as 0 | 1 | 2 | 3 | 4

  const map: Record<number, { label: string; color: string; percent: number }> = {
    0: { label: '', color: '', percent: 0 },
    1: { label: 'Fraquí­ssima', color: '#ef4444', percent: 20 },
    2: { label: 'Fraca', color: '#f97316', percent: 45 },
    3: { label: 'Mí©dia', color: '#eab308', percent: 70 },
    4: { label: 'Forte', color: '#22c55e', percent: 100 },
  }

  return { score: clampedScore, feedback, ...map[clampedScore] }
}

interface Props {
  next: string
  urlError?: string
}

export default function LoginClient({ next, urlError }: Props) {
  const router = useRouter()
  const supabase = createClient()

  const [mode, setMode] = useState<AuthMode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(urlError ? decodeURIComponent(urlError).replace(/\+/g, ' ') : '')
  const [success, setSuccess] = useState('')
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>(evaluatePassword(''))

  useEffect(() => {
    if (mode === 'register') {
      setPasswordStrength(evaluatePassword(password))
    }
  }, [password, mode])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    if (authError) {
      setError(
        authError.message === 'Invalid login credentials'
          ? 'Email ou senha incorretos.'
          : 'Erro ao entrar. Tente novamente.'
      )
    } else {
      router.push(next)
      router.refresh()
    }
    setLoading(false)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (passwordStrength.score < 3) {
      setError('Sua senha í© muito fraca. Use ao menos 8 caracteres com letras maiíºsculas e níºmeros.')
      return
    }

    setLoading(true)
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(next)}`,
      },
    })

    if (authError) {
      setError(
        authError.message.includes('already registered')
          ? 'Este email jí¡ estí¡ cadastrado. Faça login.'
          : 'Erro ao criar conta. Tente novamente.'
      )
    } else {
      setSuccess('Conta criada! Verifique seu email para confirmar e ativar o acesso.')
    }
    setLoading(false)
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/api/auth/callback?next=/perfil`,
    })
    if (authError) {
      setError('Erro ao enviar email. Verifique o endereço.')
    } else {
      setSuccess('Email de recuperação enviado! Verifique sua caixa de entrada.')
    }
    setLoading(false)
  }

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode)
    setError('')
    setSuccess('')
  }

  const strength = passwordStrength

  return (
    <div className="login-page">
      {/* LEFT COLUMN â€” Purple space visual */}
      <div className="login-visual" aria-hidden="true">
        <div className="login-visual-inner">
          <Link href="/" className="login-visual-logo">
            <Image
              src="https://i.ibb.co/f36xqgk/z7blox-logo.png"
              alt="z7Blox"
              width={160}
              height={48}
              unoptimized
              style={{ objectFit: 'contain', height: '44px', width: 'auto' }}
            />
          </Link>
          <div className="login-visual-content">
            <h2 className="login-visual-title">
              A melhor loja de<br />
              itens MM2 do Brasil
            </h2>
            <p className="login-visual-subtitle">
              Centenas de Godlys, Ancients e Pets.<br />
              Trade seguro diretamente no Roblox.
            </p>
            <div className="login-visual-stats">
              <div className="login-stat">
                <span className="login-stat-num">10k+</span>
                <span className="login-stat-label">Clientes</span>
              </div>
              <div className="login-stat">
                <span className="login-stat-num">500+</span>
                <span className="login-stat-label">Itens</span>
              </div>
              <div className="login-stat">
                <span className="login-stat-num">24/7</span>
                <span className="login-stat-label">Suporte</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN â€” Form */}
      <div className="login-form-col">
        <div className="login-form-wrap">
          {/* Mobile logo */}
          <div className="login-mobile-logo">
            <Link href="/">
              <Image
                src="https://i.ibb.co/f36xqgk/z7blox-logo.png"
                alt="z7Blox"
                width={140}
                height={40}
                unoptimized
                style={{ objectFit: 'contain', height: '36px', width: 'auto' }}
              />
            </Link>
          </div>

          {/* Title & subtitle */}
          {mode === 'login' && (
            <>
              <h1 className="login-title">Bem-vindo de volta</h1>
              <p className="login-sub">Entre na sua conta para continuar</p>
            </>
          )}
          {mode === 'register' && (
            <>
              <h1 className="login-title">Criar conta grí¡tis</h1>
              <p className="login-sub">Comece a comprar em menos de 1 minuto</p>
            </>
          )}
          {mode === 'forgot' && (
            <>
              <h1 className="login-title">Recuperar senha</h1>
              <p className="login-sub">Enviaremos um link para o seu email</p>
            </>
          )}

          {/* Success message */}
          {success && (
            <div className="auth-success">
              <Check size={16} />
              {success}
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="auth-error">
              <AlertTriangle size={16} />
              {error}
            </div>
          )}

          {/* LOGIN FORM */}
          {mode === 'login' && !success && (
            <form onSubmit={handleLogin} className="auth-form">
              <div className="field-group">
                <label className="field-label">Email</label>
                <div className="field-input-wrap">
                  <Mail size={16} className="field-icon" />
                  <input
                    type="email"
                    className="field-input"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    autoFocus
                  />
                </div>
              </div>

              <div className="field-group">
                <div className="field-label-row">
                  <label className="field-label">Senha</label>
                  <button
                    type="button"
                    className="forgot-link"
                    onClick={() => switchMode('forgot')}
                  >
                    Esqueci minha senha
                  </button>
                </div>
                <div className="field-input-wrap">
                  <Lock size={16} className="field-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="field-input"
                    placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="field-eye"
                    onClick={() => setShowPassword(s => !s)}
                    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? <span className="auth-spinner" /> : null}
                {loading ? 'Entrando...' : 'Entrar na conta'}
              </button>

              <p className="auth-switch">
                Não tem conta?{' '}
                <button type="button" onClick={() => switchMode('register')}>
                  Criar agora
                </button>
              </p>
            </form>
          )}

          {/* REGISTER FORM */}
          {mode === 'register' && !success && (
            <form onSubmit={handleRegister} className="auth-form">
              <div className="field-group">
                <label className="field-label">Nome completo</label>
                <div className="field-input-wrap">
                  <User size={16} className="field-icon" />
                  <input
                    type="text"
                    className="field-input"
                    placeholder="Seu nome"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    required
                    autoComplete="name"
                  />
                </div>
              </div>

              <div className="field-group">
                <label className="field-label">Email</label>
                <div className="field-input-wrap">
                  <Mail size={16} className="field-icon" />
                  <input
                    type="email"
                    className="field-input"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="field-group">
                <label className="field-label">Senha</label>
                <div className="field-input-wrap">
                  <Lock size={16} className="field-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="field-input"
                    placeholder="Mí­nimo 8 caracteres"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                    minLength={8}
                  />
                  <button
                    type="button"
                    className="field-eye"
                    onClick={() => setShowPassword(s => !s)}
                    aria-label={showPassword ? 'Ocultar' : 'Mostrar'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {/* Password strength meter */}
                {password.length > 0 && (
                  <div className="password-strength-wrap">
                    <div className="strength-bar-track">
                      <div
                        className="strength-bar-fill"
                        style={{
                          width: `${strength.percent}%`,
                          backgroundColor: strength.color,
                          transition: 'width 0.3s ease, background-color 0.3s ease',
                        }}
                      />
                    </div>
                    <div className="strength-info" style={{ color: strength.color }}>
                      <span className="strength-label">{strength.label}</span>
                      {strength.score >= 4 && <Check size={12} />}
                    </div>
                    {strength.feedback.length > 0 && (
                      <ul className="strength-feedback">
                        {strength.feedback.map((tip) => (
                          <li key={tip}>{tip}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="auth-submit-btn"
                disabled={loading || strength.score < 3}
              >
                {loading ? <span className="auth-spinner" /> : null}
                {loading ? 'Criando conta...' : 'Criar minha conta'}
              </button>

              <p className="auth-switch">
                Jí¡ tem conta?{' '}
                <button type="button" onClick={() => switchMode('login')}>
                  Fazer login
                </button>
              </p>
            </form>
          )}

          {/* FORGOT PASSWORD FORM */}
          {mode === 'forgot' && !success && (
            <form onSubmit={handleForgotPassword} className="auth-form">
              <div className="field-group">
                <label className="field-label">Seu email cadastrado</label>
                <div className="field-input-wrap">
                  <Mail size={16} className="field-icon" />
                  <input
                    type="email"
                    className="field-input"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? <span className="auth-spinner" /> : null}
                {loading ? 'Enviando...' : 'Enviar link de recuperação'}
              </button>

              <button
                type="button"
                className="auth-back-btn"
                onClick={() => switchMode('login')}
              >
                <ArrowLeft size={15} />
                Voltar para o login
              </button>
            </form>
          )}

          <p className="auth-terms">
            Ao criar uma conta, vocíª concorda com nossos{' '}
            <Link href="/termos">Termos de Uso</Link>{' '}
            e{' '}
            <Link href="/privacidade">Polí­tica de Privacidade</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
