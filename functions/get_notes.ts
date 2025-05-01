
// GET /notes - Chosen because it follows RESTful conventions for fetching resources,
// and it doesn't have side effects. No parameters needed in the URL as it gets notes for authenticated user.
import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.0.0";

serve(async (req) => {
  // Create a Supabase client with the Auth header
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    { global: { headers: { Authorization: req.headers.get("Authorization")! } } }
  );

  // Get user information to check authentication status
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (!user) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  // Get all notes for the authenticated user
  const { data: notes, error } = await supabaseClient
    .from("notes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  // Return the notes
  return new Response(
    JSON.stringify({ notes }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
});
