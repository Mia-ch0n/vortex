import axios from "axios";

export async function fetchGames() {
  const response = await axios.get("/api/games");
  return response.data;
}