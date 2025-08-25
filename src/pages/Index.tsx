import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { GlassCard } from "@/components/ui/glass-card";
import { Equalizer } from "@/components/ui/Equalizer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Target, 
  CheckSquare, 
  StickyNote, 
  Heart,
  Plus,
  Clock,
  TrendingUp,
  Music
} from 'lucide-react';

const Index = () => {
  const [currentRoute, setCurrentRoute] = useState('home');
  
  // Dados mockados do usuário
  const user = {
    name: "DJ Producer",
    email: "producer@conexaounk.com",
    avatar: ""
  };

  // Função para navegação entre páginas
  const handleNavigate = (route: string) => {
    setCurrentRoute(route);
    // Aqui você implementaria a navegação real
    console.log('Navegando para:', route);
  };

  // Dados mockados para os widgets
  const todayEvents = [
    { id: 1, title: "Show Planeta Atlântida", time: "22:00", status: "confirmed" },
    { id: 2, title: "Reunião com Manager", time: "16:00", status: "pending" }
  ];

  const tasks = [
    { id: 1, title: "Finalizar mix para o festival", priority: "high", completed: false },
    { id: 2, title: "Enviar rider técnico", priority: "medium", completed: false },
    { id: 3, title: "Confirmar hospedagem", priority: "low", completed: true }
  ];

  const inspirationQuotes = [
    "A sua sensibilidade é tua potência. O mundo precisa de gente que sente.",
    "Cada batida do seu coração é uma oportunidade de criar algo único.",
    "Sua criatividade floresce quando você cuida da sua energia.",
    "Conecte-se consigo mesmo antes de conectar-se com o público."
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: "Bom dia", icon: "🌅" };
    if (hour < 18) return { text: "Boa tarde", icon: "☀️" };
    return { text: "Boa noite", icon: "🌙" };
  };

  const greeting = getGreeting();
  const todayQuote = inspirationQuotes[new Date().getDate() % inspirationQuotes.length];

  const renderContent = () => {
    if (currentRoute !== 'home') {
      return (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
            <Music className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2 capitalize">
            {currentRoute}
          </h2>
          <p className="text-muted-foreground mb-6">
            Esta seção está em desenvolvimento.
          </p>
          <Button 
            onClick={() => setCurrentRoute('home')}
            variant="outline"
            className="bg-secondary/50 hover:bg-secondary border-glass-border"
          >
            Voltar ao Início
          </Button>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Saudação personalizada */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {greeting.text}, {user.name}! {greeting.icon}
          </h1>
          <p className="text-lg font-medium bg-gradient-primary bg-clip-text text-transparent">
            Vamos criar conexões reais hoje?
          </p>
          
          {/* Equalizer visual */}
          <div className="mt-6">
            <Equalizer className="h-12 max-w-xs mx-auto" />
          </div>
        </div>

        {/* Grid de widgets */}
        <div className="grid gap-6">
          {/* Notas Rápidas */}
          <GlassCard variant="music">
            <div className="flex items-center space-x-2 mb-4">
              <StickyNote className="w-5 h-5 text-yellow-400" />
              <h3 className="text-lg font-semibold text-foreground">Notas Rápidas</h3>
              <Button size="sm" variant="ghost" className="ml-auto">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 bg-secondary/30 rounded-lg border border-glass-border">
                <p className="text-sm text-foreground">Lembrar de testar novo setup antes do show</p>
                <span className="text-xs text-muted-foreground">Há 2 horas</span>
              </div>
              
              <div className="p-3 bg-secondary/30 rounded-lg border border-glass-border">
                <p className="text-sm text-foreground">Inspiração: groove house + elementos brasileiros</p>
                <span className="text-xs text-muted-foreground">Ontem</span>
              </div>
            </div>
          </GlassCard>

          {/* Eventos do Dia */}
          <GlassCard variant="gradient">
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="w-5 h-5 text-accent" />
              <h3 className="text-lg font-semibold text-foreground">Eventos de Hoje</h3>
            </div>
            
            <div className="space-y-3">
              {todayEvents.map(event => (
                <div key={event.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{event.title}</p>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{event.time}</span>
                    </div>
                  </div>
                  
                  <Badge 
                    variant={event.status === 'confirmed' ? 'default' : 'outline'}
                    className="text-xs"
                  >
                    {event.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                  </Badge>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Metas de Progresso */}
          <GlassCard variant="music">
            <div className="flex items-center space-x-2 mb-4">
              <Target className="w-5 h-5 text-green-400" />
              <h3 className="text-lg font-semibold text-foreground">Metas do Mês</h3>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground">Shows Realizados</span>
                  <span className="text-muted-foreground">8/12</span>
                </div>
                <div className="w-full bg-secondary/30 rounded-full h-2">
                  <div className="bg-gradient-primary h-2 rounded-full" style={{ width: '67%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground">Tracks Produzidas</span>
                  <span className="text-muted-foreground">3/5</span>
                </div>
                <div className="w-full bg-secondary/30 rounded-full h-2">
                  <div className="bg-gradient-secondary h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Tarefas Pendentes */}
          <GlassCard variant="secondary">
            <div className="flex items-center space-x-2 mb-4">
              <CheckSquare className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-foreground">Tarefas Pendentes</h3>
            </div>
            
            <div className="space-y-3">
              {tasks.filter(task => !task.completed).map(task => (
                <div key={task.id} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-glass-border text-primary"
                  />
                  <span className="text-sm flex-1 text-foreground">{task.title}</span>
                  <Badge 
                    variant="outline" 
                    className={
                      task.priority === 'high' ? 'text-red-400 border-red-400' :
                      task.priority === 'medium' ? 'text-yellow-400 border-yellow-400' :
                      'text-blue-400 border-blue-400'
                    }
                  >
                    {task.priority === 'high' ? 'Urgente' : 
                     task.priority === 'medium' ? 'Médio' : 'Baixo'}
                  </Badge>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Frase de Autocuidado */}
          <GlassCard variant="hero">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 mx-auto bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Inspiração do Dia</h3>
                <p className="text-foreground/90 italic leading-relaxed">
                  "{todayQuote}"
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    );
  };

  return (
    <MainLayout 
      currentRoute={currentRoute}
      onNavigate={handleNavigate}
      user={user}
    >
      {renderContent()}
    </MainLayout>
  );
};

export default Index;
