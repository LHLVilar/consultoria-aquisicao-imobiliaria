import { Link } from "wouter";
import { ArrowLeft, CalendarDays, Mail, Phone, ShieldAlert } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";

export default function AdminProfiles() {
  const { user, loading: authLoading } = useAuth();
  const { data, isLoading, error } = trpc.acquisition.list.useQuery(undefined, { enabled: user?.role === "admin" });

  if (authLoading || isLoading) return <div className="admin-state"><span className="eyebrow"><span /> CARREGANDO</span><h1>Preparando seus perfis recebidos.</h1></div>;
  if (!user || user.role !== "admin") return <div className="admin-state"><ShieldAlert size={32} /><h1>Acesso restrito</h1><p>Esta área é destinada apenas ao consultor.</p><Link href="/"><Button variant="outline">Voltar ao site</Button></Link></div>;
  if (error) return <div className="admin-state"><ShieldAlert size={32} /><h1>Não foi possível carregar os perfis.</h1><p>{error.message}</p><Link href="/"><Button variant="outline">Voltar ao site</Button></Link></div>;

  return <div className="admin-shell"><header className="admin-header"><Link href="/" className="brand"><span className="brand-mark">CA</span><span><strong>Consultoria de Aquisição</strong><small>Painel do consultor</small></span></Link><Link href="/"><Button variant="outline"><ArrowLeft size={16} /> Voltar ao site</Button></Link></header><main className="admin-main"><div className="admin-title"><div><div className="section-kicker">ÁREA RESTRITA</div><h1>Perfis de Aquisição Imobiliária</h1><p>Visualize os contatos recebidos e prepare a conversa inicial.</p></div><div className="admin-count">{data?.length ?? 0}<span>perfis recebidos</span></div></div>{!data?.length ? <div className="admin-empty"><h2>Nenhum perfil recebido ainda.</h2><p>Quando um visitante preencher o formulário, o perfil aparecerá aqui.</p></div> : <div className="profiles-list">{data.map(profile => <article className="profile-record" key={profile.id}><div className="record-top"><span className="record-id">PAI #{String(profile.id).padStart(3, "0")}</span><span className="record-date"><CalendarDays size={14} /> {new Date(profile.createdAt).toLocaleDateString("pt-BR")}</span></div><div className="record-grid"><div><span className="record-label">Contato</span><h2>{profile.name}</h2><p className="contact-line"><Mail size={14} /> {profile.email}</p><p className="contact-line"><Phone size={14} /> {profile.phone}</p></div><div><span className="record-label">Objetivo e imóvel</span><p><strong>{profile.objective}</strong></p><p>{profile.propertyType}</p><p>{profile.regions}</p></div><div><span className="record-label">Investimento e prazo</span><p>{profile.budget}</p><p>{profile.paymentMethod}</p><p>{profile.timeline}</p></div><div><span className="record-label">Critérios</span><p><strong>Indispensáveis</strong><br />{profile.mustHaves}</p><p><strong>Prioridades</strong><br />{profile.priorities}</p></div></div></article>)}</div>}</main></div>;
}
