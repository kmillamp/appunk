import { useState } from 'react'
import { DollarSign, TrendingUp, TrendingDown, Wallet, Eye, EyeOff, Plus, Calendar, Receipt, Target } from 'lucide-react'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

export default function Unkash() {
  const [showValues, setShowValues] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'caches' | 'transactions' | 'goals'>('overview')

  // Mock data
  const financialData = {
    balance: 15750.80,
    income: 23500.00,
    expenses: 7749.20,
    pendingCaches: 5200.00
  }

  const caches = [
    {
      id: '1',
      event: 'Festa Corporativa XYZ',
      amount: 2500,
      date: '2024-09-15',
      status: 'pending' as const,
      producer: 'João Silva'
    },
    {
      id: '2',
      event: 'Casamento Marina & Pedro',
      amount: 3500,
      date: '2024-09-18',
      status: 'confirmed' as const,
      producer: 'Ana Costa'
    }
  ]

  const goals = [
    {
      id: '1',
      title: 'Equipamento Novo',
      current: 7500,
      target: 15000,
      category: 'Equipamentos'
    },
    {
      id: '2',
      title: 'Reserva de Emergência',
      current: 8200,
      target: 20000,
      category: 'Poupança'
    }
  ]

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: Wallet },
    { id: 'caches', label: 'Cachês', icon: Calendar },
    { id: 'transactions', label: 'Transações', icon: Receipt },
    { id: 'goals', label: 'Metas', icon: Target }
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="text-center flex-1">
          <div className="flex items-center justify-center gap-3 mb-4">
            <DollarSign className="w-8 h-8 text-green-400 animate-float" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gradient-primary">
              Unkash
            </h1>
          </div>
          <p className="text-muted-foreground text-base">
            Controle financeiro completo para sua carreira
          </p>
        </div>

        <Button
          onClick={() => setShowValues(!showValues)}
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground"
        >
          {showValues ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </Button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-gradient-primary text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </Button>
          )
        })}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Financial Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <GlassCard variant="music" className="text-center">
              <Wallet className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">
                {showValues ? formatCurrency(financialData.balance) : "••••••"}
              </p>
              <p className="text-muted-foreground text-sm">Saldo Atual</p>
            </GlassCard>

            <GlassCard variant="music" className="text-center">
              <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">
                {showValues ? formatCurrency(financialData.income) : "••••••"}
              </p>
              <p className="text-muted-foreground text-sm">Receitas</p>
            </GlassCard>

            <GlassCard variant="music" className="text-center">
              <TrendingDown className="w-8 h-8 text-red-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">
                {showValues ? formatCurrency(financialData.expenses) : "••••••"}
              </p>
              <p className="text-muted-foreground text-sm">Gastos</p>
            </GlassCard>

            <GlassCard variant="music" className="text-center">
              <Calendar className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">
                {showValues ? formatCurrency(financialData.pendingCaches) : "••••••"}
              </p>
              <p className="text-muted-foreground text-sm">Pendentes</p>
            </GlassCard>
          </div>

          {/* Progress Goals */}
          <GlassCard variant="gradient">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Progresso das Metas</h3>
              <Button
                onClick={() => setActiveTab('goals')}
                variant="ghost"
                size="sm"
                className="text-green-400 hover:text-green-300"
              >
                Ver Todas
              </Button>
            </div>
            
            <div className="space-y-4">
              {goals.slice(0, 2).map((goal) => {
                const progress = (goal.current / goal.target) * 100
                return (
                  <div key={goal.id}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-foreground text-sm font-medium">{goal.title}</span>
                      <span className="text-green-400 text-sm">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2 bg-white/10" />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>{showValues ? formatCurrency(goal.current) : "••••••"}</span>
                      <span>{showValues ? formatCurrency(goal.target) : "••••••"}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </GlassCard>
        </div>
      )}

      {/* Cachês Tab */}
      {activeTab === 'caches' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-foreground">Cachês por Apresentação</h3>
            <Button className="bg-gradient-success text-white hover:scale-105 transition-all duration-300">
              <Plus className="w-4 h-4 mr-2" />
              Novo Cachê
            </Button>
          </div>

          <div className="space-y-4">
            {caches.map((cache) => (
              <GlassCard key={cache.id} variant="music">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg font-semibold text-foreground">{cache.event}</h4>
                      <Badge className={cache.status === 'confirmed' 
                        ? 'bg-green-500/20 text-green-400 border-green-400'
                        : 'bg-yellow-500/20 text-yellow-400 border-yellow-400'
                      }>
                        {cache.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-green-400" />
                        <span>{showValues ? formatCurrency(cache.amount) : "••••••"}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-blue-400" />
                        <span>{new Date(cache.date).toLocaleDateString('pt-BR')}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Receipt className="w-4 h-4 text-purple-400" />
                        <span>{cache.producer}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2 ml-4">
                    <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300">
                      Editar
                    </Button>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* Transactions Tab */}
      {activeTab === 'transactions' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-foreground">Histórico de Transações</h3>
            <Button className="bg-gradient-primary text-white hover:scale-105 transition-all duration-300">
              <Plus className="w-4 h-4 mr-2" />
              Nova Transação
            </Button>
          </div>

          <GlassCard variant="music">
            <div className="text-center py-8">
              <Receipt className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground">Nenhuma transação registrada</p>
              <p className="text-muted-foreground text-sm mt-2">
                Comece adicionando suas receitas e gastos
              </p>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Goals Tab */}
      {activeTab === 'goals' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-foreground">Metas Financeiras</h3>
            <Button className="bg-gradient-accent text-background hover:scale-105 transition-all duration-300">
              <Plus className="w-4 h-4 mr-2" />
              Nova Meta
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {goals.map((goal) => {
              const progress = (goal.current / goal.target) * 100
              return (
                <GlassCard key={goal.id} variant="gradient">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-1">{goal.title}</h4>
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-400">
                        {goal.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-muted-foreground text-sm">Progresso</span>
                        <span className="text-green-400 font-semibold">{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-3 bg-white/10" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Atual</p>
                        <p className="text-foreground font-semibold">
                          {showValues ? formatCurrency(goal.current) : "••••••"}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Meta</p>
                        <p className="text-foreground font-semibold">
                          {showValues ? formatCurrency(goal.target) : "••••••"}
                        </p>
                      </div>
                    </div>

                    <Button className="w-full bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-400/20">
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar Valor
                    </Button>
                  </div>
                </GlassCard>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}