# Configuração do Google Pay e Stripe — z7Blox

## Status Atual

O checkout já está configurado com Stripe. Para ativar Google Pay, siga os passos abaixo.

---

## 1. Stripe Dashboard — Configurações de Pagamento

Acesse: https://dashboard.stripe.com/settings/payment_methods

### Ativar Google Pay
1. Na lista de métodos de pagamento, localize **Google Pay**
2. Clique em **Ativar**
3. Google Pay aparece automaticamente no Checkout quando o dispositivo suporta

> **Nota:** Google Pay no Stripe Checkout é habilitado automaticamente quando `payment_method_types` inclui `card`. 
> Não é necessário listar `google_pay` separadamente — o Stripe detecta o dispositivo do cliente e exibe Google Pay de forma nativa.

### Boleto Bancário
O checkout já inclui `boleto` nos métodos de pagamento para clientes brasileiros.
Para ativar, no Stripe Dashboard:
1. Vá em **Métodos de Pagamento**
2. Ative **Boleto**

---

## 2. Stripe Branding — Tema z7Blox

Acesse: https://dashboard.stripe.com/settings/branding

Configure:
| Campo | Valor |
|-------|-------|
| **Cor do Botão** | `#E91E8C` (rosa z7Blox) |
| **Fundo do Checkout** | `#08000F` (roxo escuro) |
| **Cor de Borda/Ícone** | `#7c3aed` (violeta) |
| **Logo** | Faça upload do logo z7Blox (`z7blox-logo.png`) |

---

## 3. Stripe Checkout — Locale

O checkout já está configurado com `locale: 'pt-BR'` e `currency: 'brl'`.

---

## 4. Variáveis de Ambiente Necessárias

No arquivo `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://SEU_PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
STRIPE_SECRET_KEY=sk_live_... (ou sk_test_ para testes)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_... (ou pk_test_)
NEXT_PUBLIC_SITE_URL=https://seusite.com.br
```

---

## 5. Supabase Auth — Configuração

1. Acesse: https://supabase.com/dashboard/project/SEU_PROJETO/auth/providers
2. Certifique-se que **Email** está Habilitado
3. Em **URL Configuration** (https://supabase.com/dashboard/project/SEU_PROJETO/auth/url-configuration):
   - **Site URL**: `https://seusite.com.br`
   - **Redirect URLs**: Adicione `https://seusite.com.br/api/auth/callback`

---

## 6. Webhook Stripe (Produção)

Configure o webhook para receber eventos de pagamento:

1. Acesse: https://dashboard.stripe.com/webhooks
2. Adicione endpoint: `https://seusite.com.br/api/webhook`
3. Eventos a escutar:
   - `checkout.session.completed`
   - `payment_intent.payment_failed`

---

## 7. Teste Local com Google Pay

Para testar Google Pay localmente:
1. Use o Chrome com uma conta Google que tenha um cartão salvo
2. Acesse `https://localhost:3000` (HTTPS necessário — use ngrok ou similar)
3. O botão Google Pay aparecerá automaticamente no Stripe Checkout

---

## Modo Teste vs. Produção

| Ambiente | Stripe Key | Resultado |
|----------|------------|-----------|
| **Teste** | `sk_test_...` | Pagamentos fictícios, sem cobranças reais |
| **Produção** | `sk_live_...` | Cobranças reais — ative apenas quando pronto |

Use o cartão de teste `4242 4242 4242 4242` (qualquer data futura, qualquer CVV) para testar.
