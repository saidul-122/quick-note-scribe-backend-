
import { CreateNoteRequest, Note } from "@/types/note";

// Base URL for Supabase Edge Functions
// IMPORTANT: Replace with your actual Supabase URL when connecting to Supabase
const API_BASE_URL = "https://your-project-ref.supabase.co/functions/v1";

// Get all notes for the authenticated user
export async function getNotes(): Promise<Note[]> {
  // Note: In a real implementation, this would use the Supabase client with authentication
  // For demo purposes, we'll return mock data
  return mockNotes;
}

// Create a new note
export async function createNote(note: CreateNoteRequest): Promise<Note> {
  // Note: In a real implementation, this would use the Supabase client with authentication
  // For demo purposes, we'll return a mock response
  const newNote: Note = {
    id: `mock-${Date.now()}`,
    user_id: "mock-user",
    title: note.title,
    content: note.content,
    color: note.color || "blue",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Add to mock notes for demo
  mockNotes.unshift(newNote);
  
  return newNote;
}

// Mock data for demonstration
const mockNotes: Note[] = [
  {
    id: "1",
    user_id: "user-1",
    title: "Meeting Notes",
    content: "Discuss Q2 roadmap with the team. Key points:\n- Review Q1 goals\n- Set Q2 priorities\n- Assign responsibilities",
    color: "yellow",
    created_at: "2023-04-15T10:30:00Z",
    updated_at: "2023-04-15T10:30:00Z",
  },
  {
    id: "2",
    user_id: "user-1",
    title: "Project Ideas",
    content: "1. Build a personal finance tracker\n2. Create a meal planning app\n3. Develop a habit tracker",
    color: "green",
    created_at: "2023-04-10T14:20:00Z",
    updated_at: "2023-04-10T14:20:00Z",
  },
  {
    id: "3",
    user_id: "user-1",
    title: "Shopping List",
    content: "- Milk\n- Eggs\n- Bread\n- Apples\n- Coffee",
    color: "blue",
    created_at: "2023-04-05T09:15:00Z",
    updated_at: "2023-04-05T09:15:00Z",
  },
  {
    id: "4",
    user_id: "user-1",
    title: "Books to Read",
    content: "- Atomic Habits by James Clear\n- Deep Work by Cal Newport\n- Thinking, Fast and Slow by Daniel Kahneman",
    color: "purple",
    created_at: "2023-03-28T16:45:00Z",
    updated_at: "2023-03-28T16:45:00Z",
  }
];
