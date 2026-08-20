# Project TODO

- [x] Criar página inicial com hero, proposta de valor, manifesto curto e CTA para o Perfil de Aquisição Imobiliária
- [x] Implementar seção O Problema sobre conflito de interesses e representação do comprador
- [x] Implementar seção O Método com as oito etapas na ordem definida: briefing, pesquisa, pré-seleção, análise comparativa, análise documental, avaliação de preço, negociação e aquisição
- [x] Implementar seção Para quem é com os cinco perfis exatos: comprador de moradia, primeiro imóvel, upgrade, investidor patrimonial e comprador remoto
- [x] Implementar formulário Perfil de Aquisição Imobiliária (PAI) com todos os campos solicitados
- [x] Criar persistência dos PAIs preenchidos no banco de dados
- [x] Criar página de confirmação após envio do PAI com próximos passos e convite para conversa inicial
- [x] Criar seção FAQ sobre remuneração, exclusividade, regiões atendidas, prazo e limites da consultoria
- [x] Criar seção de diferenciais com experiência de ex-incorporadora aplicada ao interesse do comprador
- [x] Criar painel funcional e simples, protegido, para visualização dos perfis recebidos
- [x] Implementar layout responsivo para mobile, tablet e desktop
- [x] Configurar SEO técnico: lang pt-BR, title, description, Open Graph, headings e conteúdo orientado às buscas do público
- [x] Garantir que todo o conteúdo e interface estejam em português brasileiro
- [x] Criar testes Vitest para persistência e recebimento de PAI
- [x] Executar typecheck, testes e verificação visual em desktop e mobile
- [ ] Preparar checkpoint final e orientar publicação com domínio próprio

## Histórico de solicitações

- [ ] Estruturar plano de comunicação com site, série de posts para Instagram/LinkedIn e processo operacional de atendimento ao cliente
- [ ] Substituir o CTA de agendamento por WhatsApp/e-mail real do consultor antes da publicação
- [x] Criar uma rota/página de confirmação dedicada após o envio do Perfil de Aquisição Imobiliária (PAI), com mensagem de próximos passos e CTA para agendar conversa inicial
- [x] Adicionar teste Vitest para o envio bem-sucedido do PAI e avaliar cobertura segura de persistência/listagem sem inserir dados de teste no banco de dados
- [ ] Substituir o CTA da página de confirmação por um destino real e funcional de agendamento, usando WhatsApp, e-mail, Calendly ou outro canal fornecido pelo consultor
- [x] Adicionar teste Vitest para acquisition.list em cenário de sucesso com usuário admin e mock do helper de listagem
- [x] Documentar no teste a estratégia de cobertura segura do submit e da listagem sem usar o banco real
- [x] Adicionar comentário ou docblock em server/acquisition.test.ts explicando que os testes usam mocks dos helpers de banco para não gravar nem ler dados reais
