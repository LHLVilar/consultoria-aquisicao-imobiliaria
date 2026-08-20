# Guia de publicação e manutenção

## Consultoria de Aquisição Imobiliária

Este guia explica como salvar o projeto no computador, criar um backup no GitHub, publicar pelo ambiente Manus, conectar um domínio próprio e alterar textos e contatos sem quebrar o formulário ou o painel.

## 1. O que você tem atualmente

O projeto é uma aplicação full-stack, não apenas uma página HTML. Além do site público, ele possui formulário de **Perfil de Aquisição Imobiliária**, banco de dados, autenticação e painel administrativo em `/painel`.

Por esse motivo, a hospedagem precisa suportar uma aplicação Node.js com backend e banco de dados. O caminho mais simples e compatível é usar a hospedagem integrada do Manus. GitHub é excelente para backup, histórico e colaboração, mas sozinho não hospeda corretamente o banco e as rotas protegidas desta aplicação.

| Componente | Função |
|---|---|
| Site público | Apresenta a consultoria e recebe visitantes |
| Formulário PAI | Capta objetivo, critérios e dados de contato |
| Banco de dados | Armazena os perfis recebidos |
| Painel `/painel` | Permite visualizar os perfis como administrador |
| GitHub | Mantém cópia do código e histórico de alterações |
| Domínio | Endereço profissional, como `seudominio.com.br` |

## 2. Como salvar uma cópia no seu computador

No painel de gerenciamento do projeto, abra a área **Code** e escolha a opção **Download all files** ou equivalente. O sistema baixará um arquivo ZIP com o projeto completo.

Depois, descompacte o arquivo em uma pasta permanente, por exemplo:

```text
Documentos/projetos/consultoria-aquisicao-imobiliaria
```

Não edite arquivos diretamente dentro do ZIP. Sempre extraia o conteúdo antes.

