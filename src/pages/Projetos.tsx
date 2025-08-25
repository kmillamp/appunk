import { useState } from 'react'
import { CheckSquare, FolderOpen, Instagram, Target, FileText, Plus, Calendar, Share2 } from 'lucide-react'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

type TabType = 'tasks' | 'projects' | 'posts' | 'goals' | 'documents'

interface Task {
  id: string
  title: string
  project: string
  priority: 'low' | 'medium' | 'high'
  status: 'todo' | 'in-progress' | 'completed'
  deadline: string
}

interface Project {
  id: string
  title: string
  description: string
  progress: number
  status: 'planning' | 'in-progress' | 'completed'
  shared: boolean
}

interface Post {
  id: string
  title: string
  description: string
  status: 'draft' | 'pending' | 'approved' | 'published'
  shared: boolean
}

export default function Projetos() {
  const [activeTab, setActiveTab] = useState<TabType>('tasks')

  const tabs = [
    { id: 'tasks', label: 'Tarefas', icon: CheckSquare },
    { id: 'projects', label: 'Projetos', icon: FolderOpen },
    { id: 'posts', label: 'Posts IG', icon: Instagram },
    { id: 'goals', label: 'Metas', icon: Target },
    { id: 'documents', label: 'Documentos', icon: FileText }
  ]

  // Mock data
  const tasks: Task[] = [
    {
      id: '1',
      title: 'Criar setlist para festa corporativa',
      project: 'Evento XYZ Corp',
      priority: 'high',
      status: 'todo',
      deadline: '2024-09-15'
    },
    {
      id: '2',
      title: 'Editar vídeo promocional',
      project: 'Branding Pessoal',
      priority: 'medium',
      status: 'in-progress',
      deadline: '2024-09-20'
    }
  ]

  const projects: Project[] = [
    {
      id: '1',
      title: 'EP Novo Som',
      description: 'Projeto de 4 faixas autorais',
      progress: 65,
      status: 'in-progress',
      shared: true
    },
    {
      id: '2',
      title: 'Renovação de Setup',
      description: 'Upgrade completo dos equipamentos',
      progress: 30,
      status: 'planning',
      shared: false
    }
  ]

  const posts: Post[] = [
    {
      id: '1',
      title: 'Behind the Scenes - Studio',
      description: 'Processo de criação no estúdio',
      status: 'pending',
      shared: true
    },
    {
      id: '2',
      title: 'Dicas para DJs Iniciantes',
      description: 'Série educativa sobre equipamentos',
      status: 'draft',
      shared: false
    }
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-400'
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-400'
      case 'low': return 'bg-blue-500/20 text-blue-400 border-blue-400'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-400'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': case 'published': case 'approved':
        return 'bg-green-500/20 text-green-400 border-green-400'
      case 'in-progress': case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-400'
      case 'todo': case 'draft': case 'planning':
        return 'bg-blue-500/20 text-blue-400 border-blue-400'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-400'
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <FolderOpen className="w-8 h-8 text-emerald-400 animate-float" />
          <h1 className="text-3xl sm:text-4xl font-bold text-gradient-primary">
            Projetos
          </h1>
        </div>
        <p className="text-muted-foreground text-base">
          Sistema completo de gerenciamento de projetos musicais
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              onClick={() => setActiveTab(tab.id as TabType)}
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

      {/* Tasks Tab */}
      {activeTab === 'tasks' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-foreground">Gerenciamento de Tarefas</h3>
            <Button className="bg-gradient-success text-white hover:scale-105 transition-all duration-300">
              <Plus className="w-4 h-4 mr-2" />
              Nova Tarefa
            </Button>
          </div>

          <div className="space-y-4">
            {tasks.map((task) => (
              <GlassCard key={task.id} variant="music">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <CheckSquare className="w-5 h-5 text-emerald-400" />
                      <h4 className="text-lg font-semibold text-foreground">{task.title}</h4>
                    </div>

                    <p className="text-muted-foreground text-sm mb-3">{task.project}</p>

                    <div className="flex flex-wrap gap-2">
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority === 'high' ? 'Urgente' : 
                         task.priority === 'medium' ? 'Médio' : 'Baixo'}
                      </Badge>
                      
                      <Badge className={getStatusColor(task.status)}>
                        {task.status === 'todo' ? 'A Fazer' :
                         task.status === 'in-progress' ? 'Em Progresso' : 'Concluída'}
                      </Badge>

                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {new Date(task.deadline).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
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

      {/* Projects Tab */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-foreground">Projetos Musicais</h3>
            <Button className="bg-gradient-accent text-background hover:scale-105 transition-all duration-300">
              <Plus className="w-4 h-4 mr-2" />
              Novo Projeto
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <GlassCard key={project.id} variant="gradient">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-foreground mb-1">{project.title}</h4>
                      <p className="text-muted-foreground text-sm">{project.description}</p>
                    </div>
                    {project.shared && (
                      <Badge className="bg-indigo-500/20 text-indigo-400 border-indigo-400">
                        <Share2 className="w-3 h-3 mr-1" />
                        Compartilhado
                      </Badge>
                    )}
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-muted-foreground text-sm">Progresso</span>
                      <span className="text-emerald-400 font-semibold">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-3 bg-white/10" />
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge className={getStatusColor(project.status)}>
                      {project.status === 'planning' ? 'Planejamento' :
                       project.status === 'in-progress' ? 'Em Progresso' : 'Concluído'}
                    </Badge>

                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300">
                        Editar
                      </Button>
                      {!project.shared && (
                        <Button size="sm" variant="ghost" className="text-green-400 hover:text-green-300">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* Posts Tab */}
      {activeTab === 'posts' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-foreground">Posts do Instagram</h3>
            <Button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:scale-105 transition-all duration-300">
              <Plus className="w-4 h-4 mr-2" />
              Nova Ideia
            </Button>
          </div>

          <div className="space-y-4">
            {posts.map((post) => (
              <GlassCard key={post.id} variant="player">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Instagram className="w-5 h-5 text-pink-400" />
                      <h4 className="text-lg font-semibold text-foreground">{post.title}</h4>
                    </div>

                    <p className="text-muted-foreground text-sm mb-3">{post.description}</p>

                    <div className="flex flex-wrap gap-2">
                      <Badge className={getStatusColor(post.status)}>
                        {post.status === 'draft' ? 'Rascunho' :
                         post.status === 'pending' ? 'Aguardando Aprovação' :
                         post.status === 'approved' ? 'Aprovado' : 'Publicado'}
                      </Badge>

                      {post.shared && (
                        <Badge className="bg-indigo-500/20 text-indigo-400 border-indigo-400">
                          <Share2 className="w-3 h-3 mr-1" />
                          Compartilhado
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300">
                      Editar
                    </Button>
                    {!post.shared && (
                      <Button size="sm" variant="ghost" className="text-green-400 hover:text-green-300">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* Goals Tab */}
      {activeTab === 'goals' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-foreground">Metas e Objetivos</h3>
            <Button className="bg-gradient-warning text-background hover:scale-105 transition-all duration-300">
              <Plus className="w-4 h-4 mr-2" />
              Nova Meta
            </Button>
          </div>

          <GlassCard variant="music">
            <div className="text-center py-12">
              <Target className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h4 className="text-lg font-semibold text-foreground mb-2">Nenhuma meta definida</h4>
              <p className="text-muted-foreground mb-6">
                Defina objetivos claros para sua carreira musical
              </p>
              <Button className="bg-gradient-warning text-background hover:scale-105 transition-all duration-300">
                <Target className="w-4 h-4 mr-2" />
                Criar Primeira Meta
              </Button>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Documents Tab */}
      {activeTab === 'documents' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-foreground">Documentos e Arquivos</h3>
            <Button className="bg-gradient-secondary text-white hover:scale-105 transition-all duration-300">
              <Plus className="w-4 h-4 mr-2" />
              Upload
            </Button>
          </div>

          <GlassCard variant="music">
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h4 className="text-lg font-semibold text-foreground mb-2">Nenhum documento</h4>
              <p className="text-muted-foreground mb-6">
                Organize contratos, setlists e outros arquivos importantes
              </p>
              <Button className="bg-gradient-secondary text-white hover:scale-105 transition-all duration-300">
                <FileText className="w-4 h-4 mr-2" />
                Fazer Upload
              </Button>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  )
}