import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowDown, ArrowRight, Check, ChevronDown, CircleCheck, LockKeyhole, Menu, ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const methodSteps = [
  ["01", "briefing", "Entendemos o objetivo, as restrições e o que realmente importa na decisão."],
  ["02", "pesquisa", "Mapeamos o mercado para além de um portfólio limitado de anúncios."],
  ["03", "pré-seleção", "Eliminamos o que não atende ao perfil antes de ocupar seu tempo."],
  ["04", "análise comparativa", "Colocamos as alternativas lado a lado com critérios claros."],
  ["05", "análise documental", "Identificamos pontos de atenção e encaminhamos a diligência adequada."],
  ["06", "avaliação de preço", "Construímos uma referência para compreender o preço pedido."],
  ["07", "negociação", "Estruturamos a oferta e defendemos suas condições com método."],
  ["08", "aquisição", "Acompanhamos a jornada até a formalização do negócio."],
] as const;

const audiences = [
  ["01", "comprador de moradia", "Para quem quer comprar bem sem transformar uma decisão importante em uma sequência de visitas aleatórias."],
  ["02", "primeiro imóvel", "Para quem precisa de repertório, clareza e orientação antes de comprometer seu patrimônio."],
  ["03", "upgrade", "Para quem deseja comparar localização, planta, padrão e custo total com mais rigor."],
  ["04", "investidor patrimonial", "Para quem enxerga o imóvel como alocação de capital, renda, liquidez e horizonte de longo prazo."],
  ["05", "comprador remoto", "Para quem precisa de representação local, coordenação e prestação de contas durante a aquisição."],
] as const;

const faqs = [
  ["Como funciona a remuneração?", "O escopo e a forma de remuneração são apresentados com transparência antes de qualquer contratação. A estrutura pode variar conforme o tipo de aquisição e o nível de acompanhamento necessário."],
  ["O atendimento é realmente exclusivo?", "A proposta é representar o interesse do comprador. A exclusividade deve ser formalizada em contrato, com escopo, prazo, responsabilidades e critérios de encerramento claramente definidos."],
  ["Quais regiões são atendidas?", "A atuação começa nas regiões em que consigo pesquisar, visitar e acompanhar oportunidades com profundidade. A disponibilidade é confirmada na conversa inicial."],
  ["Quanto tempo leva o processo?", "Não existe um prazo único. O tempo depende do objetivo, da disponibilidade financeira, da urgência e do nível de exigência do perfil. O método foi desenhado para reduzir desperdício, não para acelerar uma decisão inadequada."],
  ["A consultoria substitui advogado ou engenheiro?", "Não. A consultoria organiza a decisão e identifica pontos de atenção. Quando necessário, profissionais habilitados devem conduzir a análise jurídica, técnica, financeira ou tributária específica."],
] as const;

