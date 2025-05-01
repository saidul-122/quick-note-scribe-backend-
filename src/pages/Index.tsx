
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getNotes, createNote } from '@/services/noteService';
import { CreateNoteRequest } from '@/types/note';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { StickyNote } from 'lucide-react';
import CreateNoteForm from '@/components/CreateNoteForm';
import NotesGrid from '@/components/NotesGrid';
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet';

const Index = () => {
  const queryClient = useQueryClient();

  // Fetch notes
  const { data: notes = [], isLoading } = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
  });

  // Create note mutation
  const createNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      // Refetch notes after creating a new one
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleCreateNote = async (noteData: CreateNoteRequest) => {
    await createNoteMutation.mutateAsync(noteData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 bg-fixed">
      <header className="bg-card shadow-sm backdrop-blur-sm bg-white/80">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <StickyNote className="h-8 w-8 text-primary mr-3 animate-bounce" />
              <h1 className="text-2xl font-bold text-foreground">QuickNote</h1>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">About</Button>
              </SheetTrigger>
              <SheetContent className="bg-white/95 backdrop-blur-md">
                <SheetHeader>
                  <SheetTitle className="text-2xl">About QuickNote</SheetTitle>
                  <SheetDescription>
                    <div className="py-4 space-y-4">
                      <p className="text-muted-foreground">
                        QuickNote is a simple note-taking app that helps you jot down your thoughts quickly and easily.
                      </p>
                      <p className="text-muted-foreground">
                        Create colorful notes, organize your ideas, and access them from anywhere.
                      </p>
                      <h3 className="font-medium text-lg mt-6">Features</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Create notes with custom colors</li>
                        <li>View all your notes in one place</li>
                        <li>Responsive design for all devices</li>
                        <li>Beautiful animations and transitions</li>
                      </ul>
                      <h3 className="font-medium text-lg mt-6">Version</h3>
                      <p className="text-muted-foreground">1.0.0</p>
                    </div>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8 animate-fade-in">
          <h2 className="text-xl font-semibold mb-4">Create Note</h2>
          <CreateNoteForm onSubmit={handleCreateNote} />
        </div>

        <Separator className="my-8" />

        <div className="animate-fade-in">
          <h2 className="text-xl font-semibold mb-6">Your Notes</h2>
          <NotesGrid notes={notes} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
};

export default Index;
