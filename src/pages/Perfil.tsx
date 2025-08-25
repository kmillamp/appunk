import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack,
  Share,
  MoreHorizontal,
  Shuffle,
  Repeat,
  Volume2,
  Download,
  Music,
  Users,
  Star,
  MapPin,
  Calendar,
  ExternalLink,
  Edit3,
  Save,
  X
} from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const DJStreamingProfile = () => {
  const { user, profile } = useAuth();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [editingTrack, setEditingTrack] = useState<number | null>(null);
  const [editingAvatar, setEditingAvatar] = useState(false);
  const [editingHeader, setEditingHeader] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tracks, setTracks] = useState([]);
  const [editForm, setEditForm] = useState({
    title: '',
    soundcloudUrl: ''
  });
  const [djData, setDjData] = useState({
    name: "",
    realName: "",
    avatar: "",
    headerImage: "",
    location: "",
    verified: false,
    email: "",
    pix: "",
    birthDate: "",
    portfolio: "",
    presskit: "",
    following: ""
  });
  const [imageEditForm, setImageEditForm] = useState({
    avatar: '',
    headerImage: ''
  });
  const [contactInfo, setContactInfo] = useState([]);

  useEffect(() => {
    if (user) {
      loadProfileData();
    }
  }, [user]);

  const loadProfileData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error) {
        console.error('Erro ao carregar perfil:', error);
        return;
      }

      if (data) {
        setDjData({
          name: data.artist_name_name || data.name || '',
          realName: data.full_name || '',
          avatar: "https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", // Placeholder até implementar upload de imagens
          headerImage: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Placeholder até implementar upload de imagens
          location: data.location || '',
          verified: true,
          email: data.email || '',
          pix: data.chave_pix || '',
          birthDate: data.birth_date || '',
          portfolio: data.portfolio_url || '',
          presskit: data.presskit_url || '',
          following: "0"
        });

        // Atualizar informações de contato
        const updatedContactInfo = [
          {
            id: 1,
            label: "Nome Completo",
            value: data.full_name || '',
            icon: "👤"
          },
          {
            id: 2,
            label: "E-mail",
            value: data.email || '',
            icon: "📧"
          },
          {
            id: 3,
            label: "PIX",
            value: data.chave_pix || '',
            icon: "💳"
          },
          {
            id: 4,
            label: "Data de Nascimento",
            value: data.birth_date || '',
            icon: "🎂"
          },
          {
            id: 5,
            label: "Portfólio",
            value: data.portfolio_url || '',
            icon: "🎵"
          },
          {
            id: 6,
            label: "Press Kit",
            value: data.presskit_url || '',
            icon: "📁"
          }
        ];
        setContactInfo(updatedContactInfo);
      }
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
    } finally {
      setLoading(false);
    }
  };

  const startEditTrack = (index: number) => {
    setEditingTrack(index);
    setEditForm({
      title: tracks[index]?.title || '',
      soundcloudUrl: tracks[index]?.soundcloudUrl || ''
    });
  };

  const saveTrackEdit = () => {
    if (editingTrack !== null) {
      const updatedTracks = [...tracks];
      updatedTracks[editingTrack] = {
        ...updatedTracks[editingTrack],
        title: editForm.title,
        soundcloudUrl: editForm.soundcloudUrl
      };
      setTracks(updatedTracks);
      setEditingTrack(null);
      setEditForm({ title: '', soundcloudUrl: '' });
    }
  };

  const cancelEdit = () => {
    setEditingTrack(null);
    setEditForm({ title: '', soundcloudUrl: '' });
  };

  const startEditAvatar = () => {
    setEditingAvatar(true);
    setImageEditForm({ ...imageEditForm, avatar: djData.avatar });
  };

  const saveAvatarEdit = async () => {
    try {
      // Aqui você implementaria o upload da imagem para o Supabase Storage
      // Por enquanto, apenas atualizamos o estado local
      setDjData({ ...djData, avatar: imageEditForm.avatar });
      setEditingAvatar(false);
      setImageEditForm({ ...imageEditForm, avatar: '' });
    } catch (error) {
      console.error('Erro ao salvar avatar:', error);
    }
  };

  const cancelAvatarEdit = () => {
    setEditingAvatar(false);
    setImageEditForm({ ...imageEditForm, avatar: '' });
  };

  const startEditHeader = () => {
    setEditingHeader(true);
    setImageEditForm({ ...imageEditForm, headerImage: djData.headerImage });
  };

  const saveHeaderEdit = async () => {
    try {
      // Aqui você implementaria o upload da imagem para o Supabase Storage
      // Por enquanto, apenas atualizamos o estado local
      setDjData({ ...djData, headerImage: imageEditForm.headerImage });
      setEditingHeader(false);
      setImageEditForm({ ...imageEditForm, headerImage: '' });
    } catch (error) {
      console.error('Erro ao salvar imagem de cabeçalho:', error);
    }
  };

  const cancelHeaderEdit = () => {
    setEditingHeader(false);
    setImageEditForm({ ...imageEditForm, headerImage: '' });
  };

  const playTrack = (index: number) => {
    const track = tracks[index];
    if (track?.soundcloudUrl) {
      window.open(track.soundcloudUrl, '_blank');
    }
    setCurrentTrack(index);
    setIsPlaying(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-dark text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-music-purple"></div>
      </div>
    );
  }

  // O restante do componente permanece o mesmo, mas agora usando os dados do Supabase
  return (
    <div className="min-h-screen bg-gradient-dark text-white">
      {/* Header */}
      <div className="relative h-80 overflow-hidden group">
        {editingHeader ? (
          // Header Edit Mode
          <div className="absolute inset-0 bg-dark-bg/90 backdrop-blur-md z-20 flex items-center justify-center">
            <div className="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-2xl p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-bold mb-4">Editar Foto do Cabeçalho</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">URL da Imagem</label>
                  <input
                    type="url"
                    value={imageEditForm.headerImage}
                    onChange={(e) => setImageEditForm({...imageEditForm, headerImage: e.target.value})}
                    className="w-full p-3 bg-dark-surface border border-glass-border rounded-lg text-white placeholder-white/50 focus:border-music-purple focus:outline-none"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={saveHeaderEdit}
                    className="flex-1 bg-music-purple hover:bg-music-purple-dark text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <Save size={18} /> Salvar
                  </button>
                  <button
                    onClick={cancelHeaderEdit}
                    className="flex-1 bg-dark-surface hover:bg-dark-surface-hover text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <X size={18} /> Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        
        <img 
          src={djData.headerImage} 
          alt="DJ Header" 
          className="w-full h-full object-cover"
        />
        
        <button 
          onClick={startEditHeader}
          className="absolute top-4 right-4 bg-dark-bg/50 hover:bg-dark-bg/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Edit3 size={16} />
        </button>
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark-bg to-transparent h-24"></div>
      </div>
      
      {/* Profile Info */}
      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar */}
          <div className="relative">
            {editingAvatar ? (
              <div className="absolute inset-0 bg-dark-bg/90 backdrop-blur-md z-20 flex items-center justify-center rounded-full w-40 h-40">
                <div className="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-2xl p-6 w-64">
                  <h3 className="text-xl font-bold mb-4">Editar Avatar</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">URL da Imagem</label>
                      <input
                        type="url"
                        value={imageEditForm.avatar}
                        onChange={(e) => setImageEditForm({...imageEditForm, avatar: e.target.value})}
                        className="w-full p-3 bg-dark-surface border border-glass-border rounded-lg text-white placeholder-white/50 focus:border-music-purple focus:outline-none"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={saveAvatarEdit}
                        className="flex-1 bg-music-purple hover:bg-music-purple-dark text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                      >
                        <Save size={18} /> Salvar
                      </button>
                      <button
                        onClick={cancelAvatarEdit}
                        className="flex-1 bg-dark-surface hover:bg-dark-surface-hover text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                      >
                        <X size={18} /> Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            
            <div className="relative group w-40 h-40">
              <img 
                src={djData.avatar} 
                alt="DJ Avatar" 
                className="w-40 h-40 rounded-full border-4 border-dark-bg object-cover"
              />
              <button 
                onClick={startEditAvatar}
                className="absolute bottom-2 right-2 bg-dark-bg/50 hover:bg-dark-bg/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Edit3 size={16} />
              </button>
            </div>
          </div>
          
          {/* Profile Details */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{djData.name}</h1>
              {djData.verified && (
                <span className="bg-music-purple text-white text-xs px-2 py-1 rounded-full">Verificado</span>
              )}
            </div>
            
            <div className="flex items-center gap-4 text-white/70 mb-4">
              <div className="flex items-center gap-1">
                <MapPin size={16} />
                <span>{djData.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users size={16} />
                <span>{djData.following} seguidores</span>
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {contactInfo.map((info) => (
                <div key={info.id} className="bg-dark-surface p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{info.icon}</span>
                    <div>
                      <p className="text-white/60 text-sm">{info.label}</p>
                      <p className="font-medium">{info.value || 'Não informado'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Tracks Section */}
      <div className="container mx-auto px-4 mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Faixas Recentes</h2>
          <button className="text-music-purple hover:text-music-purple-light transition-colors">
            Ver todas
          </button>
        </div>
        
        {tracks.length === 0 ? (
          <div className="bg-dark-surface rounded-xl p-8 text-center">
            <Music className="w-16 h-16 mx-auto mb-4 text-white/30" />
            <h3 className="text-xl font-medium mb-2">Nenhuma faixa encontrada</h3>
            <p className="text-white/60 mb-6">Você ainda não adicionou nenhuma faixa ao seu perfil.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tracks.map((track, index) => (
              <div 
                key={track.id} 
                className={`bg-dark-surface rounded-xl overflow-hidden ${currentTrack === index && isPlaying ? 'ring-2 ring-music-purple' : ''}`}
              >
                {editingTrack === index ? (
                  <div className="p-4">
                    <h3 className="text-lg font-medium mb-4">Editar Faixa</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">Título</label>
                        <input
                          type="text"
                          value={editForm.title}
                          onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                          className="w-full p-3 bg-dark-bg border border-glass-border rounded-lg text-white placeholder-white/50 focus:border-music-purple focus:outline-none"
                          placeholder="Título da faixa"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">URL do SoundCloud</label>
                        <input
                          type="url"
                          value={editForm.soundcloudUrl}
                          onChange={(e) => setEditForm({...editForm, soundcloudUrl: e.target.value})}
                          className="w-full p-3 bg-dark-bg border border-glass-border rounded-lg text-white placeholder-white/50 focus:border-music-purple focus:outline-none"
                          placeholder="https://soundcloud.com/..."
                        />
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={saveTrackEdit}
                          className="flex-1 bg-music-purple hover:bg-music-purple-dark text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                        >
                          <Save size={18} /> Salvar
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="flex-1 bg-dark-bg hover:bg-dark-bg-hover text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                        >
                          <X size={18} /> Cancelar
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="relative group">
                      <img 
                        src={track.cover} 
                        alt={track.title} 
                        className="w-full aspect-square object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button 
                          onClick={() => playTrack(index)}
                          className="bg-music-purple hover:bg-music-purple-dark text-white p-4 rounded-full transition-colors"
                        >
                          {currentTrack === index && isPlaying ? <Pause size={24} /> : <Play size={24} />}
                        </button>
                      </div>
                      <button 
                        onClick={() => startEditTrack(index)}
                        className="absolute top-2 right-2 bg-dark-bg/50 hover:bg-dark-bg/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Edit3 size={16} />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-lg mb-1">{track.title}</h3>
                      <p className="text-white/70 mb-3">{track.artist}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-white/50 text-sm">{track.duration}</span>
                        <div className="flex gap-2">
                          <button className="text-white/70 hover:text-white transition-colors">
                            <Download size={18} />
                          </button>
                          <button className="text-white/70 hover:text-white transition-colors">
                            <Share size={18} />
                          </button>
                          <button className="text-white/70 hover:text-white transition-colors">
                            <MoreHorizontal size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DJStreamingProfile;

