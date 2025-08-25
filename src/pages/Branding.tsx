import { useState } from 'react'
import { Palette, Eye, MessageSquare, User, Target, Lightbulb } from 'lucide-react'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function Branding() {
  const [isAdminView] = useState(false) // Em produção, verificaria se o usuário logado é admin

  const brandingSections = [
    {
      id: 'identity',
      title: 'Identidade Visual',
      description: 'Logo, cores, tipografia e elementos visuais da marca',
      icon: Palette,
      color: 'text-purple-400',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 'communication',
      title: 'Comunicação',
      description: 'Tom de voz, messaging e estratégias de comunicação',
      icon: MessageSquare,
      color: 'text-blue-400',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'personality',
      title: 'Personalidade',
      description: 'Definição do tom, estilo e personalidade da marca',
      icon: User,
      color: 'text-green-400',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      id: 'strategy',
      title: 'Planos de Ação',
      description: 'Estratégias organizadas para implementar o branding',
      icon: Target,
      color: 'text-orange-400',
      gradient: 'from-orange-500 to-yellow-500'
    }
  ]

  const brandingData = {
    identity: {
      logo: null,
      primaryColors: ['#B855FF', '#3B82F6'],
      secondaryColors: ['#10B981', '#F59E0B'],
      fonts: ['Inter', 'Poppins'],
      style: 'Moderno, Elegante, Musical'
    },
    communication: {
      tone: 'Profissional e Acessível',
      values: ['Qualidade', 'Inovação', 'Conexão'],
      messaging: 'Conectando pessoas através da música'
    },
    personality: {
      traits: ['Criativo', 'Confiável', 'Energético', 'Moderno'],
      target: 'Eventos corporativos e sociais de alto padrão',
      differentiation: 'Experiência musical personalizada e tecnologia de ponta'
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Palette className="w-8 h-8 text-blue-400 animate-float" />
          <h1 className="text-3xl sm:text-4xl font-bold text-gradient-primary">
            Branding
          </h1>
        </div>
        <p className="text-muted-foreground text-base">
          {isAdminView 
            ? 'Gerencie a identidade visual e estratégia de marca' 
            : 'Visualize sua identidade de marca e estratégias'
          }
        </p>
        
        {!isAdminView && (
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-400 mt-3">
            <Eye className="w-3 h-3 mr-1" />
            Modo Visualização - Editável apenas pelo Admin
          </Badge>
        )}
      </div>

      {/* Admin Notice for DJs */}
      {!isAdminView && (
        <GlassCard variant="music" className="border-blue-500/30 bg-blue-500/5">
          <div className="flex items-center gap-3 text-center">
            <Lightbulb className="w-5 h-5 text-blue-400 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-400">Informação</p>
              <p className="text-xs text-muted-foreground">
                O admin tem acesso completo para editar seu branding e será notificado sobre atualizações necessárias
              </p>
            </div>
          </div>
        </GlassCard>
      )}

      {/* Branding Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {brandingSections.map((section) => {
          const IconComponent = section.icon
          
          return (
            <GlassCard 
              key={section.id}
              variant="music" 
              className="hover:shadow-primary transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 bg-gradient-to-r ${section.gradient} rounded-full flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{section.title}</h3>
                    <p className="text-muted-foreground text-sm">{section.description}</p>
                  </div>
                </div>

                {section.id === 'identity' && (
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">Cores Primárias</h4>
                      <div className="flex gap-2">
                        {brandingData.identity.primaryColors.map((color, index) => (
                          <div 
                            key={index}
                            className="w-8 h-8 rounded-full border-2 border-white/20"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-1">Estilo</h4>
                      <p className="text-muted-foreground text-sm">{brandingData.identity.style}</p>
                    </div>
                  </div>
                )}

                {section.id === 'communication' && (
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-1">Tom de Voz</h4>
                      <p className="text-muted-foreground text-sm">{brandingData.communication.tone}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">Valores</h4>
                      <div className="flex flex-wrap gap-1">
                        {brandingData.communication.values.map((value, index) => (
                          <Badge key={index} className="bg-blue-500/20 text-blue-400 border-blue-400 text-xs">
                            {value}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {section.id === 'personality' && (
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">Características</h4>
                      <div className="flex flex-wrap gap-1">
                        {brandingData.personality.traits.map((trait, index) => (
                          <Badge key={index} className="bg-green-500/20 text-green-400 border-green-400 text-xs">
                            {trait}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-1">Público-Alvo</h4>
                      <p className="text-muted-foreground text-sm">{brandingData.personality.target}</p>
                    </div>
                  </div>
                )}

                {section.id === 'strategy' && (
                  <div className="space-y-3">
                    <div className="text-center py-6">
                      <Target className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                      <p className="text-muted-foreground text-sm">
                        Planos estratégicos serão definidos pelo admin
                      </p>
                    </div>
                  </div>
                )}

                {isAdminView && (
                  <Button
                    className={`w-full bg-gradient-to-r ${section.gradient} text-white hover:scale-105 transition-all duration-300`}
                  >
                    Editar {section.title}
                  </Button>
                )}
              </div>
            </GlassCard>
          )
        })}
      </div>

      {/* Brand Overview */}
      <GlassCard variant="gradient">
        <div className="flex items-center gap-2 mb-6">
          <Eye className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-semibold text-foreground">Visão Geral da Marca</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Visual Identity Preview */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Identidade Visual</h4>
            
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center justify-center h-32 bg-gradient-to-r from-primary to-secondary rounded-lg mb-3">
                <span className="text-white font-bold text-xl">LOGO</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Fonte Principal:</span>
                  <span className="text-foreground font-medium">Inter</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Estilo:</span>
                  <span className="text-foreground">{brandingData.identity.style}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Brand Message */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Mensagem da Marca</h4>
            
            <div className="bg-white/5 rounded-lg p-4 border border-white/10 space-y-3">
              <blockquote className="text-center italic text-foreground">
                "{brandingData.communication.messaging}"
              </blockquote>
              
              <div className="text-center">
                <p className="text-muted-foreground text-sm mb-2">Diferencial Competitivo:</p>
                <p className="text-foreground text-sm">{brandingData.personality.differentiation}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions for Admin */}
        {isAdminView && (
          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="flex flex-wrap gap-3 justify-center">
              <Button size="sm" className="bg-purple-500/20 text-purple-400 hover:bg-purple-500/30">
                Upload Logo
              </Button>
              <Button size="sm" className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">
                Definir Cores
              </Button>
              <Button size="sm" className="bg-green-500/20 text-green-400 hover:bg-green-500/30">
                Estratégia de Conteúdo
              </Button>
              <Button size="sm" className="bg-orange-500/20 text-orange-400 hover:bg-orange-500/30">
                Plano de Ação
              </Button>
            </div>
          </div>
        )}
      </GlassCard>

      {/* Contact Admin CTA for DJs */}
      {!isAdminView && (
        <GlassCard variant="player" className="text-center">
          <div className="space-y-4">
            <MessageSquare className="w-12 h-12 text-blue-400 mx-auto" />
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Precisa de Ajuda com seu Branding?
              </h4>
              <p className="text-muted-foreground text-sm mb-4">
                O admin pode ajudar a desenvolver ou atualizar sua identidade visual
              </p>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:scale-105 transition-all duration-300">
                Solicitar Atualização
              </Button>
            </div>
          </div>
        </GlassCard>
      )}
    </div>
  )
}