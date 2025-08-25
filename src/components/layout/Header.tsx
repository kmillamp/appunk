import { User, Bell, Settings } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import unkLogo from "@/assets/unk-logo.jpg";

interface HeaderProps {
  user?: {
    name?: string;
    avatar?: string;
    email?: string;
  };
  onProfileClick: () => void;
}

export function Header({ user, onProfileClick }: HeaderProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-40 p-4 safe-top">
      <GlassCard variant="music" className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center overflow-hidden">
            <img 
              src={unkLogo} 
              alt="UNK Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">CONEXÃO UNK</h1>
            <p className="text-xs text-muted-foreground">Music Management</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="w-8 h-8 text-muted-foreground hover:text-foreground relative"
          >
            <Bell size={16} />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full flex items-center justify-center">
              <span className="text-[8px] text-destructive-foreground font-bold">3</span>
            </div>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onProfileClick}
            className="p-1 hover:bg-secondary/50 rounded-full"
          >
            <Avatar className="w-8 h-8">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback className="bg-gradient-primary text-xs text-primary-foreground font-bold">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </GlassCard>
    </div>
  );
}