import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from './button';
import { Plus, X, Save, Edit, Trash } from 'lucide-react';

type Note = {
  id: string;
  content: string;
  createdAt: string;
};

const QuickNotes: React.FC = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    if (!user) return;
    
    // Em uma implementação real, você buscaria do Supabase
    const demoNotes: Note[] = [
      {
        id: '1',
        content: 'Lembrar de confirmar horário do ensaio',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        content: 'Verificar equipamento antes do show',
        createdAt: new Date().toISOString(),
      },
    ];
    
    setNotes(demoNotes);
  }, [user]);

  const addNote = () => {
    if (!newNote.trim()) return;
    
    const note: Note = {
      id: Math.random().toString(36).substr(2, 9),
      content: newNote,
      createdAt: new Date().toISOString(),
    };
    
    setNotes([...notes, note]);
    setNewNote('');
    setShowInput(false);
  };

  const startEdit = (note: Note) => {
    setEditingNote(note.id);
    setEditContent(note.content);
  };

  const saveEdit = () => {
    if (!editContent.trim() || !editingNote) return;
    
    setNotes(
      notes.map((note) =>
        note.id === editingNote ? { ...note, content: editContent } : note
      )
    );
    
    setEditingNote(null);
    setEditContent('');
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-white">Notas Rápidas</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10"
          onClick={() => setShowInput(true)}
        >
          <Plus size={16} />
        </Button>
      </div>
      
      {showInput && (
        <div className="bg-white/5 rounded-lg p-3">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Digite sua nota aqui..."
            className="w-full bg-transparent border-none focus:ring-0 text-sm text-gray-300 placeholder-gray-500 resize-none"
            rows={2}
          />
          <div className="flex justify-end space-x-2 mt-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowInput(false)}
              className="text-gray-400 hover:text-gray-300"
            >
              <X size={14} />
            </Button>
            <Button 
              size="sm" 
              onClick={addNote}
              className="bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              <Save size={14} className="mr-1" /> Salvar
            </Button>
          </div>
        </div>
      )}
      
      <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
        {notes.length === 0 && !showInput && (
          <p className="text-gray-400 text-sm">Nenhuma nota adicionada. Clique em + para criar.</p>
        )}
        
        {notes.map((note) => (
          <div key={note.id} className="bg-white/5 rounded-lg p-3 group">
            {editingNote === note.id ? (
              <>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full bg-transparent border-none focus:ring-0 text-sm text-gray-300 resize-none"
                  rows={2}
                />
                <div className="flex justify-end space-x-2 mt-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setEditingNote(null)}
                    className="text-gray-400 hover:text-gray-300"
                  >
                    <X size={14} />
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={saveEdit}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white"
                  >
                    <Save size={14} className="mr-1" /> Salvar
                  </Button>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-300">{note.content}</p>
                <div className="flex justify-end space-x-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => startEdit(note)}
                    className="text-gray-400 hover:text-gray-300 h-7 w-7 p-0"
                  >
                    <Edit size={14} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => deleteNote(note.id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10 h-7 w-7 p-0"
                  >
                    <Trash size={14} />
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickNotes;