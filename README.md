
# 📝 Custom Notes Service

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)

A modern, responsive notes application built with React and powered by Supabase. Create, manage, and organize your notes with custom colors and real-time updates.

![Notes App Screenshot](https://placehold.co/600x400?text=Notes+App+Demo)

## ✨ Features

- 🔒 **Secure Authentication** - User authentication through Supabase
- 💾 **Persistent Storage** - All notes saved to your database
- 🎨 **Color Coding** - Personalize notes with different colors
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🔄 **Real-time Updates** - Changes reflect immediately

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Backend**: Supabase (PostgreSQL + Auth)
- **API**: Supabase Edge Functions

## 📊 Schema Design

```sql
CREATE TABLE notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  color TEXT DEFAULT 'blue'
);
```

**Why this schema?**
- **UUID primary key**: Provides globally unique identifiers without the need for coordination, making it easy to merge data from different sources.
- **user_id with foreign key reference**: Ensures data integrity by linking notes to actual users and enables Row Level Security policies.
- **TIMESTAMPTZ for dates**: Stores timezone information for global usage and consistent display across regions.
- **Default values**: Automatically generates IDs and timestamps, reducing client-side code complexity.
- **Color field with default**: Enables visual customization while providing a reasonable default.

## 🔐 Row Level Security

```sql
-- Add RLS policies to secure the notes table
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to only see their own notes
CREATE POLICY "Users can view their own notes" ON notes
  FOR SELECT USING (auth.uid() = user_id);

-- Create policy to allow users to insert their own notes
CREATE POLICY "Users can insert their own notes" ON notes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to update their own notes
CREATE POLICY "Users can update their own notes" ON notes
  FOR UPDATE USING (auth.uid() = user_id);

-- Create policy to allow users to delete their own notes
CREATE POLICY "Users can delete their own notes" ON notes
  FOR DELETE USING (auth.uid() = user_id);
```

## 🔌 API Endpoints

### GET /notes
```javascript
// GET /notes - Chosen because it follows RESTful conventions for fetching resources,
// and it doesn't have side effects. No parameters needed in the URL as it gets notes for authenticated user.
```

### POST /notes
```javascript
// POST /notes - Chosen because it follows RESTful conventions for creating new resources,
// and it has side effects (data creation). Reading parameters from request body as they contain the note data.
```

## 🚀 Demo

### Create a Note

```bash
curl -X POST 'https://your-project.supabase.co/functions/v1/post_notes' \
-H 'Authorization: Bearer YOUR_JWT_TOKEN' \
-H 'Content-Type: application/json' \
-d '{"title":"Meeting Notes","content":"Discuss Q2 roadmap","color":"yellow"}'
```

Expected Response:
```json
{
  "note": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "user_id": "auth0|user123",
    "title": "Meeting Notes",
    "content": "Discuss Q2 roadmap",
    "created_at": "2023-05-01T13:22:45.121Z",
    "updated_at": "2023-05-01T13:22:45.121Z",
    "color": "yellow"
  }
}
```

### List Notes

```bash
curl -X GET 'https://your-project.supabase.co/functions/v1/get_notes' \
-H 'Authorization: Bearer YOUR_JWT_TOKEN'
```

Expected Response:
```json
{
  "notes": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "user_id": "auth0|user123",
      "title": "Meeting Notes",
      "content": "Discuss Q2 roadmap",
      "created_at": "2023-05-01T13:22:45.121Z",
      "updated_at": "2023-05-01T13:22:45.121Z",
      "color": "yellow"
    },
    {
      "id": "223e4567-e89b-12d3-a456-426614174001",
      "user_id": "auth0|user123",
      "title": "Shopping List",
      "content": "Milk, Eggs, Bread",
      "created_at": "2023-05-01T10:15:30.421Z",
      "updated_at": "2023-05-01T10:15:30.421Z",
      "color": "blue"
    }
  ]
}
```

## 🛠️ Setup & Deployment

### Prerequisites
- [Supabase Account](https://supabase.com)
- [Supabase CLI](https://supabase.com/docs/guides/cli)
- [Node.js](https://nodejs.org/) (v16 or later)

### Steps

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL in `schema.sql` in the Supabase SQL editor
3. Clone this repository and install dependencies:
   ```bash
   git clone https://github.com/yourusername/notes-service.git
   cd notes-service
   npm install
   ```
4. Create a `.env` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
5. Deploy the Edge Functions:
   ```bash
   supabase functions deploy get_notes
   supabase functions deploy post_notes
   ```

## 🔧 Development

To start the development server:

```bash
npm run dev
```

## 📦 Building for Production

```bash
npm run build
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/amazing-feature`)
3. Commit your Changes (`git commit -m 'Add some amazing feature'`)
4. Push to the Branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Created with ❤️ by Saidul Hoque

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- [Supabase](https://supabase.com) for the amazing backend services
- [React](https://reactjs.org/) for the frontend library
- [Tailwind CSS](https://tailwindcss.com) for styling
- [shadcn/ui](https://ui.shadcn.com/) for UI components
