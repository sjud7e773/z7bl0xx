-- ═══════════════════════════════════════════
-- z7Blox — Criar/Corrigir tabela orders
-- Execute no Supabase SQL Editor
-- https://supabase.com/dashboard/project/wjmvmyenwniouvzuwyxm/sql/new
-- ═══════════════════════════════════════════

-- ▸ Se a tabela orders já existe com schema antigo, apague antes:
--   DROP TABLE IF EXISTS public.orders;
-- ▸ Descomente a linha acima SOMENTE se precisar recriá-la do zero.

-- 1. Criar tabela orders com o schema que o webhook espera
CREATE TABLE IF NOT EXISTS public.orders (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id TEXT NOT NULL,
  product_id        UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_name      TEXT NOT NULL DEFAULT '',
  quantity          INTEGER NOT NULL DEFAULT 1,
  amount_total      NUMERIC(10, 2) NOT NULL DEFAULT 0,
  roblox_username   TEXT NOT NULL DEFAULT '',
  status            TEXT NOT NULL DEFAULT 'paid'
    CHECK (status IN ('pending','paid','trade_sent','completed','cancelled')),
  delivered_at      TIMESTAMPTZ,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Índices para busca rápida
CREATE INDEX IF NOT EXISTS idx_orders_session  ON public.orders(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_orders_roblox   ON public.orders(roblox_username);
CREATE INDEX IF NOT EXISTS idx_orders_status   ON public.orders(status);

-- 3. Habilitar RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 4. Remover policies inseguras anteriores (se existirem)
DROP POLICY IF EXISTS "orders_insert"            ON public.orders;
DROP POLICY IF EXISTS "orders_select"            ON public.orders;
DROP POLICY IF EXISTS "orders_insert_open"       ON public.orders;
DROP POLICY IF EXISTS "orders_select_open"       ON public.orders;
DROP POLICY IF EXISTS "orders_no_public_access"  ON public.orders;
DROP POLICY IF EXISTS "orders_insert_service_only" ON public.orders;
DROP POLICY IF EXISTS "orders_select_none"       ON public.orders;
DROP POLICY IF EXISTS "orders_deny_all_public"   ON public.orders;

-- 5. Bloquear TODOS os acessos para a role 'anon' e 'authenticated'
-- O webhook usa SUPABASE_SERVICE_ROLE_KEY que bypassa RLS automaticamente.
-- Isso significa que ninguém na internet pode ler/inserir/atualizar orders.
CREATE POLICY "orders_deny_all_public" ON public.orders
  FOR ALL
  USING (false)
  WITH CHECK (false);

-- 6. Trigger para updated_at automático
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS orders_updated_at ON public.orders;
CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- 7. Trigger de updated_at na tabela products (para sitemap)
DROP TRIGGER IF EXISTS products_updated_at ON public.products;
CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
