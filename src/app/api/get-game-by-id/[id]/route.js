import { supabase } from "@/lib/supabaseClient";

export async function GET(request, { params }) {
  const { id } = params;

  const query = supabase
    .from("games")
    .select("*, system_requirements(*), reviews(*, profiles(*))")
    .eq("id", id)
    .single(); 

  const { data, error } = await query;

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
