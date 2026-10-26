# Configurar o Supabase para o Painel IBEC

O site público continua aberto. As tabelas do painel ficam acessíveis somente à conta cujo UUID estiver nas políticas RLS. O navegador usa apenas a chave pública (publishable/anon); **não coloque a chave `service_role` ou `secret` no site**.

## 1. Criar o projeto e o usuário do pastor

1. Crie um projeto no Supabase e escolha uma região próxima dos usuários (por exemplo, São Paulo, se disponível).
2. Em **Authentication → Users**, crie o usuário do pastor com o e-mail que será usado no login. Defina uma senha forte e exclusiva.
3. Desative o cadastro público de usuários nas configurações de Auth. O pastor deve ser criado manualmente no Dashboard.
4. Copie o **UUID** desse usuário. Ele é diferente do e-mail.

## 2. Criar as tabelas e políticas

1. Abra **SQL Editor** no Supabase e carregue o arquivo `supabase/schema.sql`.
2. Substitua todas as três ocorrências de `PASTOR_AUTH_USER_UUID` pelo UUID copiado no passo anterior, mantendo as aspas simples e o sufixo `::uuid`.
3. Execute o SQL. Ele cria as três tabelas e ativa RLS, permitindo operações somente àquele UUID autenticado.
4. Em **Project Settings → API**, copie a URL do projeto e a chave pública **publishable** (ou a chave `anon` legada).

## 3. Ligar o site ao projeto

Edite `supabase-config.js` e substitua os três valores de exemplo:

- `url`: URL do projeto Supabase, no formato `https://<project-ref>.supabase.co`.
- `anonKey`: chave pública publishable ou anon.
- `pastorUserId`: o mesmo UUID do usuário do pastor usado nas três policies SQL.

Essa chave é entregue ao navegador e pode ser vista por visitantes. Isso é esperado: RLS é o que protege os dados. A chave `service_role`/`secret` ignora RLS e nunca deve ser colocada nesse arquivo.

## 4. Publicar e conferir

Faça o deploy normal do site no Vercel. Abra `/admin.html`, entre com o e-mail e a senha do usuário criado, e confira se os dados carregam e se um cadastro aparece no painel depois de salvo. O Pix e as demais páginas públicas não dependem do login.

Se o login funcionar mas o painel mostrar erro de permissão, confira se o UUID das policies corresponde exatamente ao usuário conectado e se as três tabelas estão expostas à Data API do projeto Supabase.

## 5. Migrar registros antigos

O painel mostra **Migrar dados deste navegador** quando encontra registros na chave antiga `ibec_projeto_esperanca_v1` do mesmo navegador e domínio. Faça a migração uma vez, confira os registros no painel e mantenha também uma cópia CSV exportada como backup. Os dados antigos só são removidos do `localStorage` depois que as três coleções forem importadas com sucesso.

O `localStorage` é específico do navegador e do domínio. Se os registros estiverem em outro computador, perfil de navegador ou endereço do site, exporte os CSVs no painel antigo e será necessária uma importação assistida antes de apagar a versão antiga.

## 6. Rotina de segurança

- Não compartilhe a conta do pastor nem a senha do Supabase.
- Ative MFA para a conta do pastor quando possível.
- Exporte e guarde backups CSV em local protegido.
- Não habilite cadastro público de usuários; mantenha as policies RLS restritas ao UUID do pastor.
