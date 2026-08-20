import { ArrowRight, Check, LockKeyhole } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Confirmation() {
  return <main className="confirmation-page"><div className="confirmation-card"><div className="success-icon"><Check size={25} /></div><div className="section-kicker">PERFIL RECEBIDO</div><h1>Obrigado por compartilhar seu momento de compra.</h1><p>Seu <strong>Perfil de Aquisição Imobiliária</strong> foi recebido. Vou analisar suas respostas para entender o objetivo, os critérios e o próximo passo mais adequado para a sua aquisição.</p><div className="confirmation-steps"><div><span>01</span><p>Leitura do seu perfil e das prioridades informadas.</p></div><div><span>02</span><p>Retorno para confirmar o contexto e esclarecer dúvidas.</p></div><div><span>03</span><p>Conversa inicial para definir o escopo de trabalho.</p></div></div><div className="confirmation-actions"><a href="/#perfil" className="primary-cta">Retomar contato para agendar conversa <ArrowRight size={16} /></a><Link href="/"><Button variant="outline">Voltar ao site</Button></Link></div><div className="privacy-note"><LockKeyhole size={15} /> Seus dados serão usados apenas para o retorno sobre o perfil e a conversa inicial.</div></div></main>;
}
