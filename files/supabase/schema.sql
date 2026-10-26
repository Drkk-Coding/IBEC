-- IBEC — Painel de Gestão
-- Antes de executar: substitua PASTOR_AUTH_USER_UUID nas três policies
-- pelo UUID do usuário do pastor criado em Authentication > Users.

create table if not exists public.atendimentos (
  id text primary key,
  data date not null,
  responsavel text not null default '',
  pessoas integer not null default 1 check (pessoas > 0),
  tipo text not null default '',
  bairro text not null default '',
  contato text not null default '',
  obs text not null default ''
);

create table if not exists public.pessoas (
  id text primary key,
  nome text not null default '',
  data date not null,
  vinculo text not null default '',
  origem text not null default '',
  contato text not null default '',
  obs text not null default ''
);

create table if not exists public.presencas (
  id text primary key,
  data date not null,
  atividade text not null default '',
  qtd integer not null default 1 check (qtd > 0),
  resp text not null default ''
);

alter table public.atendimentos enable row level security;
alter table public.pessoas enable row level security;
alter table public.presencas enable row level security;

alter table public.atendimentos force row level security;
alter table public.pessoas force row level security;
alter table public.presencas force row level security;

revoke all on table public.atendimentos, public.pessoas, public.presencas from anon, authenticated;
grant select, insert, update, delete on table public.atendimentos, public.pessoas, public.presencas to authenticated;
grant usage on schema public to authenticated;

drop policy if exists "pastor only atendimentos" on public.atendimentos;
create policy "pastor only atendimentos" on public.atendimentos
  for all to authenticated
  using ((select auth.uid()) = 'PASTOR_AUTH_USER_UUID'::uuid)
  with check ((select auth.uid()) = 'PASTOR_AUTH_USER_UUID'::uuid);

drop policy if exists "pastor only pessoas" on public.pessoas;
create policy "pastor only pessoas" on public.pessoas
  for all to authenticated
  using ((select auth.uid()) = 'PASTOR_AUTH_USER_UUID'::uuid)
  with check ((select auth.uid()) = 'PASTOR_AUTH_USER_UUID'::uuid);

drop policy if exists "pastor only presencas" on public.presencas;
create policy "pastor only presencas" on public.presencas
  for all to authenticated
  using ((select auth.uid()) = 'PASTOR_AUTH_USER_UUID'::uuid)
  with check ((select auth.uid()) = 'PASTOR_AUTH_USER_UUID'::uuid);
