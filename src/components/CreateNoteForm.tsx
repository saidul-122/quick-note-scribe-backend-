
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CreateNoteRequest, NoteColor } from '@/types/note';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface CreateNoteFormProps {
  onSubmit: (note: CreateNoteRequest) => Promise<void>;
}

const colorOptions: { value: NoteColor; label: string; class: string }[] = [
  { value: 'blue', label: 'Blue', class: 'text-blue-500' },
  { value: 'green', label: 'Green', class: 'text-green-500' },
  { value: 'yellow', label: 'Yellow', class: 'text-amber-500' },
  { value: 'red', label: 'Red', class: 'text-red-500' },
  { value: 'purple', label: 'Purple', class: 'text-purple-500' },
  { value: 'pink', label: 'Pink', class: 'text-pink-500' },
];

const CreateNoteForm: React.FC<CreateNoteFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState<NoteColor>('blue');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }
    
    if (!content.trim()) {
      toast.error('Please enter content');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await onSubmit({ title, content, color });
      setTitle('');
      setContent('');
      setColor('blue');
      toast.success('Note created successfully');
    } catch (error) {
      toast.error('Failed to create note');
      console.error('Error creating note:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mb-6 shadow-md w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg font-medium"
            />
            <Textarea
              placeholder="Write your note here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="resize-none"
            />
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Color:</span>
              <ToggleGroup type="single" value={color} onValueChange={(value) => value && setColor(value as NoteColor)}>
                {colorOptions.map((option) => (
                  <ToggleGroupItem 
                    key={option.value} 
                    value={option.value}
                    aria-label={`Set note color to ${option.label}`}
                  >
                    <Circle className={cn("h-4 w-4 fill-current", option.class)} />
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Note'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CreateNoteForm;
