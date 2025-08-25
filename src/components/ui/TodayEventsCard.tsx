import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { GlassCard } from './glass-card';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import { Badge } from './badge';

type Event = {
  id: string;
  event_name: string;
  event_date: string;
  start_time?: string;
  end_time?: string;
  location?: string;
  producer_name?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
};

export const TodayEventsCard: React.FC = () => {
  const { user } = useAuth();
  const [todayEvents, setTodayEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setTodayEvents([]);
      setLoading(false);
      return;
    }

    // Em uma implementação real, você buscaria do Supabase
    const today = new Date().toISOString().split('T')[0];
    
    // Dados de exemplo
    const demoEvents: Event[] = [
      {
        id: '1',
        event_name: 'Show no Bar do Zé',
        event_date: today,
        start_time: '20:00',
        end_time: '23:00',
        location: 'Rua das Flores, 123',
        producer_name: 'Produtora XYZ',
        status: 'confirmed'
      },
      {
        id: '2',
        event_name: 'Ensaio com a banda',
        event_date: today,
        start_time: '14:00',
        end_time: '17:00',
        location: 'Estúdio Central',
        status: 'pending'
      }
    ];

    setTodayEvents(demoEvents);
    setLoading(false);
  }, [user]);

  const getStatusColor = (status: Event['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500 text-white';
      case 'pending':
        return 'bg-yellow-500 text-white';
      case 'cancelled':
        return 'bg-red-500 text-white';
      case 'completed':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getStatusText = (status: Event['status']) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmado';
      case 'pending':
        return 'Pendente';
      case 'cancelled':
        return 'Cancelado';
      case 'completed':
        return 'Concluído';
      default:
        return status;
    }
  };

  return (
    <GlassCard variant="music" className="w-full">
      <div className="flex items-center space-x-2 mb-4">
        <Calendar className="w-5 h-5 text-blue-400" />
        <h3 className="text-lg font-semibold text-white">Eventos de Hoje</h3>
      </div>
      
      {loading ? (
        <div className="text-center py-4">
          <div className="animate-pulse text-gray-400">Carregando eventos...</div>
        </div>
      ) : todayEvents.length === 0 ? (
        <div className="text-center py-4">
          <p className="text-gray-400">Nenhum evento para hoje.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {todayEvents.map((event) => (
            <div key={event.id} className="bg-white/5 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-white">{event.event_name}</h4>
                <Badge className={getStatusColor(event.status)}>
                  {getStatusText(event.status)}
                </Badge>
              </div>
              
              <div className="space-y-2 text-sm text-gray-300">
                {event.start_time && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>
                      {event.start_time} {event.end_time ? `- ${event.end_time}` : ''}
                    </span>
                  </div>
                )}
                
                {event.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{event.location}</span>
                  </div>
                )}
                
                {event.producer_name && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span>{event.producer_name}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </GlassCard>
  );
};