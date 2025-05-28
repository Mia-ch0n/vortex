import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  const { data: games, error: gamesError } = await supabase
    .from("games")
    .select("*");
  const { data: reviews, error: reviewsError } = await supabase
    .from("reviews")
    .select("*");

  if (gamesError || reviewsError) {
    return new Response(
      JSON.stringify({ error: gamesError?.message || reviewsError?.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const ratingsMap = {};
  reviews.forEach((r) => {
    ratingsMap[r.game_id] = (ratingsMap[r.game_id] || 0) + 1;
  });

  const gamesWithRatings = games
    .map((game) => ({
      ...game,
      ratings_count: ratingsMap[game.id] || 0,
    }))
    .sort((a, b) => b.ratings_count - a.ratings_count);

  return new Response(JSON.stringify(gamesWithRatings), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
