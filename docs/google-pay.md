# Google Pay & Apple Pay — z7Blox

## Status
Google Pay e Apple Pay ja estao **habilitados automaticamente** no checkout.

No Stripe Checkout, `payment_method_types: ['card']` inclui automaticamente:
- Google Pay (via cartao salvo no Google)
- Apple Pay (via cartao salvo no Apple Wallet)

Isso acontece porque Google Pay e Apple Pay sao considerados metodos "card-based" pelo Stripe. Nenhuma configuracao extra de codigo e necessaria. Os metodos exibidos incluem:
- **Google Pay** (Chrome/Android)
- **Apple Pay** (Safari/iOS/macOS)
- **PIX** (Brasil)
- **Cartao de credito/debito**
- **Link by Stripe**

## Configuracao no Stripe Dashboard

### 1. Ativar metodos de pagamento
1. Acesse: https://dashboard.stripe.com/settings/payment_methods
2. Ative os metodos desejados para **BRL**:
   - Card (obrigatorio)
   - Google Pay / Apple Pay (automatico com Card)
   - PIX — clique em "Enable" e aguarde aprovacao (pode levar 1-2 dias)
   - Link by Stripe

### 2. Verificar dominio para Apple Pay
Para Apple Pay funcionar em producao, o dominio precisa ser verificado:
1. Acesse: https://dashboard.stripe.com/settings/payment_method_domains
2. Clique em "Add domain"
3. Adicione o seu dominio (ex: `z7blox.com`)
4. Faca o download do arquivo de verificacao e hospede em `/.well-known/apple-pay-domain-verification/`

> Em desenvolvimento (`localhost`) o Apple Pay nao funciona, mas o Google Pay sim (em Chrome com cartao salvo).

### 3. Testar Google Pay localmente
1. Abra o Chrome
2. Salve um cartao de teste em https://pay.google.com
3. No checkout, o botao "Google Pay" aparecera automaticamente

## Cartoes de teste Stripe
| Numero | Resultado |
|--------|-----------|
| 4242 4242 4242 4242 | Sucesso |
| 4000 0000 0000 9995 | Recusado |
| 4000 0025 0000 3155 | Requer autenticacao 3DS |

Validade: qualquer data futura. CVC: qualquer 3 digitos.