function scrollToProfile() {
  document.getElementById("perfil")?.scrollIntoView({ behavior: "smooth" });
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [, setLocation] = useLocation();
  const submitProfile = trpc.acquisition.submit.useMutation({
    onSuccess: () => {
      setLocation("/confirmacao");
    },
    onError: () => toast.error("Não foi possível enviar seu perfil. Revise os campos e tente novamente."),
  });
  const [form, setForm] = useState({ objective: "", propertyType: "", regions: "", budget: "", paymentMethod: "", timeline: "", mustHaves: "", priorities: "", name: "", email: "", phone: "" });
  const update = (key: keyof typeof form, value: string) => setForm(current => ({ ...current, [key]: value }));
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    submitProfile.mutate(form);
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <a href="#inicio" className="brand" aria-label="Consultoria de Aquisição Imobiliária">
          <span className="brand-mark">CA</span>
          <span><strong>Consultoria de Aquisição</strong><small>Representação do comprador</small></span>
        </a>
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        <nav className={menuOpen ? "main-nav open" : "main-nav"}>
          <a href="#problema" onClick={() => setMenuOpen(false)}>O problema</a>
          <a href="#metodo" onClick={() => setMenuOpen(false)}>O método</a>
          <a href="#para-quem" onClick={() => setMenuOpen(false)}>Para quem é</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>Dúvidas</a>
          <Button onClick={scrollToProfile} className="header-cta">Definir meu perfil <ArrowRight size={16} /></Button>
        </nav>
      </header>

      <main>
        <section id="inicio" className="hero-section">
          <div className="hero-grid-pattern" />
          <div className="container hero-content">
            <div className="eyebrow"><span /> REPRESENTAÇÃO EXCLUSIVA DO COMPRADOR</div>
            <h1>Comprar um imóvel exige mais do que encontrar um anúncio.</h1>
            <p className="hero-lead">Exige critério, inteligência de mercado e alguém comprometido com a qualidade da sua decisão.</p>
            <p className="hero-copy">Eu não tenho interesse em te vender determinado imóvel. Meu interesse é encontrar o melhor imóvel para você comprar.</p>
            <div className="hero-actions"><Button onClick={scrollToProfile} className="primary-cta">Definir meu Perfil de Aquisição <ArrowRight size={17} /></Button><a href="#metodo" className="text-link">Conheça o método <ArrowDown size={15} /></a></div>
            <div className="hero-note"><ShieldCheck size={18} /><span>Um processo orientado pelo interesse de quem compra.</span></div>
          </div>
          <div className="hero-aside"><span className="vertical-label">CONSULTORIA · CURADORIA · NEGOCIAÇÃO</span><div className="hero-number">01</div></div>
        </section>

        <section id="problema" className="section problem-section"><div className="container two-column"><div><div className="section-kicker">01 — O PROBLEMA</div><h2>O comprador não deveria estar sozinho do outro lado da mesa.</h2></div><div className="section-body"><p>Na compra de um imóvel, o profissional que apresenta uma oportunidade pode estar comprometido com a venda daquele ativo. Isso cria uma assimetria: você precisa tomar uma decisão patrimonial enquanto recebe estímulos para fechar.</p><p>Minha função é inverter essa lógica. Em vez de começar pelo estoque disponível, começamos pelo seu objetivo. Em vez de acumular visitas, construímos critérios para eliminar o que não faz sentido.</p><div className="quote-block">“Seu imóvel ideal não precisa estar no estoque de quem te atende.”</div></div></div></section>

        <section id="metodo" className="section method-section"><div className="container"><div className="section-intro"><div><div className="section-kicker">02 — O MÉTODO</div><h2>Uma compra mais inteligente começa antes da visita.</h2></div><p>O trabalho é organizado para transformar uma decisão complexa em um processo claro, com etapas, critérios e próximos passos definidos.</p></div><div className="method-grid">{methodSteps.map(([number, title, text]) => <div className="method-card" key={title}><span className="card-number">{number}</span><h3>{title}</h3><p>{text}</p></div>)}</div></div></section>

        <section className="section differentiator-section"><div className="container differentiator-grid"><div className="dark-panel"><div className="section-kicker light">EXPERIÊNCIA APLICADA À SUA DECISÃO</div><h2>Conhecer o lado vendedor muda a qualidade da orientação.</h2><p>Minha experiência em incorporadora me permite compreender a lógica de lançamento, formação de preço, estoque, urgência comercial e negociação. Hoje, esse repertório é aplicado para fazer perguntas melhores e proteger o interesse de quem compra.</p></div><div className="differentiator-list"><div><CircleCheck size={20} /><span>Curadoria sem portfólio limitado</span></div><div><CircleCheck size={20} /><span>Análise com prós, contras e alternativas</span></div><div><CircleCheck size={20} /><span>Negociação orientada por contexto</span></div><div><CircleCheck size={20} /><span>Processo com clareza e prestação de contas</span></div></div></div></section>

        <section id="para-quem" className="section audience-section"><div className="container"><div className="section-kicker">03 — PARA QUEM É</div><div className="section-intro"><h2>Para decisões que merecem ser bem conduzidas.</h2><p>O serviço é para quem quer comprar com mais segurança, repertório e poder de decisão — não simplesmente para quem quer receber mais links.</p></div><div className="audience-grid">{audiences.map(([number, title, text]) => <div className="audience-card" key={title}><span className="card-number">{number}</span><h3>{title}</h3><p>{text}</p></div>)}</div></div></section>

        <section id="perfil" className="section profile-section"><div className="container profile-layout"><div className="profile-aside"><div className="section-kicker light">04 — PRIMEIRO PASSO</div><h2>Comece pelo seu Perfil de Aquisição Imobiliária.</h2><p>Quanto mais claro o objetivo, melhor será a pesquisa. Conte o que você pretende comprar, onde, em qual faixa de investimento e quais critérios não podem ser ignorados.</p><div className="aside-points"><span><Check size={15} /> Sem compromisso de contratação</span><span><Check size={15} /> Análise inicial do seu momento</span><span><Check size={15} /> Próximos passos objetivos</span></div></div><form className="profile-form" onSubmit={handleSubmit}><div className="form-heading"><span>PAI</span><div><h3>Perfil de Aquisição Imobiliária</h3><p>Leva aproximadamente 3 minutos.</p></div></div><div className="form-grid"><label>Objetivo da compra<select required value={form.objective} onChange={e => update("objective", e.target.value)}><option value="">Selecione</option><option>Moradia</option><option>Primeiro imóvel</option><option>Upgrade</option><option>Investimento patrimonial</option><option>Uso misto</option></select></label><label>Tipo de imóvel<select required value={form.propertyType} onChange={e => update("propertyType", e.target.value)}><option value="">Selecione</option><option>Apartamento</option><option>Casa</option><option>Terreno</option><option>Imóvel comercial</option><option>Lançamento</option><option>Usado</option></select></label><label className="full">Regiões de interesse<Input required value={form.regions} onChange={e => update("regions", e.target.value)} placeholder="Bairros, cidades ou regiões prioritárias" /></label><label>Faixa de investimento<select required value={form.budget} onChange={e => update("budget", e.target.value)}><option value="">Selecione</option><option>Até R$ 500 mil</option><option>R$ 500 mil a R$ 1 milhão</option><option>R$ 1 milhão a R$ 2 milhões</option><option>Acima de R$ 2 milhões</option><option>Ainda estou definindo</option></select></label><label>Forma de pagamento<select required value={form.paymentMethod} onChange={e => update("paymentMethod", e.target.value)}><option value="">Selecione</option><option>Recursos próprios</option><option>Financiamento</option><option>Recursos próprios e financiamento</option><option>Venda de outro imóvel</option><option>Outra combinação</option></select></label><label>Prazo para aquisição<select required value={form.timeline} onChange={e => update("timeline", e.target.value)}><option value="">Selecione</option><option>Imediato</option><option>Até 3 meses</option><option>De 3 a 6 meses</option><option>De 6 a 12 meses</option><option>Estou pesquisando</option></select></label><label className="full">Características indispensáveis<Textarea required value={form.mustHaves} onChange={e => update("mustHaves", e.target.value)} placeholder="Ex.: número de quartos, vagas, metragem, andar, estrutura, estado de conservação..." /></label><label className="full">Prioridades da compra<Textarea required value={form.priorities} onChange={e => update("priorities", e.target.value)} placeholder="O que pesa mais: preço, localização, segurança, valorização, liquidez, renda ou qualidade de vida?" /></label><div className="form-divider full">Seus dados para retorno</div><label>Nome completo<Input required value={form.name} onChange={e => update("name", e.target.value)} /></label><label>WhatsApp<Input required value={form.phone} onChange={e => update("phone", e.target.value)} placeholder="(00) 00000-0000" /></label><label className="full">E-mail<Input required type="email" value={form.email} onChange={e => update("email", e.target.value)} /></label></div><div className="form-footer"><p><LockKeyhole size={15} /> Seus dados serão usados para analisar seu perfil e retornar sobre a conversa inicial.</p><Button disabled={submitProfile.isPending} type="submit" className="primary-cta">{submitProfile.isPending ? "Enviando..." : "Enviar meu perfil"} <ArrowRight size={16} /></Button></div></form></div></section>

        <section id="faq" className="section faq-section"><div className="container faq-layout"><div><div className="section-kicker">05 — DÚVIDAS FREQUENTES</div><h2>Clareza também faz parte da compra.</h2><p className="faq-lead">Antes de começar, algumas respostas importantes sobre escopo, forma de trabalho e limites da consultoria.</p></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown size={18} /></summary><p>{answer}</p></details>)}</div></div></section>

        <section className="final-cta"><div className="container final-cta-inner"><div><div className="section-kicker light">A DECISÃO É SUA. O PROCESSO PODE SER MEU.</div><h2>Compre com mais critério.</h2></div><Button onClick={scrollToProfile} className="primary-cta">Definir meu Perfil de Aquisição <ArrowRight size={17} /></Button></div></section>
      </main>
      <footer className="site-footer"><div className="container footer-inner"><div className="brand"><span className="brand-mark">CA</span><span><strong>Consultoria de Aquisição</strong><small>Representação do comprador</small></span></div><div><p>Consultoria de Aquisição Imobiliária</p><p className="muted">Curadoria · Análise · Negociação</p></div><p className="muted">© 2026 · Todos os direitos reservados</p></div></footer>
    </div>
  );
}
