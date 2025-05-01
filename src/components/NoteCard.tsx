
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { format } from 'date-fns';
import { Note } from '@/types/note';
import { cn } from '@/lib/utils';

interface NoteCardProps {
  note: Note;
}

const colorClasses = {
  blue: 'bg-blue-50 border-blue-200',
  green: 'bg-green-50 border-green-200',
  yellow: 'bg-amber-50 border-amber-200',
  red: 'bg-red-50 border-red-200',
  purple: 'bg-purple-50 border-purple-200',
  pink: 'bg-pink-50 border-pink-200'
};

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  // Format the date in a readable format
  const formattedDate = format(new Date(note.updated_at), 'MMM d, yyyy');
  
  return (
    <Card className={cn(
      'h-full shadow-sm hover:shadow-md transition-shadow duration-200',
      note.color in colorClasses ? colorClasses[note.color as keyof typeof colorClasses] : colorClasses.blue
    )}>
      <CardHeader className="pb-2">
        <h3 className="font-medium text-lg">{note.title}</h3>
        <p className="text-xs text-muted-foreground">{formattedDate}</p>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap">{note.content}</p>
      </CardContent>
    </Card>
  );
};

export default NoteCard;
