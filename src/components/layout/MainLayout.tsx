import { useState } from "react";
import { Header } from "./Header";
import BottomNavigation from "./MobileNavigation";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
  currentRoute: string;
  onNavigate: (route: string) => void;
  user?: {
    name?: string;
    avatar?: string;
    email?: string;
  };
}

export function MainLayout({ children, currentRoute, onNavigate, user }: MainLayoutProps) {
  const [showProfile, setShowProfile] = useState(false);
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header fixo */}
      <Header 
        user={user} 
        onProfileClick={() => setShowProfile(!showProfile)} 
      />
      
      {/* Conteúdo principal com padding para header e navegação */}
      <main className="pt-20 pb-24 px-4">
        <div className="max-w-lg mx-auto">
          {children}
        </div>
      </main>
      
      {/* Navegação móvel fixa */}
      <BottomNavigation />
      
      {/* Overlay de perfil */}
      {showProfile && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowProfile(false)}
        >
          <div 
            className="absolute bottom-24 left-4 right-4 glass-card p-6 rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-primary-foreground">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {user?.name || 'Usuário'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {user?.email || 'usuario@conexaounk.com'}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 pt-4">
                <button 
                  onClick={() => {
                    onNavigate('profile');
                    setShowProfile(false);
                  }}
                  className="p-3 bg-secondary rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors"
                >
                  Editar Perfil
                </button>
                
                <button 
                  onClick={() => {
                    // Implementar logout
                    window.location.href = '/login';
                  }}
                  className="p-3 bg-destructive rounded-lg text-sm font-medium text-destructive-foreground hover:bg-destructive/80 transition-colors"
                >
                  Sair
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}