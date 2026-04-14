-- ═══════════════════════════════════════════
-- z7Blox — Profiles Table + Auth Trigger
-- Execute no Supabase SQL Editor
-- ═══════════════════════════════════════════

-- 1. Criar tabela de perfis vinculada a auth.users
CREATE TABLE IF NOT EXISTS public.profiles (
  id              UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email           TEXT,
  roblox_username TEXT,
  avatar_url      TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Habilitar RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. Remover policies anteriores (se existirem)
DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;

-- 4. Policies
-- Usuário lê seu próprio perfil
CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- Usuário atualiza seu próprio perfil
CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Inserção via trigger (SECURITY DEFINER já bypassa RLS)
CREATE POLICY "profiles_insert_own" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- 5. Função: cria perfil automaticamente no signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- 6. Trigger no signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 7. Atualizar RLS da tabela orders para que usuários vejam seus próprios pedidos
--    Remove a deny_all anterior e cria policies específicas
DROP POLICY IF EXISTS "orders_deny_all_public"     ON public.orders;
DROP POLICY IF EXISTS "orders_select_by_user"      ON public.orders;
DROP POLICY IF EXISTS "orders_insert_service_only" ON public.orders;

-- Nenhuma escrita pública (webhook usa service role que bypassa RLS)
CREATE POLICY "orders_insert_service_only" ON public.orders
  FOR INSERT WITH CHECK (false);

-- Usuário autenticado vê pedidos com seu roblox_username do perfil
CREATE POLICY "orders_select_by_user" ON public.orders
  FOR SELECT USING (
    roblox_username != '' AND
    roblox_username = (
      SELECT p.roblox_username
      FROM public.profiles p
      WHERE p.id = auth.uid()
        AND p.roblox_username IS NOT NULL
        AND p.roblox_username != ''
      LIMIT 1
    )
  );
