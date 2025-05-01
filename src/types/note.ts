
export interface Note {
  id: string;
  user_id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  color: string;
}

export type NoteColor = "blue" | "green" | "yellow" | "red" | "purple" | "pink";

export interface CreateNoteRequest {
  title: string;
  content: string;
  color?: NoteColor;
}
