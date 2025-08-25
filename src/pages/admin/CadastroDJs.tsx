import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserPlus, Eye, EyeOff, Save } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const CadastroDJs: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Verificar se é admin
  React.useEffect(() => {
    if (!user?.is_admin) {
      navigate('/');
    }
  }, [user, navigate]);
  
  // Estado para os dados do formulário
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    full_name: '',
    artist_name: '',
    role: 'dj'
  });
  
  // Função para atualizar os dados do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Função para cadastrar um novo DJ
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Criar usuário no Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });
      
      if (authError) throw authError;
      
      if (authData.user) {
        // Criar perfil no banco de dados
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              user_id: authData.user.id,
              email: formData.email,
              name: formData.name,
              full_name: formData.full_name,
              artist_name: formData.artist_name,
              role: formData.role
            }
          ]);
          
        if (profileError) throw profileError;
        
        toast.success('DJ cadastrado com sucesso!');
        setFormData({
          email: '',
          password: '',
          name: '',
          full_name: '',
          artist_name: '',
          role: 'dj'
        });
      }
    } catch (error: any) {
      console.error('Erro ao cadastrar DJ:', error);
      toast.error(error.message || 'Erro ao cadastrar DJ');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#100C1F] via-[#0D0A18] to-black text-white p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate('/admin/central')}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
          Cadastro de DJs
        </h1>
        <div></div>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <GlassCard variant="music" className="w-full">
          <div className="flex items-center gap-3 mb-6">
            <UserPlus className="w-6 h-6 text-green-400" />
            <h2 className="text-xl font-semibold">Novo DJ</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-white/5 border-white/10 text-white"
                placeholder="email@exemplo.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Senha</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="bg-white/5 border-white/10 text-white pr-10"
                  placeholder="Senha segura"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Nome de Usuário</label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-white/5 border-white/10 text-white"
                placeholder="Nome de usuário"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Nome Completo</label>
              <Input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
                className="bg-white/5 border-white/10 text-white"
                placeholder="Nome completo"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Nome Artístico</label>
              <Input
                type="text"
                name="artist_name"
                value={formData.artist_name}
                onChange={handleChange}
                required
                className="bg-white/5 border-white/10 text-white"
                placeholder="Nome artístico"
              />
            </div>
            
            <div className="pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-400 text-white font-bold shadow-lg hover:shadow-xl transition-all"
              >
                {loading ? 'Cadastrando...' : 'Cadastrar DJ'}
              </Button>
            </div>
          </form>
        </GlassCard>
      </div>
    </div>
  );
};

export default CadastroDJs;