
import React from 'react';
import NoteCard from './NoteCard';
import { Note } from '@/types/note';

interface NotesGridProps {
  notes: Note[];
  isLoading: boolean;
}

const NotesGrid: React.FC<NotesGridProps> = ({ notes, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className="bg-gray-100 animate-pulse rounded-lg h-40"
            style={{ animationDelay: `${i * 0.1}s` }}
          ></div>
        ))}
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="text-center py-20 animate-fade-in">
        <h3 className="text-xl font-medium text-gray-600">No notes yet</h3>
        <p className="text-muted-foreground">Create your first note above</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {notes.map((note, index) => (
        <div 
          key={note.id} 
          className="animate-fade-in"
          style={{ 
            animationDelay: `${index * 0.1}s`,
            animationDuration: '0.5s'
          }}
        >
          <NoteCard note={note} />
        </div>
      ))}
    </div>
  );
};

export default NotesGrid;
