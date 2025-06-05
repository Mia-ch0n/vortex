import { supabase } from "../../../lib/supabaseClient";

export async function POST(request) {
  const { game_id, user_id, rating, comment } = await request.json();

  const { data, error } = await supabase
    .from("reviews")
    .insert([{ game_id, user_id, rating, comment }])
    .select();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(data), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
