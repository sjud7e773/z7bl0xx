# Stripe Branding — z7Blox

## Onde configurar
Dashboard Stripe → Settings → Branding
Link: https://dashboard.stripe.com/settings/branding

## Configuracoes recomendadas

### Logo
- Formato: PNG ou SVG, fundo transparente recomendado
- Tamanho: 512x512px ou superior
- Envie o logo z7Blox sem fundo

### Cores
| Campo | Valor |
|-------|-------|
| Brand color (fundo do checkout) | `#080010` |
| Accent color (botoes) | `#E91E8C` |

### Icone
- Envie o icone quadrado da z7Blox (ex: apenas o "Z7" do logo)
- Aparece no browser tab do checkout Stripe

## Configuracao do e-mail de confirmacao

Dashboard Stripe → Settings → Emails
Link: https://dashboard.stripe.com/settings/emails

- **Support phone**: adicione seu numero de suporte
- **Support email**: suporte@z7blox.com (ou seu email)
- **Website**: https://z7blox.com
- Ative "Send email receipts" para enviar recibo automaticamente

## Configuracao de dominio customizado (opcional)

Para o checkout Stripe aparecer como `checkout.z7blox.com`:
1. Dashboard → Settings → Custom domains
2. Adicione seu dominio
3. Configure os DNS records indicados

> Requer plano pago do Stripe com Custom Domains habilitado.

## Webhooks — Producao

Quando o site for para producao:
1. Dashboard → Developers → Webhooks → Add endpoint
2. URL: `https://seudominio.com/api/webhook`
3. Eventos: `checkout.session.completed`
4. Copie o "Signing secret" (whsec_...)
5. Adicione em `.env.local`: `STRIPE_WEBHOOK_SECRET=whsec_...`

## Checklist pre-lancamento

- [ ] Logo enviado no Stripe Branding
- [ ] Cores configuradas (#080010 / #E91E8C)
- [ ] E-mail de suporte configurado
- [ ] Webhook de producao configurado com STRIPE_WEBHOOK_SECRET
- [ ] PIX ativado nas Payment Methods
- [ ] Dominio Apple Pay verificado
- [ ] Modo LIVE ativado (trocar sk_test_ por sk_live_)
