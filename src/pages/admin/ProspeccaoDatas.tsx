import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Plus, Search, ArrowLeft, Phone, Mail, Calendar, DollarSign } from 'lucide-react';

interface Prospeccao {
  id: string;
  nome: string;
  contato: string;
  email: string;
  telefone: string;
  evento: string;
  data: string;
  orcamento: string;
  status: 'prospecção' | 'negociação' | 'fechado' | 'perdido';
  observacao: string;
  atualizadoEm: number;
}

export default function ProspeccaoDatas() {
  const { user } = useAuth();
  const [prospeccoes, setProspeccoes] = useState<Prospeccao[]>([
    {
      id: '1',
      nome: 'Marina Silva',
      contato: 'Organizadora de Eventos',
      email: 'marina@eventos.com',
      telefone: '(11) 99999-9999',
      evento: 'Casamento',
      data: '2025-12-15',
      orcamento: 'R$ 3.000',
      status: 'negociação',
      observacao: 'Interessada em DJ para cerimônia e festa',
      atualizadoEm: Date.now() - 86400000
    },
    {
      id: '2',
      nome: 'Carlos Pereira',
      contato: 'Empresa XYZ Ltda',
      email: 'carlos@empresa.com',
      telefone: '(11) 88888-8888',
      evento: 'Festa Corporativa',
      data: '2025-09-20',
      orcamento: 'R$ 2.500',
      status: 'prospecção',
      observacao: 'Evento de fim de ano da empresa',
      atualizadoEm: Date.now() - 86400000 * 2
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    nome: '',
    contato: '',
    email: '',
    telefone: '',
    evento: '',
    data: '',
    orcamento: '',
    status: 'prospecção' as Prospeccao['status'],
    observacao: ''
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const statusColors = {
    prospecção: 'text-blue-400 border-blue-400',
    negociação: 'text-yellow-400 border-yellow-400',
    fechado: 'text-green-400 border-green-400',
    perdido: 'text-red-400 border-red-400'
  };

  const statusLabels = {
    prospecção: 'Prospecção',
    negociação: 'Negociação',
    fechado: 'Fechado',
    perdido: 'Perdido'
  };

  const handleSubmit = async () => {
    if (!form.nome || !form.contato) return;

    const newProspeccao: Prospeccao = {
      id: editingId || Date.now().toString(),
      ...form,
      atualizadoEm: Date.now()
    };

    if (editingId) {
      setProspeccoes(prospeccoes.map(p => p.id === editingId ? newProspeccao : p));
    } else {
      setProspeccoes([...prospeccoes, newProspeccao]);
    }

    setShowForm(false);
    setForm({
      nome: '',
      contato: '',
      email: '',
      telefone: '',
      evento: '',
      data: '',
      orcamento: '',
      status: 'prospecção',
      observacao: ''
    });
    setEditingId(null);
  };

  const handleEdit = (p: Prospeccao) => {
    setForm({
      nome: p.nome,
      contato: p.contato,
      email: p.email,
      telefone: p.telefone,
      evento: p.evento,
      data: p.data,
      orcamento: p.orcamento,
      status: p.status,
      observacao: p.observacao
    });
    setEditingId(p.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    setProspeccoes(prospeccoes.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-2">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.location.href = '/admin'}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <Search className="w-6 h-6 text-orange-400" />
          <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text">
            Prospecção de Datas
          </h1>
        </div>
        <Button
          size="sm"
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setForm({
              nome: '',
              contato: '',
              email: '',
              telefone: '',
              evento: '',
              data: '',
              orcamento: '',
              status: 'prospecção',
              observacao: ''
            });
          }}
          className="bg-gradient-to-r from-orange-500 to-yellow-400"
        >
          <Plus className="w-4 h-4 mr-1" /> Nova Prospecção
        </Button>
      </div>

      {showForm && (
        <GlassCard className="mb-6">
          <h3 className="text-lg font-semibold text-neutral-100 mb-4">
            {editingId ? 'Editar Prospecção' : 'Nova Prospecção'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Nome do Cliente *</label>
              <input
                className="w-full rounded bg-black/20 border border-gray-700 px-3 py-2 text-white"
                placeholder="Nome do cliente"
                value={form.nome}
                onChange={e => setForm(f => ({...f, nome: e.target.value}))}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Empresa/Função *</label>
              <input
                className="w-full rounded bg-black/20 border border-gray-700 px-3 py-2 text-white"
                placeholder="Empresa ou função"
                value={form.contato}
                onChange={e => setForm(f => ({...f, contato: e.target.value}))}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                className="w-full rounded bg-black/20 border border-gray-700 px-3 py-2 text-white"
                placeholder="email@exemplo.com"
                value={form.email}
                onChange={e => setForm(f => ({...f, email: e.target.value}))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Telefone</label>
              <input
                type="tel"
                className="w-full rounded bg-black/20 border border-gray-700 px-3 py-2 text-white"
                placeholder="(XX) XXXXX-XXXX"
                value={form.telefone}
                onChange={e => setForm(f => ({...f, telefone: e.target.value}))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Evento</label>
              <input
                className="w-full rounded bg-black/20 border border-gray-700 px-3 py-2 text-white"
                placeholder="Tipo de evento (ex: Casamento, Festa Corporativa)"
                value={form.evento}
                onChange={e => setForm(f => ({...f, evento: e.target.value}))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Data do Evento</label>
              <input
                type="date"
                className="w-full rounded bg-black/20 border border-gray-700 px-3 py-2 text-white"
                value={form.data}
                onChange={e => setForm(f => ({...f, data: e.target.value}))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Orçamento</label>
              <input
                className="w-full rounded bg-black/20 border border-gray-700 px-3 py-2 text-white"
                placeholder="R$ X.XXX,XX"
                value={form.orcamento}
                onChange={e => setForm(f => ({...f, orcamento: e.target.value}))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
              <select
                className="w-full rounded bg-black/20 border border-gray-700 px-3 py-2 text-white"
                value={form.status}
                onChange={e => setForm(f => ({...f, status: e.target.value as Prospeccao['status']}))}
              >
                {Object.entries(statusLabels).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Observação</label>
              <textarea
                className="w-full rounded bg-black/20 border border-gray-700 px-3 py-2 text-white min-h-[80px]"
                placeholder="Detalhes adicionais sobre a prospecção..."
                value={form.observacao}
                onChange={e => setForm(f => ({...f, observacao: e.target.value}))}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setShowForm(false)} className="border-gray-700 text-gray-300 hover:bg-gray-800">
              Cancelar
            </Button>
            <Button onClick={handleSubmit} className="bg-gradient-to-r from-orange-500 to-yellow-400">
              <Save className="w-4 h-4 mr-1" /> {editingId ? 'Salvar Edição' : 'Adicionar Prospecção'}
            </Button>
          </div>
        </GlassCard>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {prospeccoes.map(p => (
          <GlassCard key={p.id} className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-neutral-100">{p.nome}</h3>
                <Badge variant="outline" className={`${statusColors[p.status]} text-xs`}>
                  {statusLabels[p.status]}
                </Badge>
              </div>
              <p className="text-gray-300 text-sm mb-1">{p.contato}</p>
              {p.email && (
                <p className="text-gray-400 text-xs flex items-center gap-1 mb-1">
                  <Mail className="w-3 h-3" /> {p.email}
                </p>
              )}
              {p.telefone && (
                <p className="text-gray-400 text-xs flex items-center gap-1 mb-1">
                  <Phone className="w-3 h-3" /> {p.telefone}
                </p>
              )}
              {p.evento && (
                <p className="text-gray-400 text-xs flex items-center gap-1 mb-1">
                  <Calendar className="w-3 h-3" /> {p.evento} {p.data && `(${p.data})`}
                </p>
              )}
              {p.orcamento && (
                <p className="text-gray-400 text-xs flex items-center gap-1 mb-2">
                  <DollarSign className="w-3 h-3" /> {p.orcamento}
                </p>
              )}
              {p.observacao && (
                <p className="text-gray-400 text-xs italic mb-2">"{p.observacao}"</p>
              )}
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="ghost" size="sm" onClick={() => handleEdit(p)} className="text-blue-400 hover:bg-blue-900/20">
                <Edit className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleDelete(p.id)} className="text-red-400 hover:bg-red-900/20">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}