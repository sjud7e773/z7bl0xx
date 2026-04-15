import Link from 'next/link'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import RobloxUsernameForm from '@/components/checkout/RobloxUsernameForm'
import ClearCartOnSuccess from '@/components/ui/ClearCartOnSuccess'

interface Props {
  params: Promise<{ id: string }>
}

export default async function PedidoConfirmarPage({ params }: Props) {
  const { id } = await params

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <ClearCartOnSuccess />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[900px] bg-accent-green/5 blur-[120px] pointer-events-none" />
      <div className="w-full max-w-[560px] bg-surface border border-border rounded-[20px] p-8 md:p-10 flex flex-col gap-8 shadow-2xl relative z-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-20 h-20 bg-accent-green/10 border border-accent-green/20 rounded-full flex items-center justify-center">
            <CheckCircle2 size={40} className="text-accent-green" />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-cabin font-bold text-[28px] text-text-primary">Pagamento confirmado</h1>
            <p className="font-inter font-medium text-[15px] text-text-muted">
              Seu pedido foi criado com sucesso. Confirme abaixo a conta Roblox que deve receber o trade.
            </p>
          </div>
        </div>

        <RobloxUsernameForm sessionId={id} />

        <div className="w-full bg-[#2a2000] border border-[#5c4a00] rounded-[10px] p-4 flex items-start gap-3">
          <AlertCircle className="text-[#ffc107] shrink-0" size={20} />
          <p className="font-inter font-medium text-[13px] text-[#ffeb99] leading-snug">
            Deixe o trade habilitado nas configurações de privacidade do Roblox e permaneça online no Murder Mystery 2 para receber seus itens.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <Link href="/perfil" className="font-inter font-bold text-[14px] text-text-primary hover:text-accent-pink transition-colors">
            Ver meus pedidos
          </Link>
          <Link href="/" className="font-inter font-bold text-[14px] text-text-muted hover:text-text-primary transition-colors">
            Voltar para a loja
          </Link>
        </div>
      </div>
    </div>
  )
}