Para abrir e editar os arquivos, use o [Visual Studio Code](https://code.visualstudio.com/). O computador precisará ter o [Node.js](https://nodejs.org/) instalado e, preferencialmente, o `pnpm`, que é o gerenciador utilizado pelo projeto.

No terminal, dentro da pasta do projeto, os comandos básicos são:

```bash
pnpm install
pnpm check
pnpm test
pnpm dev
```

O comando `pnpm install` instala as dependências. O `pnpm check` verifica erros de TypeScript. O `pnpm test` executa os testes. O `pnpm dev` inicia uma versão local para você visualizar alterações antes da publicação.

Não execute `pnpm db:push` por conta própria em produção. O projeto já possui banco configurado no ambiente Manus, e mudanças de schema exigem cuidado para não afetar os PAIs armazenados.

## 3. Como usar o GitHub

O GitHub deve ser usado como **backup, histórico e controle de versões**. Ele não substitui a hospedagem do Manus neste projeto.

Crie um repositório privado no GitHub, por exemplo `consultoria-aquisicao-imobiliaria`. Depois, no terminal, dentro da pasta do projeto, execute:

```bash
git init
git add .
git commit -m "Versão inicial do site"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/consultoria-aquisicao-imobiliaria.git
git push -u origin main
```

Substitua `SEU-USUARIO` pelo seu nome de usuário do GitHub e use a URL real do repositório.

Antes de cada alteração importante, faça uma cópia ou um commit. Um fluxo simples é:

```bash
git status
git add .
git commit -m "Atualiza textos da página inicial"
git push
```

Use mensagens de commit específicas, como `Atualiza contato do WhatsApp`, `Revisa seção sobre o método` ou `Inclui novo FAQ`. Nunca coloque senhas, tokens, arquivos `.env` ou credenciais no GitHub.

O repositório deve permanecer privado porque o projeto contém a estrutura do backend e referências de configuração. Variáveis secretas devem ser mantidas no painel de Secrets do projeto, não em arquivos versionados.

## 4. Como publicar

Depois de revisar e testar o projeto, abra o painel de gerenciamento e clique em **Publish**. A publicação usa o último checkpoint salvo. Portanto, o fluxo correto é:

| Ordem | Ação |
|---|---|
| 1 | Editar o projeto |
| 2 | Executar testes e revisar a prévia |
| 3 | Salvar um checkpoint |
| 4 | Abrir o painel de gerenciamento |
| 5 | Clicar em Publish |
| 6 | Testar o endereço publicado |

A publicação não deve ser feita diretamente a partir de uma alteração não testada. Se o usuário alterar arquivos no computador, será necessário importar ou sincronizar o código novamente no ambiente do projeto antes de publicar.

O endereço de prévia atual é temporário e serve para validação. Ele não deve ser usado como endereço comercial definitivo.

## 5. Como configurar domínio próprio

No painel do projeto, abra **Settings → Domains**. Você poderá usar um domínio adquirido dentro do próprio fluxo da plataforma ou conectar um domínio que já possui.

O procedimento geral é:

1. Escolher ou informar o domínio desejado.
2. Iniciar o processo de conexão.
3. Copiar os registros DNS exibidos pelo painel.
4. Abrir o painel da empresa onde o domínio foi comprado.
5. Criar ou atualizar os registros DNS solicitados.
6. Aguardar a propagação e retornar ao painel para verificar a conexão.
7. Definir o domínio como endereço principal.

Não altere registros DNS aleatoriamente. Se o domínio já tiver e-mail profissional, preserve os registros MX. Alterar MX pode interromper o recebimento de e-mails.

Antes de divulgar o endereço, teste o domínio com e sem `www`, verifique o certificado HTTPS, abra o formulário, acesse a página de confirmação e confirme que o painel `/painel` continua protegido.

## 6. Como alterar textos com segurança

Os textos da página principal estão em:

```text
client/src/pages/Home.tsx
```

A página de confirmação está em:

```text
client/src/pages/Confirmation.tsx
```

Os textos de título, descrição e compartilhamento estão em:

```text
client/index.html
```

A regra mais segura é alterar apenas o texto entre as tags, mantendo a estrutura JSX. Por exemplo, é seguro trocar:

```tsx
<h1>Comprar um imóvel exige mais do que encontrar um anúncio.</h1>
```

por:

```tsx
<h1>Uma compra importante merece uma decisão bem conduzida.</h1>
```

Evite apagar chaves `{}`, parênteses, tags de fechamento, nomes de campos, chamadas `submitProfile.mutate(form)` e imports. Esses elementos fazem parte do funcionamento da aplicação.

Depois de qualquer edição, execute:

```bash
pnpm check
pnpm test
pnpm build
```

Se os três comandos terminarem sem erro, abra a prévia e faça uma revisão visual antes de criar um novo checkpoint.

## 7. Como alterar o contato de agendamento

O CTA da página de confirmação está preparado para retornar ao formulário em `/#perfil`. Para colocar seu WhatsApp real, substitua o destino no arquivo:

```text
client/src/pages/Confirmation.tsx
```

O formato de WhatsApp deve usar o código do país e o DDD, sem espaços, parênteses ou hífens. Exemplo estrutural:

```tsx
<a
  href="https://wa.me/55DDDNÚMERO"
  target="_blank"
  rel="noreferrer"
  className="primary-cta"
>
  Agendar conversa inicial <ArrowRight size={16} />
</a>
```

Substitua `55DDDNÚMERO` pelo seu número real. Não use um número de exemplo na versão publicada.

Se preferir e-mail, use um endereço real:

```tsx
<a href="mailto:seuemail@seudominio.com.br" className="primary-cta">
  Agendar conversa inicial <ArrowRight size={16} />
</a>
```

Não altere os nomes dos campos do formulário nem a rota `POST` implícita do procedimento tRPC. O painel depende dos campos `objective`, `propertyType`, `regions`, `budget`, `paymentMethod`, `timeline`, `mustHaves`, `priorities`, `name`, `email` e `phone`.

## 8. Como acessar o painel de perfis

O painel fica em:

```text
https://SEU-DOMINIO/painel
```

Ele exige autenticação e só permite visualizar os perfis para usuários com função de administrador. O usuário proprietário do projeto deve entrar pelo fluxo de autenticação configurado e utilizar a conta administrativa correspondente ao projeto.

Não remova a proteção da rota para facilitar o acesso. O painel contém dados pessoais e deve permanecer restrito.

## 9. Atualização recomendada

Para alterar apenas textos e contatos, o fluxo recomendado é: fazer uma cópia local, editar uma mudança pequena por vez, executar `pnpm check`, `pnpm test` e `pnpm build`, revisar a prévia, salvar um checkpoint, registrar a alteração no GitHub e somente então publicar.

Para alterar banco, autenticação, campos do PAI ou painel, faça uma nova solicitação técnica ou siga uma migração planejada. Não altere colunas no banco diretamente sem atualizar o schema e verificar os dados existentes.

## 10. Checklist antes de divulgar

Confirme que o domínio abre com HTTPS, que o título e a descrição aparecem corretamente, que os botões principais levam ao PAI, que todos os campos obrigatórios funcionam, que a página `/confirmacao` aparece depois do envio, que o CTA de agendamento usa seu contato real e que o painel `/painel` exige autenticação.

Também faça um teste real com um contato autorizado e remova ou identifique corretamente qualquer registro de teste conforme sua política de tratamento de dados. Não publique dados pessoais de clientes em posts sem autorização expressa.
