# z7Blox Store

Loja premium de itens Murder Mystery 2 (Roblox) com entrega instantânea via trade.

## Stack

| Camada | Tecnologia |
|---|---|
| **Framework** | Next.js 15 (App Router, SSR/SSG) |
| **Linguagem** | TypeScript (strict) |
| **Estilo** | Tailwind CSS + CSS Variables (3 temas) |
| **Backend** | Supabase (PostgreSQL + Realtime + RLS) |
| **Pagamentos** | Stripe Checkout (BRL) |
| **Estado** | Zustand (persist) |
| **Animações** | Framer Motion |

## Setup Rápido

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar variáveis de ambiente
```bash
cp .env.example .env.local
```
Preencha `.env.local` com suas chaves reais:
```
NEXT_PUBLIC_SUPABASE_URL=https://wjmvmyenwniouvzuwyxm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<sua_anon_key>
SUPABASE_SERVICE_ROLE_KEY=<sua_service_role_key>
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Criar tabela de pedidos no Supabase
Abra o [SQL Editor do Supabase](https://supabase.com/dashboard/project/wjmvmyenwniouvzuwyxm/sql/new) e cole o conteúdo de `scripts/create-orders-table.sql`.

### 4. Popular produtos (opcional)
```bash
npm run seed
```

### 5. Adicionar logo e favicon em `/public/`

| Arquivo | Descrição |
|---|---|
| `z7blox-logo.svg` | Logo principal (substitua com PNG se preferir) |
| `favicon.svg` | Ícone da aba do browser |
| `apple-touch-icon.png` | Ícone iOS (180×180px) |

> **Trocar logo:** substitua `src="/z7blox-logo.svg"` nos arquivos:
> `Header.tsx`, `Footer.tsx`, `sucesso/page.tsx`, `not-found.tsx`

### 6. Iniciar servidor
```bash
npm run dev
```
Acesse: http://localhost:3000

## Todas as Rotas

| Rota | Tipo | Descrição |
|---|---|---|
| `/` | SSR (60s) | Homepage — hero, produtos, reviews, FAQ, CTA |
| `/categoria/[cat]` | SSG | Grade de facas, guns, pets ou bundles |
| `/produto/[slug]` | SSR | Detalhe do produto — estoque em tempo real |
| `/como-funciona` | Static | Tutorial de compra em 4 passos |
| `/contato` | Static | Suporte — Discord, FAQ, tutorial |
| `/perfil` | Static | Perfil do usuário (login em breve) |
| `/sucesso` | SSR | Pós-checkout — confirmação + próximos passos |
| `/termos` | Static | Termos de uso |
| `/privacidade` | Static | Política de privacidade |
| `/reembolso` | Static | Política de reembolso |
| `/api/checkout` | API | Cria sessão Stripe Checkout (POST) |
| `/api/webhook` | API | Recebe eventos Stripe (POST) |

## Temas

3 temas via ThemeSwitcher no header — persistidos no `localStorage`:
- **✦ Space** (padrão): roxo profundo com canvas de estrelas animadas
- **◐ Dark**: preto premium
- **○ Light**: fundo claro

Todas as cores usam CSS Variables (`--accent`, `--bg-base`, `--text-primary`, etc.) — zero hex hardcoded nos componentes.

## Banco de Dados

### Tabela `products`
```
id, name, slug, category, price, original_price, stock, description, image_url, created_at, updated_at
```
- RLS: SELECT público habilitado
- Realtime: habilitado para atualização de estoque ao vivo

### Tabela `orders`
```
id, stripe_session_id, product_id, product_name, quantity, amount_total, roblox_username, status, delivered_at, created_at
```
- RLS: INSERT e SELECT públicos
- Índices: session_id, roblox_username, status

## Fluxo de Checkout

1. Usuário adiciona itens ao carrinho
2. Preenche username do Roblox
3. Clica "Finalizar" → POST `/api/checkout`
4. Server calcula itens + 15% taxa de processamento
5. Redireciona para Stripe Checkout (BRL)
6. Após pagamento: webhook decrementa estoque e insere pedido
7. Redireciona para `/sucesso` com detalhes

## Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Build de produção |
| `npm run seed` | Popula 14 produtos no Supabase |

## Segurança

- `STRIPE_SECRET_KEY` e `SUPABASE_SERVICE_ROLE_KEY` nunca expostos no frontend
- Cálculo de preços e taxa server-side — preço do cart não é confiado
- Webhook valida assinatura Stripe antes de processar
- RLS ativado em todas as tabelas
- Estoque decrementado com guard `Math.max(0, ...)`
