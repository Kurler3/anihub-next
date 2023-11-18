import { JIKAN_API_URL } from "@/lib/constants"
import { AnimeItem, ApiResponse } from "@/types/anime.types";

export default async function Home() {

  // Fetch data from your API or other source
  const res = await fetch(`${JIKAN_API_URL}/top/anime?limit=10`, { next: { revalidate: 60 * 10 } });

  if (!res.ok) {
    throw new Error("Failed to fetch anime");
  }

  // If the content has changed, parse the JSON response and return it as props
  const responseResult = await res.json() as ApiResponse;

  const animeData = responseResult.data;

  console.log(animeData)

  return (
    <main className='flex-1 border-red-300 h-100'>

    </main>
  )
}


